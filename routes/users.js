var express = require('express');
var router = express.Router();

router.post('/register-user',async(req,res)=>{});

router.post('/register-admin',async(req,res)=>{});

router.post('/register-super-admin',async(req,res)=>{});

router.post('/login-user',async(req,res)=>{});

router.post('/login-admin',async(req,res)=>{});

router.post('/login-super-admin',async(req,res)=>{});

router.post('/user-profile',async(req,res)=>{});

router.post('/admin-profile',async(req,res)=>{});

router.post('/super-admin-profile',async(req,res)=>{});

module.exports = router