const Artist = require('../models/Artist');
const Song = require('../models/Song');

module.exports = {
    createArtist: (req, res, next) => {
        const artist = req.body;

        Artist.create(artist)
            .then((artist) => {
                res.status(200)
                    .json({
                        message: `Artist ${artist.name} created successfully!`,
                        artist
                    })
            })
            .catch((err) => {
                if (!err.statusCode) {
                    err.statusCode = 500
                }

                next(err);
            })
    },

    createSong: (req, res, next) => {
        const song = req.body;

        Song.create(song)
            .then(async (song) => {
                
                let artist = await Artist.findById(song.artist)
                artist.songs.push(song);
                await artist.save();

                res.status(200)
                    .json({
                        message: `Song ${song.name} created successfully!`,
                        name: song.name, 
                        lyrics: song.lyrics,
                        artist: artist._id
                    })
            })
            .catch((err) => {
                if (!err.statusCode) {
                    err.statusCode = 500
                }

                next(err);
            })
    },


}