const router = require('express').Router();
const { body } = require('express-validator/check');
const authController = require('../controllers/auth');
const User = require('../models/User');
const isAuth = require('../middleware/is-auth')

router.post('/login', 
  [
    body('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject('E-Mail address already exists!');
          }
        })
      }),
    body('password')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Please enter a valid password.'),
    body('username')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Please enter a valid username.')
  ]
, authController.login);
router.post('/register', authController.register);
router.get('/profile',  authController.getProfile);

module.exports = router;
