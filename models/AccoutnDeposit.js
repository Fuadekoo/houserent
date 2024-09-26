const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    depositor: {
        type: mongoose.Schema.Types.ObjectId, // Change the type to ObjectId
        ref: 'User', // Assuming there is a User model
        required: true
    },

    references: {
        type: String
    },
    type: {
        type: String,
        enum: ['deposit from chapa to system'],
        default:"deposit from chapa to system",
        required: true
    },
    
},
{
    timestamps: true
}
);

const Deposit = mongoose.model('Deposit', transactionSchema);

module.exports =Deposit;