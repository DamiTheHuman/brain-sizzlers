import Controller from "./controller.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const router = require("express").Router();

router.post("/quizzes/create", Controller.createQuiz);
router.get("/quizzes", Controller.fetchQuizzes);
router.get("/quizzes/:name", Controller.fetchQuiz);
router.put("/quizzes/update/:name", Controller.updateQuiz);
export default router;
