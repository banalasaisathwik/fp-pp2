import {type NextFunction, type Request, type Response} from "express";
import {registerUserIndb, loginUserIndb, getUserProfileIndb} from "../data/store.js";
import { generateToken } from "../utlis/jwt.js";

async function registerUser(req: Request, res: Response,next: NextFunction) {
    const {email, password} = req.body;
    try{
        const user = await registerUserIndb({email, password});
        const token = generateToken({id: user.id, email: user.email}, "secret", {expiresIn: "15m"});
        res.status(201).send({message: "User registered successfully","token": token});
    }
    catch (error) {
        next(error);
    }
}

async function loginUser(req: Request, res: Response,next: NextFunction) {
    const {email, password} = req.body;
    try{
        const user = await loginUserIndb({email, password});
        const token = generateToken({id: user.id, email: user.email}, "secret", {expiresIn: "15m"});
        res.status(200).send({message: "User logged in successfully", user, "token": token});
    }
    catch (error) {
        next(error);
    }
}

function getUserProfile(req: Request, res: Response, next: NextFunction) {
    if (!req.user) {
        return next(new Error("User not authenticated"));
    }
    const userDetails = getUserProfileIndb(req.user.id);
    res.status(200).send({message: "User profile retrieved successfully", user: userDetails});
}

export {registerUser, loginUser, getUserProfile}