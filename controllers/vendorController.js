const Vendor = require('../models/Vendor'); // Fixed variable name
const jwt = require('jsonwebtoken'); // Proper module inclusion
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv')

dotenv.config();

const secretKey = process.env.SECRET_KEY

// Vendor Registration Function
const vendorRegister = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const vendorEmail = await Vendor.findOne({ email }); // Use `Vendor` correctly
        if (vendorEmail) {
            return res.status(400).json("Email already taken");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newVendor = new Vendor({
            username, 
            email, 
            password: hashedPassword // Use `Vendor` correctly
        });

        await newVendor.save();

        res.status(201).json({ message: "Vendor registered successfully" });
        console.log('registered');

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        console.log(error);
    }
};

// Vendor Login Function
const vendorLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const vendor = await Vendor.findOne({ email }); // Use `Vendor` correctly
        if (!vendor || !(await bcrypt.compare(password, vendor.password))) {
            return res.status(401).json({ error: "Invalid username or password" });
        }
        const token = jwt.sign({vendorId:vendor._id},secretKey,{expiresIn:"1h"})
        
        res.status(200).json({ success: "Login Successful" ,token});
        console.log(email,"this is token ",token)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getAllVendors = async(req,res)=>{
    try{
        const vendors = await Vendor.find().populate('firm')
        res.json({vendors})
    }catch(error){
      console.log(error);
      res.status(500).json({error:"Internal server error"})
    }
}

const getVendorById = async(req,res)=> {
    const vendorId = req.params.id;
    try{
       const vendor= await Vendor.findById(vendorId).populate('firm');
       if(!vendor){
        return res.status(400).json({error:"vendor not found"})
       }
       res.status(200).json({vendor})
    }catch(error){
        console.log(error);
        res.status(500).json({error:"Internal server error"});
    }
}

module.exports = {
    vendorRegister,
    vendorLogin,
    getAllVendors,
    getVendorById,
};
