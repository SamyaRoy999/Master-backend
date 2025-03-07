import express from "express";
import "dotenv/config";
import fileUpload from "express-fileupload";
const app = express();
const port = process.env.PORT;
import helmet from "helmet";
import cors from "cors";
import { limiter } from "./config/rateLimit.js";
// middlewore

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(helmet());
app.use(cors());
app.use(limiter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

import apiRoutes from "./routes/api.js";

app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
