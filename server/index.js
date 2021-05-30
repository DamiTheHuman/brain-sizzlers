import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import Middlewares from "./api/middlewares.js";
import AuthRouter from "./lib/auth/router.js";
import UserRouter from "./lib/users/router.js";
import QuizRouter from "./lib/quizzes/router.js";
import SubmissionRouter from "./lib/submissions/router.js";
import dotenv from "dotenv";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

dotenv.config();
const app = express(); //initialize server
app.set("trust proxy", 1);
app.use(express.json()); //recive information in json
app.use(
  cors({
    origin: process.env.ORIGIN_URL, //Allow the client server access
    credentials: true,
  })
);
app.use(cookieParser());

const dbURL = `mongodb+srv://HCAdmin:${process.env.DB_PASS}@brainsizzlerscluster.m8qrg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
const MongoStore = require("connect-mongo");
// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    secret: "hc secret",
    cookie: {
      maxAge: Date.now() + 30 * 86400 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // must be 'none' to enable cross-site delivery
      secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
    },
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      mongoUrl: dbURL,
      mongooseConnection: mongoose.connection,
      collection: "session",
    }),
  })
);

app.use("/auth", Middlewares.loginRequired);
app.use(AuthRouter);
app.use(UserRouter);
app.use(QuizRouter);
app.use(SubmissionRouter);

app.listen(process.env.PORT || 3001, () => {
  console.log(
    `Server is running on ${process.env.PORT ? process.env.PORT : "3001"}`
  );
});
