import express from "express";
import Rider from "../models/Rider.model.js";
import Driver from "../models/Driver.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginRouter = express.Router();

const secret = process.env.JWT_SECRET;

loginRouter.post("/login", async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    let userInfo;

    if (role === "rider") {
      userInfo = await Rider.findOne({ email });
    } else if (role === "driver") {
      userInfo = await Driver.findOne({ email });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid role selected" });
    }

    if (!userInfo) {
      return res
        .status(401)
        .json({
          success: false,
          message: `No ${role} account found for this email`,
        });
    }

    const passwordMatch = await bcrypt.compare(password, userInfo.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    const token = jwt.sign(
      { _id: userInfo._id, role: role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE },
    );

    const rideMakerPhoneNumber = userInfo.phoneNumber;
    
    const tokenOptions = {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    };

    const publicOptions = {
        path: "/",
        httpOnly: false, // Explicitly false so client JS can read it
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000)
    };

    res.cookie("token", token, tokenOptions);
    res.cookie("role", role, publicOptions);
    res.cookie("rideMakerPhoneNumber", rideMakerPhoneNumber, publicOptions);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      userRole: role,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Something went wrong" });
  }
});

export default loginRouter;
