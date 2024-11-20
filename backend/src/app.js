import express from "express";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import cookeiParser from 'cookie-parser'

export const app = express();

const corsOptions = {
  origin: [`http://localhost${process.env.FRONTPORT}`],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  // exposedHeaders: ['Custom-Header'], // Exposed headers
  credentials: true, // Whether to allow credentials (cookies, authorization headers)
  // maxAge: 3600, // Maximum age of the preflight request cache
};

app.use(express.json());
app.use(cookeiParser());
app.use(cors(corsOptions));

app.use("api/v1/user", userRoute);

