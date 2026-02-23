import express from "express";
import { authenticateToken, validateInput ,} from "../middleware/validate.middleware.js";
import { registerUser, loginUser, getUserProfile,logoutUser } from "../controllers/login.controller.js";
import { loginRateLimit } from "../middleware/rateLimit.middleware.js";


const router = express.Router();

router.post('/register', validateInput,registerUser);
router.post('/login',loginRateLimit, validateInput,loginUser);
router.get('/profile', authenticateToken, getUserProfile);
router.post('/logout', authenticateToken, logoutUser)

export default router;