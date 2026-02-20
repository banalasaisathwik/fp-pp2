import {type Request, type Response, type NextFunction} from "express";
import {type UserInput} from "../types/user.types.js";
import {type User} from "../types/user.types.js";
import { verifyToken } from "../utlis/jwt.js";

function validateInput(req: Request, res: Response, next: NextFunction) {
    const {email, password}: UserInput = req.body;

    if (!email || !password || typeof email !== 'string' || typeof password !== 'string') {
        return next(new Error("Email and password are required and must be strings"));
    }

    if (password.length < 6) {
        return next(new Error("Password must be at least 6 characters long"));
    }

    next();
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) {
        return next(new Error("Access token is missing"));
    }
    try {
        const payload = verifyToken(token,"secret");
        req.user = payload;
        next();
    }
    catch (error) {
        return next(new Error("Invalid or expired token"));
    }
}

export {validateInput, authenticateToken}