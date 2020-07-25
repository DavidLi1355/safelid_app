const mongoose = require('mongoose');

const FolderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    prev_folder_id: {
        type: mongoose.Schema.ObjectId
    },
    folder_ids: {
        type: [mongoose.Schema.ObjectId]
    },
    file_ids: {
        type: [mongoose.Schema.ObjectId]
    }
});

const Folder = mongoose.model('folders', FolderSchema);
module.exports = Folder;