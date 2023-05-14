
const env = require('dotenv').config();
const AWS = require('aws-sdk')

const Razorpay = require('razorpay');
const Order = require('../models/orderModel');
const User = require('../models/userModel');
const Expense = require('../models/expenseModel');

exports.premiumMembership = async (req, res, next) => {
    try {
        const rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_SECRET_KEY,
        });
        const amount = 2500;
        const order = await rzp.orders.create({ amount, currency: 'INR' });
        const newOrder = new Order(
            {
                orderId: order.id,
                status: 'PENDING',
                userId: req.user.id
            }
        );
        await newOrder.save()
        res.status(201).json({ order, key_id: rzp.key_id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'something went wrong' });
    }
};


exports.updateTrnsactionstatus = async (req, res, next) => {
    try {
        const payementId = req.body.payment_id;
        const orderId = req.body.order_id;
        const order = await Order.findOne({ orderId: orderId },);
        await order.updateOne({ paymentId: payementId, status: 'SUCCESSFULL' })
        await req.user.updateOne({ isPremiumUser: true });
        res.status(200).json({ success: true, message: 'transaction successfull' })
    } catch (err) {
        res.status(401).json({ message: 'something went wrong' })
    }
}

exports.transactionfailed = async (req, res, next) => {
    try {
        const payementId = req.body.payment_id;
        const orderId = req.body.order_id;
        const order = await Order.findOne({ orderId: orderId });
        await order.updateOne({ paymentId: payementId, status: 'FAILED' })
        res.status(200).json({ success: true, message: 'transaction failed' })
    } catch (err) {
        res.status(401).json({ message: 'something went wrong' })
    }
}

exports.check_premium = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user.id });
        if (!user) {
            return res.status(200).json({ isPremiumUser: false })
        }
        if (user.isPremiumUser == true) {
            res.status(200).json({ isPremiumUser: true })
        } else {
            res.status(200).json({ isPremiumUser: false })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" });
    }
}

exports.leaderBord = async (req, res, next) => {
    try {
        const allUserExpenses = await User.find().sort('-totalexpenses')
        res.status(200).json(allUserExpenses)
    } catch (err) {
        res.status(500).json({ message: 'server errror' })
    }
}

const uploadToS3 = async (data, filename) => {
    const BUCKET = process.env.BUCKET_NAME;
    const IAM_ACESS_KEY = process.env.AWS_IAM_ACCESS_KEY;
    const IAM_SECRET = process.env.AWS_IAM_SECRET_KEY;

    let s3Bucket = new AWS.S3({
        accessKeyId: IAM_ACESS_KEY,
        secretAccessKey: IAM_SECRET,
    })
    return new Promise((resolve, reject) => {
        s3Bucket.createBucket(() => {
            var params = {
                Bucket: BUCKET,
                Key: filename,
                Body: data,
                ACL: 'public-read'
            }
            s3Bucket.upload(params, (err, s3response) => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve(s3response.Location)
                }
            })
        })
    })
}

exports.download = async (req, res, next) => {
    try {
        const allExpenses = await Expense.find({ userId: req.user.id })
        const stringifiedExpenses = JSON.stringify(allExpenses);
        const filename = `Expenses${req.user.id}.txt`;
        const fileURL = await uploadToS3(stringifiedExpenses, filename)
        res.status(200).json(fileURL)
    } catch (err) {
        console.log(err)
        res.status(403).json({ message: ' cant get all the expenses at the moment' })
    }
}
