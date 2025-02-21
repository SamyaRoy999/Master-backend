import express from "express";
const app = express();
import "dotenv/config";
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

import apiRoutes from "./routes/api.js";

app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
