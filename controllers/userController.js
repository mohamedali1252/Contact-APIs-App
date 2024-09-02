const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


//@Desc Register user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req,res)=>{
    const {username, email, password} = req.body;
    if (!username || !email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const userAvailable = await User.findOne({email});
    if (userAvailable){
        res.status(400);
        throw new Error("User is already registered");
    }
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({username, email, password: hashedPassword});
    if (user){
        res.status(201).json({_id:user.id,email:user.email});
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    
    res.json({message:"Register the user"});
});


//@Desc login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;
    if ( !email || !password){
        res.status(400);
        throw new Error("All fields are required");
    }
    const user = await User.findOne({ email});
    //compare paswords
    if (user ||(await bcrypt.compare(password, user.password))){
        //Generate and send JWT
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id   
            }
        }, 
        process.env.JWT_SECRET, {expiresIn: '30m'});
        res.status(200).json({accessToken : accessToken});
        throw new Error("Invalid email or password");
    }else{

        res.status(401);
        throw new Error("Invalid email or password");
    }
    
});


//@Desc Get current user Information  
//@route GET /api/users/current
//@access private
const currentUser = asyncHandler(async (req,res)=>{
    res.json(req.user);
});

module.exports = {
    registerUser,
    loginUser,
    currentUser
};

