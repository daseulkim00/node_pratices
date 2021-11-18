const express = require('express');
const controller = require('../controllers/user');

const router = express.Router();
router.route('/join').get(controller.index);

module.exports = router;