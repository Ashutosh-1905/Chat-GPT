const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const redis = require("../db/redis");

const createUser = async(req, res)=>{
    try{
const {username, email, password, fullName:{firstName, lastName}} = req.body;

const isUserAlreadyExists = await userModel.findOne({
    $or:[{username},{email}]
});

if(isUserAlreadyExists){
    return res.status(422).json({
        message:"User already exists"
    })
};

const salt = 10;
const hashedPassword = await bcrypt.hash(password, salt);

const user = await userModel.create({
    username,
    email,
    password:hashedPassword,
    fullName:{
        firstName,
        lastName
    }
});

const token = await jwt.sign({
    id:user._id,
    role:user.role
}, process.env.JWT_SECRET, {expiresIn: "1d"});

res.cookie("token", token);

res.status(201).json({
    message:"User Created Succeddfully.",
    user:{
        id:user._id,
          username: user.username,
            email: user.email,
            fullName: user.fullName,
            role: user.role
    }
});

    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};



const loginUser = async(req, res)=>{
    try{
   const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    })

    if (!user) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({
        id: user._id,
        role: user.role
    }, process.env.JWT_SECRET, {expiresIn:"1d"});


   res.cookie("token", token)

   res.status(200).json({
    message:"User Login Successfully.",
     user: {
            id: user._id,
            username: user.username,
            email: user.email,
            fullName: user.fullName,
            role: user.role
        }
   })
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};


const logoutUser = async(req, res)=>{
    try{
        const token = req.cookies.token

        if(token){
            await redis.set(`blacklist:${token}`, "true", "EX", 60 * 60 * 24);  // 1 day in seconds
        };

        res.clearCookie("token");

        res.status(200).json({
            message:"User Logout Successfully."
        })
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}


module.exports= {createUser, loginUser, logoutUser};