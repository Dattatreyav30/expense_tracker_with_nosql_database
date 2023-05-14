const mongoose = require('mongoose');

const Schema = mongoose.Schema

const orderSchema = Schema({
    paymentId: String,
    orderId: String,
    status: String,
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})


module.exports = mongoose.model('Order', orderSchema)