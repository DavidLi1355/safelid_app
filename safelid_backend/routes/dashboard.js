const router = require('express').Router();
const mongoose = require('mongoose');

const User = require('../models/user_model');
const Folder = require('../models/folder_model');
const File = require('../models/file_model');
const auth = require('../middleware/auth');


const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');


const config = require('config');
const uri = config.get('ATLAS_URI');
const connection = mongoose.createConnection(uri, {useNewUrlParser: true, useUnifiedTopology: true});

let gfs;
connection.once('open', () => {
    gfs = Grid(connection.db, mongoose.mongo);
    gfs.collection('files');
})

const storage = new GridFsStorage({
    url: config.get('ATLAS_URI'),
    file: (req, file) => {
        return {
            bucketName: 'files',
            filename: file.originalname,
            disableMD5: true
        }
    }
});

const upload = multer({ storage: storage });



// @route GET /dashboard
// @desc Register new user
// @access Private
router.get('/folder/:folderId', auth, (req, res) => {
    res.status(200).json({ dashboard: "Dashboard" });
});

router.get('/file/:folderId', auth, (req, res) => {
    res.status(200).json({ dashboard: "Dashboard" });
});

router.post('/upload', auth, upload.single('file'), (req, res) => {
    
    res.json({ file: req.file });


    // const img = fs.readFileSync()
    // const encode_image = img
    // console.log(req.files.filename.name);


    // const user_id = mongoose.Types.ObjectId(req.body.user_id);
    // const parent_folder_id = (req.body.parent_folder_id == null) ? null : mongoose.Types.ObjectId(req.body.parent_folder_id);
    // const newFile = new File({
    //     name: req.body.name,
    //     user_id: user_id,
    //     parent_folder_id: parent_folder_id,
    //     data: req.body.data
    // });

    // newFile.save()
    //     .then(file => res.json({
    //         file: {
    //             id: file.id,
    //             name: file.name,
    //             user_id: file.user_id,
    //             parent_folder_id: file.parent_folder_id,
    //             data: file.data
    //         }
    //     }))
    //     .catch(err => console.log(err));

});

router.post('/addFolder', (req, res) => {
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