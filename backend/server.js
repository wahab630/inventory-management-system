
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import express from "express";
import { connectDb } from "./config/config.js";
import "dotenv/config";
import cors from "cors";
import { ApiError } from "./utils/utils.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();
const corsOptions = {
  origin: "http://localhost:5173", // Set the frontend origin of app
  // origin: "http://localhost:3000", // Set the frontend origin of app
  credentials: true,               // Allow credentials (cookies, etc.) 
};

app.use(cors(corsOptions));

// app.use(cors()); //ise change krna agr 2 react app chala re hua to

connectDb();
//Parses incoming JSON in req.body (like from POST or PUT requests).
app.use(express.json({ limit: "10mb" }));//sets a max size for incoming JSON payloads. If the body is bigger, it throws an error (prevents abuse).
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use("/api", authRoutes, userRoutes); // mount kr dia// aik hi path handle hua wa he// build in middleware
app.use("*", (req, res) => {
  throw new ApiError(404, "page not found")
})
// app.use(errorMiddleware);
app.use(errorHandler);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`Server is listening on port ${process.env.SERVER_PORT}`);
});
