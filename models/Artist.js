const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        minlength: 3,
        maxlength: 50 },
    photo: {type: mongoose.Schema.Types.String, required: true},
    songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}]
})

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;