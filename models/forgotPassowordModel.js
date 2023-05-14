const mongoose = require('mongoose');

const Schema = mongoose.Schema

const forgotPasswordSchema = new Schema({
    uniqueId: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

module.exports = mongoose.model('ForgotPassword', forgotPasswordSchema)