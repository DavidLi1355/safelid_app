const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    folder_id: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    data: {
        type: Buffer,
        required: true
    }
});

const File = mongoose.model('files', FileSchema);
module.exports = File;