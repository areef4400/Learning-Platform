import express from "express";
const indexRouter = express.Router();

import userRouter from "./user.js";
indexRouter.use("/user",userRouter);

export default indexRouter;