const User = require('../models/userModel');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');



require('dotenv').config();


const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
//console.log(secretKey);
const jwtSecretkey = process.env.JWT_SECRET_KEY;

function generateAccessToken(id) {
    return jwt.sign({ userId: id }, jwtSecretkey)
}

exports.postAddUser = async (req, res, next) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email: email })
        if (user) {
            throw new Error();
        }
        bcrypt.hash(password, 10, async (err, hash) => {
            const user = new User({
                username: username,
                email: email,
                password: hash,
                totalexpenses: 0,
                isPremiumUser: false
            })
            await user.save()
            res.status(200).json({ success: 'user signed up successfully' })
        })
    } catch (err) {
        res.status(500).json({ success: 'user already exists' })
    }
}

exports.postLogin = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const user = await User.findOne({ email: email })
        if (!user) {
            throw new Error()
        }
        const match = await bcrypt.compare(password, user.password);

        if (match) {
            res.status(200).json({ result: 'user logged in successfully', token: generateAccessToken(user.id) })
        }
        else {
            res.status(401).json({ result: 'Incorrect password' })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ result: 'user not found' })
    }

}