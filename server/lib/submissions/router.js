import Controller from "./Controller.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const router = require("express").Router();

router.post("/submissions/create", Controller.createSubmission);
router.get("/submissions", Controller.fetchSubmissions);

export default router;
