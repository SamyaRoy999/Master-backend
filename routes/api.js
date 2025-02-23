import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import ProfileController from "../controllers/ProfileController.js";
import authMiddlewore from "../middleware/authticate.js";

const router = Router();

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);

// profile route
router.get("/profile", authMiddlewore, ProfileController.index);
export default router;
