import express from "express";
import cors from "cors";
import userRoutes from "./route/userRoutes.js";
import postRoutes from "./route/postRoutes.js";
import bodyParser from "body-parser";

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api", postRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
