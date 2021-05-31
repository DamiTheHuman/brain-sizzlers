import UserModel from "../users/model.js";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.CLIENT_ID);

export default {
  /**
   * Returns the currently authenitcated users
   */
  sessionLoginUser: async (req, res) => {
    res.status(201);
    res.send(req.user);
  },
  /**
   * Saves a new user or logs in a existing user
   */
  loginUser: async (req, res) => {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    });
    const { name, email, picture } = ticket.getPayload();
    const newUser = {
      name: name,
      email: email,
      picture: picture,
      points: 0,
      attempts: 0,
    };
    /**
     * Save the user if the user is new or updates the user if they alaredy exist
     */
    const user = await UserModel.findOneAndUpdate(
      { email: email },
      newUser,
      { upsert: true, useFindAndModify: false },
      function (err, doc) {
        if (err) return res.send(500, { error: err });
        req.session.userId = doc._id;
        req.session.save(() => {
          res.status(201);
          res.send(newUser); //send the user data back
        });
      }
    );
  },
  /**
   * Logs out the currently logged in user
   */
  logoutUser: async (req, res) => {
    await req.session.destroy();
    res.status(200);
    res.json({});
  },
};
