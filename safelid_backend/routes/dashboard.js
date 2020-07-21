const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const isEmpty = require('is-empty');

const User = require('../models/user_model');

const auth = require('../middleware/auth');


// @route GET /dashboard
// @desc Register new user
// @access Private
router.get('/dashboard', auth, (req, res) => {
    res.status(200).json({ dashboard: "Dashboard" });
});

router.post('/dashboard/upload', (req, res) => {
    const bucket = new mongoose.mongo.GridFSBucket(connection.db, { bucketName: 'files' });
    res.status(200).json({ upload: 'successful' });
});


module.exports = router;