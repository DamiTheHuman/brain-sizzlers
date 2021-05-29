import SubmissionModel from "./model.js";

export default {
  /**
   * Creates a new submission and adds it to the database
   */
  createSubmission: async (req, res) => {
    const userId = req.session.userId;
    if (userId == null) {
      return;
    }
    const submissionData = req.body.submission;
    const submission = new SubmissionModel({
      correct: submissionData.correct,
      wrong: submissionData.wrong,
      user: userId,
      quiz: submissionData.quizId,
    });
    /**
     * Save a new submission to the database
     */
    submission.save(function (err) {
      if (err) return res.send(500, { error: err });
      req.session.save();
      res.status(201);
    });
  },
  /**
   * Fetch submissions that match the set parameters where available
   */
  fetchSubmissions: async (req, res) => {
    let limit = req.query.limit;
    let sort = req.query.sort;
    let order = -1;
    if (req.query.order) {
      order = req.query.order === "desc" ? -1 : 1;
    }
    const find = req.query.find ? JSON.parse(req.query.find) : {};
    const submissions = await SubmissionModel.find(find)
      .sort({ [sort]: order })
      .limit(parseInt(limit))
      .populate(["quiz", "user"])
      .exec();
    res.status(201);
    res.status(200).send(submissions);
  },
};
