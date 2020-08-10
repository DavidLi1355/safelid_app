const router = require('express').Router();
const mongoose = require('mongoose');
const util = require('util')
const bcrypt = require('bcryptjs');
const validateChangePasswordInput = require("../validation/changePassword");

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

checkFileAuth = (current_user, current_file) => {
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

folderQuery = (current_folder) => {
    return (
        new Promise((resolve, reject) => {
            Folder.find({parent_folder_id: current_folder})
                .then(folders => {
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
                    resolve(files);
                })
                .catch(err => {
                    console.log('error in file query')
                });
        })
    );
}

deleteFile = (current_file) => {
    return (
        new Promise((resolve, reject) => {
            bucket.delete(current_file, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        })
    );
}

deleteFolder = (current_folder) => {
    return (
        new Promise((resolve, reject) => {
            Folder.deleteOne({_id: current_folder}, (err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
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
        .then(resolve => {
            res.send({'folders': resolve[0], 'files': resolve[1], 'current_folder': resolve[2]});
        })
        .catch(reject => {
            res.status(403).send(reject)
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
    deleteFile(current_file)
        .then(resolve => res.sendStatus(200))
        .catch(reject => res.status(400).send(reject));
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
    recursiveDelete(current_user, current_folder);
    res.sendStatus(200);
});



recursiveDelete = async (current_user, current_folder) => {
    const items_to_delete = await findAllItemInFolder(current_user, current_folder);
    for (var itemNum = 0; itemNum < items_to_delete.length; itemNum++) {
        const itemID = mongoose.Types.ObjectId(items_to_delete[itemNum].id);
        switch(items_to_delete[itemNum].type) {
            case 'file':
                deleteFile(itemID).then();
                break;
            case 'folder': 
                deleteFolder(itemID).then();
                break;
        }
    }

}


// recursively find all items inside a folder and add them into a json array
findAllItemInFolder = async (current_user, current_folder) => {
    var items_to_delete = [];
    
    current_folder = mongoose.Types.ObjectId(current_folder);

    const folderFolders = await folderQuery(current_folder);
    const folderFiles = await fileQuery(current_user, current_folder);

    for (var fileNum = 0; fileNum < folderFiles.length; fileNum++) {
        const current_file = mongoose.Types.ObjectId(folderFiles[fileNum]._id);
        items_to_delete.push({'type': 'file', 'id': current_file});
    }

    items_to_delete.push({'type': 'folder', 'id': current_folder});

    for (var folderNum = 0; folderNum < folderFolders.length; folderNum++) {
        const temp = await findAllItemInFolder(current_user, folderFolders[folderNum]._id);
        items_to_delete = items_to_delete.concat(temp);
    }

    return items_to_delete;
}






    // var items_to_delete = [];
    
    // current_folder = mongoose.Types.ObjectId(current_folder);

    // Promise.all([folderQuery(current_folder), fileQuery(current_user, current_folder)])
    //     .then(results => {
    //         const folderFolders = results[0];
    //         const folderFiles = results[1];

    //         for (var fileNum = 0; fileNum < folderFiles.length; fileNum++) {
    //             const current_file = mongoose.Types.ObjectId(folderFiles[fileNum]._id);
    //             console.log('added --- file: ' + current_file);
    //             items_to_delete.push({'file': current_file});
    //         }

    //         console.log('added --- folder: ' + current_folder);
    //         items_to_delete.push({'folder': current_folder});

            

    //         for (var folderNum = 0; folderNum < folderFolders.length; folderNum++) {
    //             console.log('current_folder: ' + current_folder + ' folderNum: ' + folderNum);
    //             const temp = recursiveDelete(current_user, folderFolders[folderNum]._id);
    //             items_to_delete = items_to_delete.concat(temp);
    //         }

    //         console.log('return item_to_delete')
    //         return items_to_delete;
    //     })
    //     .catch(errors => {
    //         console.log('promise all error: ' + errors);
    //     });
    



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

router.post('/changeName', auth, (req, res) => {
    const current_user = mongoose.Types.ObjectId(req.user.id);

    User.updateOne({_id: current_user}, {name: req.body.name}, (err) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.sendStatus(200);
        }
    });
});


router.post('/changePassword', auth, (req, res) => {
    const current_user = mongoose.Types.ObjectId(req.user.id);
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    // Form validation
    const { errors, isValid } = validateChangePasswordInput(req.body);
    // Check validation
    if (!isValid) {
        return res.status(400).send('input error');
    }

    User.findById(current_user).then(user => {
        bcrypt.compare(oldPassword, user.password).then(isMatch => {
            if (isMatch) {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newPassword, salt, (err, hash) => {
                        if (err) throw err;
                        User.updateOne({_id: current_user}, {password: hash}, (err) => {
                            if (err) {
                                return res.status(400).send(err);
                            }
                            else {
                                return res.sendStatus(200);
                            }
                        });
                    });
                });
            }
            else {
                return res.status(400).send('old password incorrect');
            }
        });
    });
});




module.exports = router;