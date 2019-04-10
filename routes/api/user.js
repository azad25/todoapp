const express = require('express');
const router = express.Router();

require("dotenv").config();

const firebaseObj = require('../../config/firebase')();

// @route POST api/users/register
// @desc Register user
// @access Public
router.post('/signup', (req, res) => {
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;

    firebaseObj.signup(name, email, password, res);
});

router.post('/login', function (req, res) {
    var email = req.body.email;
    var password = req.body.password;

    firebaseObj.login(email, password, res);
});

router.get('/logout', function (req, res) {
    firebaseObj.logout(res);
});

module.exports = router;