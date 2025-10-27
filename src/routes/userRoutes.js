const express = require('express');
const router = express.Router(); 
const { login, signUp } = require("../controllers/userController");

//route for user login
router.post('/login',login);

module.exports = router;

//route for user signup;
router.post('/sing-up',signUp)
