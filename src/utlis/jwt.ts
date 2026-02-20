import  jwt, { type SignOptions }   from "jsonwebtoken";
import {type jwtPayload} from "../types/jwt.types.js";

function generateToken(payload: jwtPayload, secret: string, options: SignOptions) {
    return jwt.sign(payload, secret, options);
}

function verifyToken(token: string, secret: string) {
    try {
        const payload = jwt.verify(token, secret) as jwtPayload;
        return payload;
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
}

export {generateToken, verifyToken}