const router = require('express').Router();
const viewController = require('../controllers/view');

router.get('/viewArtists', viewController.viewAllArtists);
router.get('/viewArtist/:name', viewController.viewArtist);
router.get('/viewArtist/:song/:userId', viewController.addSongToPlaylist);
router.get('/myPlaylist/:userId', viewController.viewMyPlaylist);
router.get('/myPlaylist/:userId/:name', viewController.removeSong);
router.get('/getUsers', viewController.getUsers);
router.get('/removeUser/:userId', viewController.removeUser);
router.get('/editArtist/:artistId', viewController.editArtist);
router.get('/currentArtist/:artistId', viewController.getCurrentArtist);

module.exports = router;