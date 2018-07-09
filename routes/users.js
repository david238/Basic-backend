var express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/check-auth');
const userControl = require('../controllers/usersControl');

// USER SIGNUP
router.post('/signup', userControl.sign_up_user); 

// USER LOGIN
router.post( '/login', userControl.user_login);

// GET ALL USER
router.get('/', checkAuth, userControl.get_all_users);

// DELETE USER
router.delete('/:userId', checkAuth, userControl.delete_user);

module.exports = router;

