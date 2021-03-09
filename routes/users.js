const express = require('express');
const router = express.Router();
const { userRegister } = require('../utils/Auth')

router.post('/register-user', async (req, res) => {
    await userRegister(req.body, 'user', res)
});

router.get('/test', async (req, res) => {
    res.json({
        message: 'Success'
    })
});

router.post('/register-admin', async (req, res) => {
    await userRegister(req.body, 'admin', res)
});

router.post('/register-super-admin', async (req, res) => {
    await userRegister(req.body, 'superadmin', res)
});

router.post('/login-user', async (req, res) => { });

router.post('/login-admin', async (req, res) => { });

router.post('/login-super-admin', async (req, res) => { });

router.post('/user-profile', async (req, res) => { });

router.post('/admin-profile', async (req, res) => { });

router.post('/super-admin-profile', async (req, res) => { });

module.exports = router