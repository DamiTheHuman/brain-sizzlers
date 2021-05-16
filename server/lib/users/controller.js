import UserModel from "./model.js";
import QuizModel from "../quizzes/model.js";
import { OAuth2Client } from "google-auth-library";
const client = new OAuth2Client(process.env.CLIENT_ID);

export default {
  /**
   * Fetches a list of users from the database
   */
  fetchUsers: async (req, res) => {
    let limit = req.query.limit;
    let sort = req.query.sort;
    let order = -1;
    if (req.query.order) {
      order = req.query.order === "desc" ? -1 : 1;
    }
    const users = await UserModel.find()
      .sort({ [sort]: order })
      .limit(parseInt(limit))
      .exec();
    res.status(201);
    res.status(200).send({ status: 0, data: users });
  },
  /**
   * Fetches a singular user from the database and returns into the user
   */
  fetchUser: async (req, res) => {
    const user = await UserModel.findOne({ name: req.params.name }).exec();
    if (user) {
      const quizzes = await QuizModel.find({ author: user.id }); //Get all the quizzes the user has made
      user.quizzes = quizzes;
      res.status(200).send({ status: 0, data: user });
    } else {
      res.status(404);
    }
  },
};
