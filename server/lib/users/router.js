import Controller from "./controller.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const router = require("express").Router();

router.get("/users", Controller.fetchUsers);
router.get("/users/:name", Controller.fetchUser);

export default router;
