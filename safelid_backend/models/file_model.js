const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user_id: {
        type: objectId,
        required: true
    },
    folder_id: {
        type: objectId,
        required: true
    },
    data: {
        type: binData,
        required: true
    }
});

const File = mongoose.model('files', FileSchema);
module.exports = File;