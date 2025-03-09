// routes/societyRoutes.js
import express from "express";
import {
  createSociety,
  getAllSocieties,
  getSocietyById,
  updateSociety,
  deleteSociety,
  updateUserRole,
  updateAnyUserRoleBySociety,
  getUsersBySocietyId,
} from "../controller/society.js";
import { adminOnly, isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// Define routes
router
  .route("/")
  .post(isAuthenticated, adminOnly, createSociety)
  .get(getAllSocieties);
router.put("/role/update", updateUserRole);
router.put("/role/update-by-society", updateAnyUserRoleBySociety);
router.get("/:societyId/users", getUsersBySocietyId);
router
  .route("/:id")
  .get(isAuthenticated, getSocietyById)
  .put(isAuthenticated, adminOnly, updateSociety)
  .delete(isAuthenticated, adminOnly, deleteSociety);

export default router;
