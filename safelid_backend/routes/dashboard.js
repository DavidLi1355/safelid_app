const router = require('express').Router();
const mongoose = require('mongoose');
const util = require('util')

const User = require('../models/user_model');
const Folder = require('../models/folder_model');
const File = require('../models/file_model');
const auth = require('../middleware/auth');

const Busboy = require('busboy');
const config = require('config');
const uri = config.get('ATLAS_URI');
const connection = mongoose.createConnection(uri, {useNewUrlParser: true, useUnifiedTopology: true});


// @route GET /dashboard
// @desc Register new user
// @access Private
router.get('/folder/:FolderId', auth, (req, res) => {


    res.status(200).json({ dashboard: "Dashboard" });
});

router.get('/file/:FileId', auth, (req, res) => {
    res.status(200).json({ dashboard: "Dashboard" });
});

//upload.single('file')
router.post('/upload', auth, (req, res) => {
    const bucket = new mongoose.mongo.GridFSBucket(connection.db, { bucketName: 'storages', chunkSizeBytes: 1048576 });
    let busboy = new Busboy({headers: req.headers});

    let uploadStreamFilename;
    let metadata = {};
    let buffer = Buffer.alloc(0);

    busboy.on('file', (fieldname, file, filename) => {
        // We are streaming! Handle chunks
        uploadStreamFilename = filename;
        file.on('data', data => {
            // Here we can act on the data chunks streamed.
            buffer = Buffer.concat([buffer, data]);
        });
        // Completed streaming the file.
        // file.on('end', () => {

        // });
    });
    busboy.on('field', (fieldname, val) => {
        metadata[fieldname] = val;
    });
    busboy.on('finish', () => {
        metadata['user_id'] = mongoose.Types.ObjectId(metadata['user_id']);
        metadata['parent_folder_id'] = mongoose.Types.ObjectId(metadata['parent_folder_id']);
        const uploadStream = bucket.openUploadStream(uploadStreamFilename, {metadata});
        uploadStream.end(buffer, (error, result) => {
            if (error) {
                return res.status(400)
                    .json({ error: 'Fail to upload file' });
            }
            console.log(result);
        });
        res.sendStatus(200);
    });
    req.pipe(busboy);
});

router.post('/addFolder', auth, (req, res) => {
    const user_id = mongoose.Types.ObjectId(req.body.user_id);
    const parent_folder_id = (req.body.parent_folder_id == null) ? null : mongoose.Types.ObjectId(req.body.parent_folder_id);
    const folder_ids = req.body.folder_ids.map(s => mongoose.Types.ObjectId(s));
    const file_ids = req.body.file_ids.map(s => mongoose.Types.ObjectId(s));
    const newFolder = new Folder({
        name: req.body.name,
        user_id: user_id,
        parent_folder_id: parent_folder_id,
        folder_ids: folder_ids,
        file_ids: file_ids
    });

    newFolder.save()
        .then(folder => res.json({
            folder: {
                id: folder.id,
                name: folder.name,
                user_id: folder.user_id,
                parent_folder_id: folder.parent_folder_id,
                folder_ids: folder.folder_ids,
                file_ids: folder.file_ids
            }
        }))
        .catch(err => console.log(err));
});


module.exports = router;