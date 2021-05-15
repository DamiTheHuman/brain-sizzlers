import Controller from "./Controller.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const router = require("express").Router();

router.get("/auth/login", Controller.sessionLoginUser); //Fetch current session

router.post("/auth/login", Controller.loginUser);

router.delete("/auth/logout", Controller.logoutUser);

export default router;
