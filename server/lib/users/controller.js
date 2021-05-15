import UserModel from "./model.js";
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
};
