
import express from 'express';
import Driver from '../models/Driver.model.js'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const driverSignUpRouter = express.Router();
const secret = process.env.JWT_SECRET;
driverSignUpRouter.post('/driver', async (req, res) => {
  const { fullName, email, password, phoneNumber, vehicleModel, licensePlate } = req.body;

  if (!fullName || !email || !password || !phoneNumber || !vehicleModel || !licensePlate) {
    return res.status(400).json({
      success: false,
      message: 'Please provide full name, email, password, phone number, vehicle model, and license plate',
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
    const driverExists = await Driver.exists({ email });
    if (driverExists) {
      return res.status(400).json({ success: false, message: 'Driver already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newDriver = new Driver({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      vehicleModel,
      licensePlate,
    });

    await newDriver.save();

    const token = jwt.sign({ email }, secret);
    res.cookie('token', token, { path: '/', httpOnly: true });

    return res.status(201).json({ success: true, message: 'New driver created successfully' });
  } catch (error) {
    console.error('Error creating driver:', error);
    return res.status(500).json({
      success: false,
      message: "Can't create driver. Please try again later.",
    });
  }
});


export default driverSignUpRouter;
