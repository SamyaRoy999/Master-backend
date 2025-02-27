import express from "express";
import "dotenv/config";
const app = express();
const port = process.env.PORT;

// middlewore

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

import apiRoutes from "./routes/api.js";

app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
