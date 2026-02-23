import express from "express";
import loginRoutes from "./routes/login.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";
import { globalRateLimit } from "./middleware/rateLimit.middleware.js";
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express();

app.use(express.json());
app.use(cors({origin: 'http://localhost:5173', credentials: true}))
app.use(cookieParser())
app.use(globalRateLimit)
app.use('/',loginRoutes)
app.use(notFoundHandler)
app.use(errorHandler)


export {app}