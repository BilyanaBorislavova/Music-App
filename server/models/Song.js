const mongoose = require('mongoose');
const Album = require('./Album');

const songSchema = new mongoose.Schema({
    name: {type: mongoose.Schema.Types.String, required: true},
    lyrics: {type: mongoose.Schema.Types.String}, 
    album: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Album'}
});

const model = mongoose.model('Song', songSchema);

module.exports = model;