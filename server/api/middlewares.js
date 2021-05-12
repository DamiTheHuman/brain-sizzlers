import UserModel from "../lib/users/model.js";

export default {
  loginRequired: async (req, res, next) => {
    const path = req.baseUrl + (req.path === "/" ? "" : req.path); //Ensures it doenst end with a "/"
    //If the user is attempting to login do nothing
    if ((req.method === "POST" && path === "/users") || path === "/users/all") {
      return next();
    }

    //Authenticate user
    if (req.session.userId) {
      //Check if user exists
      const user = await UserModel.findOne({ _id: req.session.userId }).exec();
      if (user) {
        req.user = user; //store the user in the request object
        return next();
      } else {
        await req.session.destroy();
      }
    }
    if (req.method === "GET") {
      return res.status(200).send({ status: 0, data: null });
    }
    res.status(403).send({ error: "Access Denied" });
  },
};
