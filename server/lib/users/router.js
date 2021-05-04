import Controller from "./Controller.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const router = require("express").Router();

router.get("/users", Controller.fetchUser);

router.post("/users", Controller.loginUser);

router.delete("/users", Controller.logoutUser);

export default router;
