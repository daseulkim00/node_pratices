const express = require('express');
const controller =require('../controllers/emaillist')

const router = express.Router();
router.route('').get(controller.index);
router.route('/add').get(controller.form);
// router.route('/add').get(Auth, controller.form);  인증, 체인기능
router.route('/add').post(controller.add);

module.exports = router;