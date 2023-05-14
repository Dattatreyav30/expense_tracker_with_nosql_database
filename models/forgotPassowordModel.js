const mongoose = require('mongoose');

const Schema = mongoose.Schema

const forgotPasswordSchema = new Schema({
    isActive: {
        type: Boolean
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    }
})

module.exports = mongoose.model('ForgotPassword', forgotPasswordSchema)



// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const ForgotPassword = sequelize.define('forgotpasswordRequests', {
//     id: {
//         type: Sequelize.STRING,
//         primaryKey: true,
//         allowNull: false
//     },
//     isActive: {
//         type: Sequelize.BOOLEAN,
//     }
// })

// module.exports = ForgotPassword;