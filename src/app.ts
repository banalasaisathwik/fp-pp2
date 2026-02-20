import express from "express";
import loginRoutes from "./routes/login.routes.js";
import { errorHandler, notFoundHandler } from "./middleware/error.middleware.js";

const app = express();

app.use(express.json());
app.use('/',loginRoutes)
app.use(notFoundHandler)
app.use(errorHandler)


export {app}