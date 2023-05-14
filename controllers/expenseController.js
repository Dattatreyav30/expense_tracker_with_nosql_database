
const Expense = require('../models/expenseModel');
const User = require('../models/userModel');

exports.addExpense = async (req, res, next) => {
    try {
        const expenseAmount = req.body.expenseAmount;
        const expenseDescription = req.body.expenseDescription;
        const expenseCategory = req.body.expenseCategory;

        const user = await User.findOne({ _id: req.user._id })
        const Userexpenses = user.totalexpenses || 0;
        const totalexpenses = parseInt(Userexpenses) + parseInt(expenseAmount);

        await User.updateOne(
            { _id: req.user.id },
            { totalexpenses: totalexpenses }
        )
        const expense = new Expense({
            expenseAmount: expenseAmount,
            expenseDescription: expenseDescription,
            expenseCategory: expenseCategory,
            userId: req.user.id
        })
        await expense.save()
        res.status(200).json({ message: 'table created succesfully' })
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'something went wrong' })
    }
}


exports.getAllExpenses = async (req, res, next) => {
    try {
        const page = +req.query.page || 1
        const limit = +req.query.limit || 5;
        const total_items = await Expense.countDocuments({ userId: req.user._id })
        const allExpenses = await Expense.find({ userId: req.user.id }).skip((page - 1) * limit).limit(limit);
        const pagination = {
            currentPage: page,
            hasNextPage: limit * page < total_items,
            nextPage: page + 1,
            hasPreviousPage: page > 1,
            previousPage: page - 1,
            lastPage: Math.ceil(total_items / limit),
        }
        res.status(200).json({ allExpenses, pagination, success: true })
    } catch (err) {
        console.log(err);
        res.json(500).json({ message: ' cant get all the expenses at the moment' })
    }
}

exports.deleteExpense = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({ _id: req.user._id });
        const userExpenses = user.totalexpenses
        const expense = await Expense.findOne({
            _id: id,
            userId: req.user._id
        })
        const expenseAmount = expense.expenseAmount;
        const totalexpenses = parseInt(userExpenses - expenseAmount)
        await User.updateOne({ id: req.user.id }, { totalexpenses: totalexpenses })
        await expense.deleteOne()
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (err) {
        console.log(err)
        res.status(404).json({ message: 'cant delete the expense at the moment' })
    }
}