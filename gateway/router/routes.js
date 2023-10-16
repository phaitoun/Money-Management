const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/create', userController.createData);
router.get('/getAction/:action',userController.getAction);// actions = 0 man income, acitons =1 man outcome
router.get('/getAll',userController.getAll);
router.delete('/delete', userController.deleteALL) //delete all

module.exports = router;