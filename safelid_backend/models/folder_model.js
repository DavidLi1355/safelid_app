const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: objectId,
        required: true
    },
    prev_folder_id: {
        type: objectId,
    },
    folder_ids: {
        type: array
    },
    file_ids: {
        type: array
    }
});

const Folder = mongoose.model('folders', FolderSchema);
module.exports = Folder;