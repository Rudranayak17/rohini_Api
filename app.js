import { config } from "dotenv";
import express from "express";

import { connectDB } from "./utils/db.js";

import cors from "cors";
import { errorMiddleware } from "./middleware/error.js";
import userRouter from "./router/userRoute.js";
import societyRouter from "./router/societyRouter.js";
import postRouter from "./router/postRouter.js";
config();
const app = express();
connectDB(process.env.MONGO_URI);

const PORT = process.env.PORT;
const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      process.env.FRONTEND_URL2,
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};
app.use(express.json({ limit: "Infinity" }));
app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.send(`<h1>Server is working </h1> `);
});
app.use("/api/v1/user", userRouter);
app.use("/api/v1/society", societyRouter);
app.use("/api/v1/post", postRouter);
app.use("/uploads", express.static("uploads"));

app.use(errorMiddleware);
app.listen(PORT, () => console.log("server is working port", PORT));
