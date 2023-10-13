const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/create', userController.createData);
router.get('/getAll',userController.getallData);

module.exports = router;