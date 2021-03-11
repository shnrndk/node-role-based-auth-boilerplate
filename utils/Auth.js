const User = require('../models/User');
const { SECRET } = require('../config/index');
const bcrypt = require('bcrypt');
const consola = require('consola');
const jwt = require('jsonwebtoken');
const passport = require('passport');
/**
 * @DESC register the user (Admin,Superadmin,User)
 */

const userRegister = async (userDetails, role, res) => {
    try {
        let isUserNameTaken = await validateUserName(userDetails.username)
        let isEmailTaken = await validateEmail(userDetails.email)

        if (isUserNameTaken) {
            return res.status(400).json({
                message: 'Username is taken',
                success: false
            })
        }

        if (isEmailTaken) {
            return res.status(400).json({
                message: 'Email is taken',
                success: false
            })
        }

        const password = await bcrypt.hash(userDetails.password, 12)

        const newUser = new User({
            ...userDetails,
            password,
            role
        })

        await newUser.save()

        return res.status(201).json({
            message: 'User Registered'
        })
    } catch (error) {
        consola.error({
            message: `Unable to create ur account \n ${error}`,
            success: false
        })
    }

}

const validateUserName = async username => {
    let user = await User.findOne({ username })
    if (user) return true
    else return false
}

const validateEmail = async email => {
    let user = await User.findOne({ email })
    if (user) return true
    else return false
}

/**
 * 
 * @DESC user login based on role
 */
const userLogin = async (userCreds, role, res) => {
    let { username, password } = userCreds;

    const user = await User.findOne({ username });

    if (!user) {
        return res.status(404).json({
            message: 'Username is not found',
            success: false
        })
    }

    if (user.role !== role) {
        return res.status(403).json({
            message: 'You do not have privileges',
            success: false
        })
    }

    let isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        let token = jwt.sign({
            user_id: user._id,
            role: user.role,
            username: user.username,
            email: user.email
        }, SECRET,
            { expiresIn: '7 days' }
        )

        let result = {
            username: user.username,
            role: user.role,
            email: user.email,
            token: `Bearer ${token}`,
            expiresIn: 168
        }

        return res.status(200).json({
            ...result,
            message: "Loggged In as " + role,
            success: true,
        })
    } else {
        return res.status(403).json({
            message: 'Incorrect Password',
            success: false
        })
    }
}

const userAuth = passport.authenticate('jwt', { session: false })

module.exports = {
    userRegister,
    userLogin,
    userAuth
}