const express = require("express");
const mongoose = require("mongoose");
var session = require("express-session");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.CLIENT_ID);
const cors = require("cors");
const UserModel = require("./models/User");

const app = express(); //initialize server
app.use(express.json()); //recive information in json
app.use(cors()); //corse is used to communicate from front-end to back-end
// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    key: "user_sid",
    secret: "somerandonstuffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 600000,
    },
  })
);
/**
 * Middleware to check if the user is currently logged in nor not
 * */
app.use(async (req, res, next) => {
  //If the user is attempting to login do nothing
  if (req.path === "/api/v1/auth/google") {
    return next();
  }
  //Authenticate user
  if (req.session.userId) {
    //Check if user exists
    const user = await UserModel.findOne({ _id: req.session.userId }).exec();
    if (user) {
      return next();
    }
  }
  res.status(403).send({ error: "Access Denied" });
});

mongoose.connect(
  "mongodb+srv://HCAdmin:HCAdmin@brainsizzlerscluster.m8qrg.mongodb.net/brainSizzlers?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
/**
 * Gets the currently logged in user
 */
app.get("/api/v1/auth/google", (req, res) => {
  res.send({ data: "hello" });
});

app.post("/api/v1/auth/google", async (req, res) => {
  const { token } = req.body;
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.CLIENT_ID,
  });
  const { name, email, picture } = ticket.getPayload();
  console.log(ticket.getPayload());
  var newUser = { name: name, email: email, picture: picture };
  /**
   * Save the user if the user is new or updates the user if they alaredy exist
   */
  const user = await UserModel.findOneAndUpdate(
    email,
    newUser,
    { upsert: true, useFindAndModify: false },
    function (err, doc) {
      if (err) return res.send(500, { error: err });
      req.session.userId = doc._id;
      req.session.save();
      res.status(201);
      res.json(newUser); //send the user data back
    }
  );
});

/**
 * Logs out the currently logged in user
 */
app.delete("/api/v1/auth/logout", async (req, res) => {
  await req.session.destroy();
  res.status(200);
  res.json({
    message: "Logged out successfully!",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000....");
});
