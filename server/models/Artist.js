const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        maxlength: 50 },
    picture: {type: mongoose.Schema.Types.String, required: true},
    albums: [{type: mongoose.Schema.Types.ObjectId, ref: 'Album'}]
})

const Artist = mongoose.model('Artist', artistSchema);

module.exports = Artist;