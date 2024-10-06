const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const WithdrawalSchema = new Schema({
    ownerUser: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    withdrawalAmount: {
        type: Number,
        required: true
    },
    withdrawOption: {
        type: String,
        enum: ['CBE','TELEBIRR','AMOLE','ABYSINIA'],
        required: true
    },
    withdrewAccount: {
        type: Number,
        required: true
    },
    withdrewStatus: {
        type: String,
        enum: ['pending', 'done'],
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Withdrawal', WithdrawalSchema);