import express from "express";
import {
  getAllJobs,
  getJobById,
  deleteJob,
  createJob,
} from "../controller/jobController.js";
import {
  createApplication,
  deleteApplication,
  getAllApplications,
  getApplicationById,
} from "../controller/jobSeeker.js";
import { adminOnly, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();
// job Provider
router.get("/jobProvider", isAuthenticated, adminOnly, getAllJobs);
router.get("/jobProvider/:id", adminOnly, getJobById);
router.post("/jobProvider", isAuthenticated, createJob);
router.delete("/jobProvider/:id", isAuthenticated, adminOnly, deleteJob);

// job Seeker
router.get("/jobSeeker", isAuthenticated, adminOnly, getAllApplications);
router.get("/jobSeeker/:id", adminOnly, getApplicationById);
router.post("/jobSeeker", isAuthenticated, createApplication);
router.delete("/jobSeeker/:id", isAuthenticated, adminOnly, deleteApplication);

export default router;
