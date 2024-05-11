import express from "express";
import cors from "cors";
import userRoutes from "./route/userRoutes.js";
import postRoutes from "./route/postRoutes.js";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
const port = 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(
  session({
    secret: "secret_key", // 세션을 암호화하기 위한 비밀키
    resave: false, // 변경되지 않은 세션을 다시 저장할 지 여부
    saveUninitialized: true, // 초기화되지 않은 세션을 저장할 지 여부
    // cookie: { maxAge: 60 * 1000 },
  })
);

app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api", postRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
