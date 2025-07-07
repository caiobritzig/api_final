const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/authController.js');

router.post('/login', ctrl.login);

module.exports = router;