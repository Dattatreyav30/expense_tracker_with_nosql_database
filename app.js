const express = require('express');

const bodyParser = require('body-parser');

const fs = require('fs');

const path = require('path')

const cors = require('cors');

const morgan = require('morgan');

const mongoose = require('mongoose');

require('dotenv').config()

const userRoute = require('./routes/userRoute');
const expenseRoute = require('./routes/expensesRoute');
// const orderRoute = require('./routes/orders');
const passwordRoute = require('./routes/passwordRoute')

const app = express();


// const User = require('./models/userModel');
// const Expense = require('./models/expenseModel');
// const Orders = require('./models/orderModel');
// const forgotPassword = require('./models/forgotPassowordModel');

// const accessLogSream = fs.createWriteStream(path.join(__dirname, 'acesss.log'), { flags: 'a' })

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors());

//app.use(helmet());

// app.use(morgan("combined", { stream: accessLogSream }));


app.use('/user', userRoute);
app.use('/expenses', expenseRoute);
// app.use('/purchase', orderRoute);
app.use('/password', passwordRoute);


// User.hasMany(Expense);
// Expense.belongsTo(User);

// User.hasMany(Orders);
// Orders.belongsTo(User)

// User.hasMany(forgotPassword);
// forgotPassword.belongsTo(User);

mongoose.connect(process.env.MONGODB_CONNECTION)
.then((res)=>{
    console.log('connected')
    app.listen(3000);
})
     
