const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/create', userController.createData);
router.get('/getAction',userController.getAction);// actions = 0 man income, acitons =1 man outcome
router.get('/getAll',userController.getAll);// actions = 0 man income, acitons =1 man outcome

module.exports = router;