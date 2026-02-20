import express from "express";
import { authenticateToken, validateInput ,} from "../middleware/validate.middleware.js";
import { registerUser, loginUser, getUserProfile, } from "../controllers/login.controller.js";


const router = express.Router();

router.post('/register', validateInput,registerUser);
router.post('/login', validateInput,loginUser);
router.get('/profile', authenticateToken, getUserProfile);

export default router;