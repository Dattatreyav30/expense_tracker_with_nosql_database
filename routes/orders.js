const express = require('express');

const path = require('path');

const router = express.Router();

const userAuthentication = require('../middlewares/auth')

const orderController = require('../controllers/orderController')

router.get('/premiumMembership', userAuthentication.authentication, orderController.premiumMembership);

router.post('/updateTransactionstatus', userAuthentication.authentication, orderController.updateTrnsactionstatus);

router.post('/transactionfailed', userAuthentication.authentication, orderController.transactionfailed)

router.get('/check-premium', userAuthentication.authentication, orderController.check_premium)

router.get('/leaderboard', userAuthentication.authentication, orderController.leaderBord)

router.get('/download', userAuthentication.authentication, orderController.download)

module.exports = router;