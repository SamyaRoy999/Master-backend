import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import ProfileController from "../controllers/ProfileController.js";
import authMiddlewore from "../middleware/authticate.js";
import NewsController from "../controllers/NewsController.js";

const router = Router();

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);

// profile route
router.get("/profile", authMiddlewore, ProfileController.index);
router.put("/profile/:id", authMiddlewore, ProfileController.update);
export default router;

// news Routh
router.get("/news", NewsController.index);
router.post("/news", authMiddlewore, NewsController.store);
router.get("/news/:id", NewsController.show);
router.put("/news/:id", NewsController.show);
router.delete("/news/:id", authMiddlewore, NewsController.destroy);

// { "email": "jane.smith@example.com",
//     "password": "password123"}

// {
//     "message": "logged in",
//     "access_token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6OCwibmFtZSI6IkphbmUgU21pdGgiLCJlbWFpbCI6ImphbmUuc21pdGhAZXhhbXBsZS5jb20iLCJwcm9maWxlIjpudWxsLCJpYXQiOjE3NDA5ODc4MjgsImV4cCI6MTc3MjUyMzgyOH0.quZlYlkDQvCjDkAPL96HARZuhI9cDvwNvMm5XB7nJyw"
// }
// authorization;
