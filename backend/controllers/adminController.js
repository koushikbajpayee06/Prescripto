import validator from "validator"
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import DoctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import doctorModel from "../models/doctorModel.js"

// API for adding doctor
const addDoctor = async (req,res)=>{
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    try{
        const { name, email, password, speciality, degree, experience, about, fees, address } = req.body;

        const imageFile = req.file
        console.log({ name, email, password, speciality, degree, experience, about ,fees, address },imageFile)
        // Checking for all data to add doctor
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile){
            return res.json({success:false, message:"Missing Details"})
        }
        // Validating email formait
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Please Enter a valid email"})
        }

        // Validating strong password 
        if(password.length < 8){
            return res.json({success:false, message:"Please Enter a strong password"})
        }

        // hashing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        // upload image to cloudinary

        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        const doctorData = {
    name,
    email,
    image: imageUrl,
    password: hashedPassword,
    speciality,
    degree,
    experience,
    about,
    fees: Number(fees),  
    address: JSON.parse(address),
    date: Date.now()
};

        const newDoctor = new DoctorModel(doctorData)
        await newDoctor.save()

        res.json({success:true, message:"Doctor Added"})
        
    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// API for admin Login

const loginAdmin = async(req,res)=>{
    try{
        console.log(req.body);
        const {email,password} = req.body;
        
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET );
            res.json({success:true, token})
        }else{
            res.json({success:false, message:"Invalid Credentials"})
        }
    }catch(error){
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// API to get all doctors list for admin panel

const allDoctors = async(req,res)=>{
    try{
        const doctors = await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
    }catch(err){
        res.json({success:false,message:err.message})
    }
}

export {addDoctor, loginAdmin, allDoctors}