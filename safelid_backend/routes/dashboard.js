const router = require('express').Router();
const mongoose = require('mongoose');
const util = require('util')

const User = require('../models/user_model');
const Folder = require('../models/folder_model');
const File = require('../models/storage_file_model');
const Chunk = require('../models/storage_chunk_model');
const auth = require('../middleware/auth');

const Busboy = require('busboy');
const config = require('config');
const uri = config.get('ATLAS_URI');
const connection = mongoose.createConnection(uri, {useNewUrlParser: true, useUnifiedTopology: true});
let bucket;

connection.once('open', () => {
    bucket = new mongoose.mongo.GridFSBucket(connection.db, { bucketName: 'storages', chunkSizeBytes: 1048576 });
    console.log("GridFSBucket initiated successfully");
})

// Helper function 
checkFolderAuth = (current_user, current_folder) => {
    return (
        new Promise((resolve, reject) => {
            Folder.findById(current_folder)
                .then(folder => {
                    if (!current_user.equals(folder.user_id)) {
                        reject({'error': 'user unauthorized for this folder'});
                    } 
                    else {
                        resolve(folder);
                    }
                })
                .catch(err => {
                    reject({'error': err});
                })
        })
    );
}

// checkFileAuth = (current_folder) => {
//     return (
//         new Promise((resolve, reject) => {
//             Folder.findById(current_folder)
//                 .then(folder => {
//                     if (!current_user.equals(folder.user_id)) {
//                         reject({'error': 'user unauthorized for this folder'});
//                     } 
//                     else {
//                         resolve(folder);
//                     }
//                 })
//                 .catch(err => {
//                     reject({'error': err});
//                 })
//         })
//     );
// }

folderQuery = (current_folder) => {
    return (
        new Promise((resolve, reject) => {
            Folder.find({parent_folder_id: current_folder})
                .then(folders => {
                    console.log(folders)
                    resolve(folders);
                })
                .catch(err => {
                    console.log('error in folder query')
                });
        })
    );
}

fileQuery = (current_user, current_folder) => {
    return (
        new Promise((resolve, reject) => {
            File.find({ $and: [{'metadata.user_id': current_user}, {'metadata.parent_folder_id': current_folder}]})
                .then(files => {
                    console.log(files)
                    resolve(files);
                })
                .catch(err => {
                    console.log('error in file query')
                });
        })
    );
}






router.get('/homefolder', auth, (req, res) => {
    const current_user = mongoose.Types.ObjectId(req.user.id);
    Folder.findOne({ $and: [{parent_folder_id: null}, {user_id: current_user}]})
        .then(folder => {
            res.send({'id': folder._id});
        });
});

// @route GET /dashboard
// @desc Register new user
// @access Private
// /:FolderId
router.get('/folder/:FolderID', auth, (req, res) => {
    const current_user = mongoose.Types.ObjectId(req.user.id);
    const current_folder = mongoose.Types.ObjectId(req.params.FolderID);

    Promise.all([folderQuery(current_folder), fileQuery(current_user, current_folder), checkFolderAuth(current_user, current_folder)])
        .then(results => {
            console.log('success')
            res.send({'folders': results[0], 'files': results[1], 'current_folder': results[2]});
        })
        .catch(err => {
            res.status(403).send(err)
        })
});

router.get('/file/:FileID', auth, (req, res) => {
    const current_file = mongoose.Types.ObjectId(req.params.FileID);
    const downloadStream = bucket.openDownloadStream(current_file);
    downloadStream.pipe(res);
});

router.post('/file/rename/', auth, (req, res) => {
    current_file = mongoose.Types.ObjectId(req.body.FileID);
    bucket.rename(current_file, req.body.name, (err) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.sendStatus(200);
        }
    })
});

router.post('/file/delete/', auth, (req, res) => {
    const current_file = mongoose.Types.ObjectId(req.body.FileID);
    bucket.delete(current_file, (err) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.sendStatus(200);
        }
    });
});

router.post('/folder/rename/', auth, (req, res) => {
    const current_folder = mongoose.Types.ObjectId(req.body.FolderID);
    Folder.updateOne({_id: current_folder}, {name: req.body.name}, (err) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.sendStatus(200);
        }
    });
});

router.post('/folder/delete/', auth, (req, res) => {
    const current_user = mongoose.Types.ObjectId(req.user.id);
    const current_folder = req.body.FolderID;
    console.log('in delete folder api')
    recursiveDelete(current_user, current_folder);
    res.sendStatus(200);

    // const current_folder = mongoose.Types.ObjectId(req.body.FolderID);
    // Folder.deleteOne({_id: current_folder}, (err) => {
    //     if (err) {
    //         res.status(400).send(err);
    //     }
    //     else {
    //         res.sendStatus(200);
    //     }
    // });
});



recursiveDelete = (current_user, current_folder) => {
    current_folder = mongoose.Types.ObjectId(current_folder);

    Promise.all([folderQuery(current_folder), fileQuery(current_user, current_folder)])
        .then(results => {
            const folderFolders = results[0];
            const folderFiles = results[1];            

            for (var folderNum = 0; folderNum < folderFolders.length; folderNum++) {
                console.log('before recursive')
                recursiveDelete(current_user, folderFolders[folderNum]._id)
            }
            for (var fileNum = 0; fileNum < folderFiles.length; fileNum++) {
                const fileID = mongoose.Types.ObjectId(folderFiles[fileNum]._id);
                const fildData = {
                    FileID: fileID
                };
                console.log('delete file id: ' + fileID);
                // this.props.deleteFile(data);
            }

            const folderID = current_folder;
            const folderData = {
                FolderID: folderID
            };
            console.log('delete folder id: ' + folderID);

            // this.props.deletefolder(data);
            
        })
        .catch(err => {
            console.log('in error')
        });

}

//upload.single('file')
router.post('/upload', auth, (req, res) => {
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
            res.sendStatus(200);
        });
    });
    req.pipe(busboy);
});


router.post('/createFolder', auth, (req, res) => {
    const user_id = mongoose.Types.ObjectId(req.user.id);
    const parent_folder_id = (req.body.parent_folder_id == null) ? null : mongoose.Types.ObjectId(req.body.parent_folder_id);
    // const folder_ids = req.body.folder_ids.map(s => mongoose.Types.ObjectId(s));
    // const file_ids = req.body.file_ids.map(s => mongoose.Types.ObjectId(s));
    const newFolder = new Folder({
        name: req.body.name,
        user_id: user_id,
        parent_folder_id: parent_folder_id,
        // folder_ids: folder_ids,
        // file_ids: file_ids
    });

    newFolder.save()
        .then(folder => res.json({
            folder: {
                id: folder.id,
                name: folder.name,
                user_id: folder.user_id,
                parent_folder_id: folder.parent_folder_id,
                // folder_ids: folder.folder_ids,
                // file_ids: folder.file_ids
            }
        }))
        .catch(err => console.log(err));
});


module.exports = router;