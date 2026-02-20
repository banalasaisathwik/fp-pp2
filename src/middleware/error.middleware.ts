import {type Request, type Response, type NextFunction} from "express";

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    res.status(500).json({ error: err.message || "Internal Server Error" ,"status": err.status || 500});
}

function notFoundHandler(req: Request, res: Response, next: NextFunction) {
    res.status(404).json({ error: "Route not found" });
}

export {errorHandler, notFoundHandler}