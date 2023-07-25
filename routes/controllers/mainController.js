import * as statisticsService from "../../services/statisticsService.js";

const showMain = async ({ render }) => {
  const data = {
    topics: await statisticsService.countTopics(),
    questions: await statisticsService.countQuestions(),
    question_answers: await statisticsService.countQuestionAnswers(),
  }
  render("main.eta", data);
};

export { showMain };
