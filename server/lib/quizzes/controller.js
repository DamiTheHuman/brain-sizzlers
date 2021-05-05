import QuizModel from "./model.js";

export default {
  /**
   * Creates a new quiz and adds it to the database
   */
  createQuiz: async (req, res) => {
    const userId = req.session.userId;
    if (userId == null) {
      return;
    }
    const data = req.body;
    const quiz = new QuizModel({ quiz: data.quiz, author: userId });
    /**
     * Save a new quiz to the database
     */
    quiz.save(function (err) {
      if (err) return res.send(500, { error: err });
      req.session.save();
      res.status(201);
    });
  },
  /**
   * Gets a list of quizzes from the database alongside the authors info
   */
  fetchQuizzes: async (req, res) => {
    const quizzes = await QuizModel.find().populate("author").exec();
    res.status(201);
    res.status(200).send({ status: 0, data: quizzes });
  },
};
