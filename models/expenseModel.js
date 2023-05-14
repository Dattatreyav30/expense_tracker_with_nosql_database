const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    expenseAmount: {
        type: Number,
        required: true
    },
    expenseDescription: {
        type: String,
        required: true
    },

    expenseCategory: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})
module.exports = mongoose.model('Expense', expenseSchema)


// const Sequelize = require('sequelize');

// const sequelize = require('../util/database');

// const Expense = sequelize.define('expense', {
//     id: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//     },
//     expenseAmount: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     expenseDescription: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     expenseCategory: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
// })

// module.exports = Expense;