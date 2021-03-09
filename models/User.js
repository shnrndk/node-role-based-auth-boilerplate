const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'user',
        enum: ['user', 'admin', 'superadmin']
    },
    username: {
        type: String,
        required: true
    },
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema);
