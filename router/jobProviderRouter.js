import express from "express";
import {
  getAllJobs,
  getJobById,
  deleteJob,
  createJob,
} from "../controller/jobController.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.get("/", isAuthenticated,getAllJobs);
router.get("/:id", getJobById);
router.post("/",isAuthenticated, createJob);
router.delete("/:id", deleteJob);

export default router;
