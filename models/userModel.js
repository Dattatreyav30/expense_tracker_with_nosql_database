const mongoose = require('mongoose');

const Schema = mongoose.Schema

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    totalexpenses: {
        type: Number,
    },
    isPremiumUser: {
        type: Boolean,
    }
})

module.exports = mongoose.model('User', userSchema)








// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const User = sequelize.define('user', {
//     id: {
//         type: Sequelize.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     username: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     totalexpenses: {
//         type: Sequelize.INTEGER,
//     },
//     isPremiumUser: {
//         type: Sequelize.BOOLEAN
//     }
// })

// module.exports = User