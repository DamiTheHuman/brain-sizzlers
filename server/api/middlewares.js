import UserModel from "../lib/users/model.js";

export default {
  loginRequired: async (req, res, next) => {
    const path = req.baseUrl + (req.path === "/" ? "" : req.path); //Ensures it doenst end with a "/"

    //If the user is attempting to login do nothing
    if (req.method === "POST" && path === "/auth/login") {
      return next();
    }
    //Check if the user is logged in
    if (req.session.userId) {
      //Check if user exists
      const user = await UserModel.findOne({ _id: req.session.userId }).exec();
      if (user) {
        req.user = user; //store the user in the request object
        return next();
      } else {
        await req.session.destroy();
        res.status(404);
      }
    } else {
      res.status(403).send({ error: "Access Denied" });
    }
  },
};
