const router = require('express').Router();
const viewController = require('../controllers/view');

router.get('/viewArtists', viewController.viewAllArtists);
router.get('/viewArtist/:name', viewController.viewArtist);

module.exports = router;