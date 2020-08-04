const mongoose = require('mongoose');

const ChunkSchema = new mongoose.Schema({}, { strict: false });

const Chunk = mongoose.model('chunks', ChunkSchema, 'storages.chunks');
module.exports = Chunk;