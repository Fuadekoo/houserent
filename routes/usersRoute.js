const router = require("express").Router();
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const authMiddleware = require("../middlewares/authMiddleware");
const multer = require('multer');
const upload = multer({ limits: { fileSize: 5 * 1024 * 1024 } });

// register new user
router.post("/register",async(req,res)=>{
    try {
        // the number is all ways start from 9 or 7 only
        if(![9,7].includes(parseInt(req.body.phone.toString().charAt(0)))) {
            return res.send({
                message:"phone number should start with 9 or 7",
                success:false,
                data:null
            });
        }
        const ExistingUser= await User.findOne({phone: req.body.phone});
        if(ExistingUser){
            return res.send({
                message:"user already exists",
                success:false,
                data:null
            })
        }
        const hashedpassword = await bcrypt.hash(req.body.password,10);
        req.body.password = hashedpassword;
        const newuser = new User(req.body)
        await newuser.save();
        res.send(
            {
             message:"user created successsfully",
            success:true,
            data:null
        }
        );
    } catch (error) {
        res.send(
            {
             message:error.message,
            success:false,
            data:null
        }
        );
        
    }
});

// Update user by ID route
router.put('/update-user-by-id/:id', authMiddleware, async (req, res) => {
    try {
        // Ensure the user can only update their own account
        if (req.user.userId !== req.params.id) {
            return res.status(401).send({
                message: "You can only update your own account!",
                success: false,
            });
        }

        // Handle the avatar image upload (if applicable)
        const avatar = req.body.avatar || undefined;

        // Continue updating the user...
        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                name: req.body.name,
                email: req.body.email,
                avatar: avatar,
                password: req.body.password ? await bcrypt.hash(req.body.password, 10) : undefined,
            }
        }, { new: true });

        if (!updateUser) {
            return res.status(404).send({
                message: "User not found",
                success: false,
            });
        }

        const { password, ...rest } = updateUser._doc; // Omit password from response
        res.status(200).send({
            message: "User updated successfully",
            success: true,
            data: rest,
        });
    } catch (error) {
        console.error("Update error:", error);
        res.status(500).send({
            message: error.message,
            success: false,
        });
    }
});


// login user
router.post("/login",async(req,res)=>{
    try {
        const userExists = await User.findOne({phone:req.body.phone});
        if(!userExists){
            return res.send({
                message:"user doesn`t exist",
                success:false,
                data:null,
            });
        }

        // check user is blocked
        if(userExists.isBlocked){
            return res.send({
                message:"your account is blocked by administrator",
                success:false,
                data:null,
            });
        }
        const passwordMatch = await bcrypt.compare(req.body.password,userExists.password);
        if(!passwordMatch){
            return res.send({
                message:"incorrect password",
                success:false,
                data:null,
            });
        }
        // this is generate token to login, process.env.jwt_secret is secret key
        const token =jwt.sign({
           userId:userExists._id
        },
        process.env.jwt_secret,
        {expiresIn:"1d",});


        return res.send({
            message:"user logged  in successfully",
            success:true,
            data:token,
        });



    } catch (error) {
        return res.status(500).send({
            message: "An error occurred during login",
            success: false,
            data: null,
        });
    }
});

// get user by id
router.post("/get-user-by-id",authMiddleware,async(req,res)=>{
    try {
        const user = await User.findById(req.body.userId);
        res.send({
            message:"user fetched successfully",
            success:true,
            data:user,
        })
    } catch (error) {
        res.send({
            message:error.message,
            success:false,
            data:null,
        })
    }
})
// Fetch all users with optional search functionality
router.get("/getUsers", async (req, res) => {
    try {
        const { searchTerm } = req.query;
        const query = searchTerm
            ? {
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { email: { $regex: searchTerm, $options: 'i' } },
                    { phone: { $regex: searchTerm, $options: 'i' } }
                ]
            }
            : {};

        const users = await User.find(query);
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Block or unblock a user
router.put("/toggleBlockUser/:userId/block",  async (req, res) => {
    const { userId } = req.params;
    const { isBlocked } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            userId,
            { isBlocked },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({
            message: `User has been ${isBlocked ? 'blocked' : 'unblocked'}`,
            success: true,
            data: user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.get("users",async(req,res)=>{
    try {
        
        const userCount = await User.countDocuments();
        console.log(userCount);
        res.send({
            message:"user count fetched successfully",
            success:true,
            data:userCount,
        })
}
catch (error) {
    res.send({
        message:error.message,
        success:false,
        data:null,
    })
};
})

module.exports = router;