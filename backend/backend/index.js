import express from "express"
import indexRouter from "./routes/index.js"
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/aval/cc",indexRouter);


app.listen(3000);