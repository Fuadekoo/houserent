const mongoose= require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true  
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure email is unique
        lowercase: true, // Convert email to lowercase
        match: /^\S+@\S+\.\S+$/, // Validate email format
    },
    phone:{
        type:Number,
        required:true
    },
    role: {
        type: String,
        enum: ['landlord', 'tenant'],
        required: true
    },
    password:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    isBlocked:{
        type : Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false,
    },
    isBlocked:{
        type:Boolean,
        default:false,
    },
    balance: {
        type: Number,
        default: 0
    },
    Auditor: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: true
    },
    avatar:{
        type:String,
       default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    posstHouse: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rooms'
    }],
    
},{
    timestamps:true
}
);
module.exports = mongoose.model('users',userSchema);