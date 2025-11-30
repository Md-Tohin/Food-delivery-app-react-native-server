var express = require('express');
var router = express.Router();
const {userRegister, userLogin, checkUserExists, tokenRefresh,} = require('../services/authentication.service');

/* GET users listing. */

router.post('/register', async function(req, res, next) {
    let body = req.body;
    let response = await userRegister(body);    
    res.json(response);
});

router.post('/login', async function(req, res, next) {
    let body = req.body;
    let response = await userLogin(body);    
    res.json(response);
});

router.post('/user-exists', async function(req, res, next) {
    let params = req.body;
    let response = await checkUserExists(params);    
    res.json(response);
});

router.post("/refresh-token", tokenRefresh);

module.exports = router;