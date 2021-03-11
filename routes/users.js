const express = require('express');
const router = express.Router();
const { userRegister, userLogin, userAuth, serializeUser, checkRole } = require('../utils/Auth')

router.post('/register-user', async (req, res) => {
    await userRegister(req.body, 'user', res)
});

router.get('/test', userAuth, checkRole(['user']), async (req, res) => {
    return res.json(serializeUser(req.user))
});

router.post('/register-admin', async (req, res) => {
    await userRegister(req.body, 'admin', res)
});

router.post('/register-super-admin', async (req, res) => {
    await userRegister(req.body, 'superadmin', res)
});

router.post('/login-user', async (req, res) => {
    await userLogin(req.body, 'user', res)
});

router.post('/login-admin', async (req, res) => {
    await userLogin(req.body, 'admin', res)
});

router.post('/login-super-admin', async (req, res) => {
    await userLogin(req.body, 'superadmin', res)
});

router.get('/user-profile', async (req, res) => { });

router.get('/admin-profile', async (req, res) => { });

router.get('/super-admin-profile', async (req, res) => { });

module.exports = router