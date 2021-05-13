import Controller from "./Controller.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const router = require("express").Router();

router.post("/quiz/create", Controller.createQuiz);
router.get("/quiz/all", Controller.fetchQuizzes);
router.get("/quiz/:name", Controller.fetchQuiz);
router.post("/quiz/update", Controller.updateQuiz);
export default router;
