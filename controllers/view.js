  const Artist = require('../models/Artist');
const User = require('../models/User');
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
        allSongs.push({ name: song.name, lyrics: song.lyrics, id: song._id })
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
  },

  addSongToPlaylist: async (req, res, next) => {
    const { song, userId } = req.params;
    let user = await User.findById(userId);
    if (user.myPlaylist.indexOf(song) <= -1) {
      user.myPlaylist.push(song);
      res.status(201).json({message: "Song added to playlist successfully!"})
    } else {
      res.status(500).json({message: "Song already exists in the playlist!"})
    }
    user.save();
  },

  viewMyPlaylist: async (req, res, next) => {
    const {userId} = req.params;

    let user = await User.findById(userId);
    let songs = [];

    for(let song of user.myPlaylist) {
      let currentSong = await Song.findById(song);
      songs.push(currentSong);
    }

    console.log(songs)

    res.status(200)
      .json({message: "Got playlist songs", songs})
  },

  removeSong: async (req, res, next) => {
    const {userId, name} = req.params;

    let user = await User.findById(userId);

    user.myPlaylist.pull(name)
     await user.save();
      console.log('Song removed!!')
    

    res.status(200)
    .json({message: "Song removed successfully!", songs: user.myPlaylist})
  },

  getUsers: (req, res, next) => {
    User.find()
        .skip(1)
        .then((users) => {
          res
          .status(200)
          .json({ message: 'Loaded all users', users });
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
        
  },

  removeUser: (req, res, next) => {
    const {userId} = req.params;

     User.findByIdAndRemove(userId)
     .then(data => {
       res.status(201).json({message: `User ${data.email} removed successfully!`})
     }).catch(err => { 
       console.log(err)
       next(error);
     })
  },

   editArtist: async (req, res, next) => {
    const {artistId} = req.params;
    console.log(req.body)
    try{
    const artist = await Artist.findById(artistId);
    artist.name = req.body.name;
    artist.photo = req.body.photo;
    artist.save();

    res.status(201).json({message: `Artist edited successfully!`, artist})

    } catch(err) {
      console.log(err)
      next(error);
    }
    //console.log(artist);
  },

  getCurrentArtist: async (req, res, next) => {
    const {artistId} = req.params;

    try {
      let artist = await Artist.findById(artistId);

      res
        .status(200)
        .json({
          message: 'Loaded successfully!!!',
          artist
        })
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}