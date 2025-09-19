import express from 'express';
import Rider from '../models/Rider.model.js';
import Driver from '../models/Driver.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const loginRouter = express.Router();

const secret = process.env.JWT_SECRET

loginRouter.post('/login', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    let userInfo;

    if (role === 'rider') {
      userInfo = await Rider.findOne({ email });
    } else if (role === 'driver') {
      userInfo = await Driver.findOne({ email });
    } else {
      return res.status(400).json({ success: false, message: "Invalid role selected" });
    }

    if (!userInfo) {
      return res.status(401).json({ success: false, message: `No ${role} account found for this email` });
    }

    const passwordMatch = await bcrypt.compare(password, userInfo.password);

    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign({ _id: userInfo }, process.env.JWT_SECRET, { expiresIn: "1d" });
    
   
const phoneData = await Rider.findOne({ email }).select('phoneNumber');
const rideMakerPhoneNumber = phoneData?.phoneNumber;
console.log("Phone Number:", rideMakerPhoneNumber);


    res.cookie("token", token, { path: '/' });
    res.cookie("role", role, { path: '/' }); 
    res.cookie("rideMakerPhoneNumber", rideMakerPhoneNumber, { path: '/' });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      userRole: role,
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Something went wrong" });
  }
});

export default loginRouter;



