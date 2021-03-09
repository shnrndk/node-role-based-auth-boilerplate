const User = require('../models/User');
const { SECRET } = require('../config/index');
const bcrypt = require('bcrypt');
const consola = require('consola');

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

module.exports = {
    userRegister
}