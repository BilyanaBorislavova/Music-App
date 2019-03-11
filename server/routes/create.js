const router = require('express').Router();
const createController = require('../controllers/create');
const isAuth = require('../middleware/auth');

router.post('/createArtist', createController.createArtist);
router.post('/createSong', createController.createSong);

module.exports = router; 