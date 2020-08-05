const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const isEmpty = require('is-empty');
const auth = require('../middleware/auth');

const User = require('../models/user_model');

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");


// @route POST /register
// @desc Register new user
// @access Public
router.post('/register', (req, res) => {
    // Form validation
    const { errors, isValid } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const emailLower = (req.body.email).toLowerCase();
    const usernameLower = (req.body.username).toLowerCase();

    User.find({$or: [{email: emailLower},{username: usernameLower}]}).then(users => {
        let dupErrors = {};
        users.forEach((user) => {
            if (user.email === emailLower) {
                dupErrors.email = "Email already exists";
            } 
            if (user.username === usernameLower) {
                dupErrors.username = "Username already exists";
            }
        });

        if (isEmpty(dupErrors)) {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            });
    
            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => res.json({
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                username: user.username
                            }
                        }))
                        .catch(err => console.log(err));
                });
            });
        } else {
            return res.status(400).json(dupErrors);
        }
    }); 
});

// @route POST /login
// @desc Login user and return JWT token
// @access Public
router.post('/login', (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).json(errors);
    }

    const inputLower = (req.body.input).toLowerCase();
    const password = req.body.password;

    // Find user by input (either email or username)
    User.find({$or: [{email: inputLower},{username: inputLower}]}).then(users => {
        const user = users[0];

        // Check if user exists
        if (isEmpty(user)) {
            return res.status(404).json({ inputnotfound: "Email or username not found" });
        }

        // Check password
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) { 
                // User matched
                // Create JWT Payload
                const payload = {
                    id: user.id,
                    name: user.name
                };

                // Sign token
                jwt.sign(
                    payload,
                    config.get('JWT_SECRET'), 
                    { expiresIn: 1200 }, // 900 = 15 mins 
                    (err, token) => {
                        if (err) throw err;
                        res.json({
                            token,
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            username: user.username
                            // success: true,
                            // token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res.status(400)
                    .json({ passwordincorrect: 'Password incorrect' });
            }
        });
    });
});

// @route GET /userauth
// @desc Get user info with jwt
// @access Private
router.get('/userauth', auth, (req, res) => {
    User.findById(req.user.id, {id: 1, name: 1, email: 1, username: 1})
        .then(user => res.json({
            token: req.token,
            id: user.id,
            name: user.name,
            email: user.email,
            username: user.username
        }));
}); 

module.exports = router;