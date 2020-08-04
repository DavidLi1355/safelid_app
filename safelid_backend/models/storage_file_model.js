const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({}, { strict: false });

const File = mongoose.model('files', FileSchema, 'storages.files');
module.exports = File;