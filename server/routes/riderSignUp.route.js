import express from 'express';
import Rider from '../models/Rider.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const riderSignUpRouter = express.Router();
const secret = process.env.JWT_SECRET;

riderSignUpRouter.post('/rider', async (req, res) => {
  const { fullName, email, password, phoneNumber } = req.body;

  if (!fullName || !email || !password || !phoneNumber) {
    return res.status(400).json({
      success: false,
      message: 'Please provide full name, email, password, and phone number',
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters',
    });
  }


  const phoneRegex = /^\+?\d{10,15}$/;
  if (!phoneRegex.test(phoneNumber)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid phone number format',
    });
  }

  try {
    const riderExists = await Rider.exists({ email });
    if (riderExists) {
      return res.status(400).json({ success: false, message: 'Already signed up' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newRider = new Rider({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
    });

    await newRider.save();

    const token = jwt.sign({ email }, secret);

    res.cookie('token', token, { path: '/', httpOnly: true });

    return res
      .status(201)
      .json({ success: true, message: 'New rider created successfully' });
  } catch (error) {
    console.error('Error creating rider:', error);
    return res.status(500).json({
      success: false,
      message: "Can't create rider. Please try again later.",
    });
  }
});

export default riderSignUpRouter;
