const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const mongoose = require('mongoose');

require('dotenv').config()

const userRoute = require('./routes/userRoute');
const expenseRoute = require('./routes/expensesRoute');
const orderRoute = require('./routes/orders');
const passwordRoute = require('./routes/passwordRoute')

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(cors());

app.use('/user', userRoute);
app.use('/expenses', expenseRoute);
app.use('/purchase', orderRoute);
app.use('/password', passwordRoute);

mongoose.connect(process.env.MONGODB_CONNECTION)
    .then((res) => {
        console.log('connected')
        app.listen(3000);
    })

