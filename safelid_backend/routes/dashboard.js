const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const isEmpty = require('is-empty');
const mongoose = require('mongoose');

const User = require('../models/user_model');
const Folder = require('../models/folder_model');
const File = require('../models/file_model');
const auth = require('../middleware/auth');


// @route GET /dashboard
// @desc Register new user
// @access Private
router.get('/folder/:folderId', auth, (req, res) => {
    res.status(200).json({ dashboard: "Dashboard" });
});

router.get('/file/:folderId', auth, (req, res) => {
    res.status(200).json({ dashboard: "Dashboard" });
});

router.post('/upload', auth, (req, res) => {
    
});

router.post('/addFolder', (req, res) => {
    const user_id = mongoose.Types.ObjectId(req.body.user_id);
    const prev_folder_id = (req.body.prev_folder_id == null) ? null : mongoose.Types.ObjectId(req.body.prev_folder_id);
    const folder_ids = req.body.folder_ids.map(s => mongoose.Types.ObjectId(s));
    const file_ids = req.body.file_ids.map(s => mongoose.Types.ObjectId(s));
    const newFolder = new Folder({
        name: req.body.name,
        user_id: user_id,
        prev_folder_id: prev_folder_id,
        folder_ids: folder_ids,
        file_ids: file_ids
    });

    newFolder.save()
        .then(folder => res.json({
            folder: {
                id: folder.id,
                name: folder.name,
                user_id: folder.user_id,
                prev_folder_id: folder.prev_folder_id,
                folder_ids: folder.folder_ids,
                file_ids: folder.file_ids
            }
        }))
        .catch(err => console.log(err));
});


module.exports = router;