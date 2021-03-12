const Joi = require('joi');

const Userschema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    name: Joi.string().required(),

    email: Joi.string()
        .email()
})

const validateUsers = async (req, res, next) => {
    try {
        await Userschema.validateAsync(req.body);
        return next()
    } catch (error) {
        res.status(500).json({
            message: error.details,
            succuss: false
        })
    }
}

module.exports = validateUsers