const express = require("express");
const cors = require("cors");
const userRoutes = require("./route/userRoutes.js");
const postRoutes = require("./route/postRoutes.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

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
    saveUninitialized: false, // 초기화되지 않은 세션을 저장할 지 여부
    cookie: { secure: false, httpOnly: true, maxAge: 3600000 }, // 쿠키 설정
  })
);

app.use(bodyParser.json());
app.use("/api/users", userRoutes);
app.use("/api", postRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
