import type { Request, Response, NextFunction } from "express";
import redisClient from "../config/redis.js";

async function globalRateLimit(req: Request, res: Response, next: NextFunction) {

    const MAX_REQUESTS = 20;
    const WINDOW_SIZE_IN_SECONDS = 60;

    const id = req.ip; 
    const redisKey = `rate_limit:${id}`;

    try{
        const requestCount = await redisClient.incr(redisKey);

        if(requestCount === 1) {
                await redisClient.expire(redisKey, WINDOW_SIZE_IN_SECONDS);
        }
        if(requestCount > MAX_REQUESTS) {
            const ttl = await redisClient.ttl(redisKey)
            return res.status(429).json({ message: `Too many requests. Try again in ${ttl} seconds.` });
        }

        next();
    }
        catch (err) {
            return next(new Error("Error accessing Redis"))
        }
}

async function loginRateLimit(req: Request, res: Response, next: NextFunction) {
    const MAX_ATTEMPTS = 5;
    const WINDOW_SIZE_IN_SECONDS = 60;

    const ip = req.ip;
    const email = req.body.email;
    const redisKey = `login_attempts:${ip}:${email}`;

    try{
        const attempts = await redisClient.incr(redisKey)

        if (attempts === 1) {
            await redisClient.expire(redisKey, WINDOW_SIZE_IN_SECONDS);
        }
        if(attempts > MAX_ATTEMPTS) {
            const ttl = await redisClient.ttl(redisKey)
            return res.status(429).json({ message: `Too many login attempts. Try again in ${ttl} seconds.` });
        }
        next();
    }
    catch (err) {
        return next(new Error("Error accessing Redis"))
    }
}

export {globalRateLimit, loginRateLimit}