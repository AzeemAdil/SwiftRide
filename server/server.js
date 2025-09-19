import express from "express"
import dotenv from "dotenv"
import cors from 'cors'
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import { connectDB } from "./config/db.js";

import riderSignUpRouter from "./routes/riderSignUp.route.js";
import driverSignUpRouter from "./routes/driverSignUp.route.js";
import loginRouter from "./routes/login.route.js";
import rideRouter from "./routes/ride.route.js";


dotenv.config();

const app = express();
const port = process.env.PORT;
const frontendURL = process.env.FRONTEND_URL;

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: frontendURL,
    credentials: true,
  }));
app.use('/api', loginRouter  );
app.use('/api/signup', riderSignUpRouter);
app.use('/api/signup', driverSignUpRouter);
app.use('/api/ride', rideRouter)

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

connectDB();

app.listen( port , () => {
    console.log(`server listening at ${port}`);
});