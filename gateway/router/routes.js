const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/create', userController.createData);
router.get('/getAll',userController.getallData);// actions = 0 man income, acitons =1 man outcome

module.exports = router;