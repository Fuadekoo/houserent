
const users = require("../models/usersModel");
const Deposit = require("../models/AccoutnDeposit")
const jwt = require('jsonwebtoken');
const nodemailer= require('nodemailer');

const  path =require('path');
//const { fileURLToPath } =require('url');


const handlePaymentSuccess = async (req, res) => {
    const { userId: user } = req.user;

  const { amount  ,tx_ref} = req.body; // Ensure 'amount' is sent in the request body


       const emailPassword = process.env.emailPassword;  // THE EMAIL PASSWORD IN THE .ENV
  
  try {
    // Find the user by their ID
    const account = await users.findOne({ _id: user });
    if (!account) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's balance
    account.balance += parseFloat(amount);

    // Save the updated account information to the database
    await account.save();
    res.status(200).json({ message: "Balance updated successfully", balance: account.balance });
    
    const userEmail = account.email;
    const transaction_id = tx_ref;
    const userUsername = account.name;

    //transaction history
    const netPrice = parseFloat(amount) - parseFloat(amount) * 0.035;

   const tranHistory={
      amount: netPrice,
      depositor:user,
      type:"deposit from chapa to system",
      references:transaction_id,

    //   transFee:parseFloat(amount) - parseFloat(netPrice)

   }
        await Deposit.insertMany([tranHistory]);  // Save to the "allclass" collection

    
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
  

    // Configure nodemailer
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'wegeneargow@gmail.com',
        pass: emailPassword
      }
    });

    // Define mail options
    var mailOptions = {
      from: 'wegeneargow@gmail.com',
      to: userEmail,  // Ensure userEmail is used here
      subject: 'Receipts Reception',
      html: `
        <div style="border: 1px solid #ccc; background-color: #009688; padding: 10px; font-family: Arial, sans-serif; position: relative;">
          <div style="position: absolute; text-align: center; z-index: 2; bottom:400px">
            <img src="cid:chapaImage" alt="Receipt Image" style="width: 30%;  max-width: 300px; height: 30%; max-height: 300px;">
          </div>
          <div style="position: relative; z-index: 1 "> 
            <h2>User Information:</h2>
            <p>Account Holder: ${userUsername}</p>
            <p>Holder Email: ${userEmail}</p>
            <p>Txt_Ref: ${transaction_id}</p>
            <p>Amount: ${amount}</p>
          </div>
        </div>
      `,
      attachments: [
        {
        //  filename: 'chapa.png',
          path: path.join(__dirname, '../houserent/Images/chapa.png'), // path to your image
          cid: 'chapaImage' // same cid value as in the html img src
        }
      ]
    };

    // Send email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////


  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error updating balance' });
  }
};


const getUserDepositHistory = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
          return res.status(401).json({ success: false, message: 'Authorization header not found' });
        }
    
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.userId; // Extract userId from the decoded token
        console.log('Authenticated userId:', userId); // Add logging
    
        const user = await Deposit.find({depositor:userId});
        console.log('Found user:', user); // Add logging
    
        if (!user) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
    
        res.json({ 
            success: true, 
            data: user  });
      } catch (error) {
        console.error('Error fetching user balance:', error); // Add logging
        res.status(500).json({ success: false, message: error.message });
      }
};


module.exports = {handlePaymentSuccess,
                  getUserDepositHistory
                   }; // Corrected the function name to 'addAccount' and the others


