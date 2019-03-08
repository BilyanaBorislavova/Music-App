const mongoose = require('mongoose');
const Artist = require('./Artist');
const Song = require('./Song');

const albumSchema = new mongoose.Schema({
    title: {type: mongoose.Schema.Types.String, required: true},
    artist: {type: mongoose.Schema.Types.ObjectId, ref: 'Artist', required: true},
    songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}],
    picture: {type: mongoose.Schema.Types.String },
    genre: {type: mongoose.Schema.Types.String, required: true}
});

const model = mongoose.model('Album', albumSchema);

module.exports = model; 