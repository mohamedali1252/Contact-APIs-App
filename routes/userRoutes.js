const express = require('express');

const router = express.Router();

const { 
    registerUser,
    loginUser,
    currentUser
} = require('../controllers/userController');
const validateToken = require('../middleware/validateTokneHandler');
/*
router.post('/register',registerUser);

router.route('/login').post(loginUser);
router.route('/current').get(currentUser);
*/
router.post('/register',registerUser);
router.post('/login',loginUser);
router.get('/current',validateToken,currentUser);


module.exports = router;