import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import cors from "cors";
import Middlewares from "./api/middlewares.js";
import UserRouter from "./lib/users/router.js";
const app = express(); //initialize server
app.use(express.json()); //recive information in json
app.use(
  cors({
    origin: "http://localhost:3000", //Allow the clinet server access
    credentials: true,
  })
);
app.use(cookieParser());
// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    secret: "keyboard cat",
    cookie: { maxAge: 600000 },
    resave: true,
    saveUninitialized: true,
  })
);
mongoose.connect(
  "mongodb+srv://HCAdmin:HCAdmin@brainsizzlerscluster.m8qrg.mongodb.net/brainSizzlers?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use(Middlewares.loginRequired);
app.use(UserRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3001....");
});
