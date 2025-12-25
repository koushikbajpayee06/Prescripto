import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken'

// API to register user
const registerUser = async (req, res) =>{
    try{
        const {name, email, password} = req.body;

        if(!name || !email || !password){
            return res.json({success:false,message:"Missing Details"})
        }
        // validating email formmat
        if(!validator.isEmail(email)){
             return res.json({success:false,message:"Enter a valid email"})
        }
        // validating strong password
        if(password.length<8){
            return res.json({success:false,message:"Enter a strong password"})
        }
        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hasPassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password:hasPassword
        }

        const newUser = new userModel(userData)
        const user = await newUser.save();

        const token = jwt.sign({if:user._id}, process.env.JWT_SECRET)

        res.json({success:true, token})

    }catch(err){
        console.log(err);
        res.json({success:false, message:err.message})
    }
}

// API for user login
const loginUser = async (req,res)=>{
    try{
        const  {email, password} = req.body;
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false, message:"User does not exist"})
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(isMatch){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true, token});
        }else{
            res.json({success:false, message:"Invalid Credentials"});
        }
    }catch(err){
        console.log(err);
        res.json({success:false, message:err.message}) 
    }
} 

// API to get user profile data
const getProfile = async(req, res)=>{
    try{
        const { userId } = req.body
        const userData = await userModel.findById(userId).select('-password');

        res.json({success:true, userData})
    }catch(err){
        console.log(err);
        res.json({success:false, message:err.message})
    }
}
// API to update users profile
const updateProfile = async(req,res)=>{
    try{
        const {userId, name, phone, address, dob, gender} = req.body;
        const imageFile = req.file
    }catch(err){
        console.log(err);
        res.json({success:false, message:err.message})
    }
}
export {registerUser, loginUser, getProfile}