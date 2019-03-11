const Artist = require('../models/Artist');
const Song = require('../models/Song');
const ObjectId = require('mongoose').ObjectId;

module.exports = {
  viewAllArtists: (req, res, next) => {
    Artist.find()
      .then((artists) => {
        res
          .status(200)
          .json({ message: 'Loaded all artists', artists });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },

  viewArtist: async (req, res, next) => {
    const { name } = req.params;
    let allSongs = [];

    try {
    let artist = await Artist.findById(name);

    for (let songId of artist.songs) {
      let song = await Song.findById(songId);
      allSongs.push({ name: song.name, lyrics: song.lyrics })
    }
    console.log(allSongs)
    res
      .status(200)
      .json({
        message: 'Loaded successfully!!!',
        allSongs
      })
    } catch (error) {
      console.log(error);
      next(error);
    }


  }
}