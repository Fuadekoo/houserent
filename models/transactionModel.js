
const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId, // Change the type to ObjectId
        ref: 'User', // Assuming there is a User model
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId, // Change the type to ObjectId
        ref: 'User', // Assuming there is a User model
        required: true
    },
    references: {
        type: String
    },
    type: {
        type: String,
        enum: ['local Transfer',"local Transfer from person who book the room to the landlord","book commision from person who book the room","local Transfer from person who add the room"],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
        required: true
    },
    // Add more fields based on your requirements

    // Timestamps for created and updated dates
   
},
{
    timestamps: true
}
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;