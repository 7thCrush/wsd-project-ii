import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";
import * as quizService from "../../services/quizService.js";

const addQuizAnswer = async ({ params, response, user }) => {
  const option = await optionService.getOptionWithQuestion(params.oId, params.qId);
  await quizService.addQuizAnswer(user.id, params.qId, params.oId);
  if (option.is_correct) {
    response.redirect(`/quiz/${params.id}/questions/${params.qId}/correct`);
  } else {
    response.redirect(`/quiz/${params.id}/questions/${params.qId}/incorrect`);
  }
};

const viewCorrect = ({ params, render }) => {
  const topic = {
    id: params.id,
  }
  render("correct.eta", { topic: topic });
};

const viewIncorrect = async ({ params, render }) => {
  const topic = {
    id: params.id,
  }
  const option = await optionService.getOptionWhereTrue(params.qId);
  render("incorrect.eta", { topic: topic, option: option });
};

const viewQuizTopics = async ({ render }) => {
  const topics = await topicService.allTopics();
  render("quiz.eta", { topics: topics });
};

const viewRandomQuiz = async ({ params, render }) => {
  const topic = await topicService.getTopic(params.id);
  const question = await questionService.getQuestion(params.qId);
  const options = await optionService.getOptions(question.id);
  render("randomQuestion.eta", { topic: topic, question: question, options: options });
};

const redirectQuiz = async ({ params, response }) => {
  const question = await questionService.getRandomQuestion(params.id);
  if (!question.id) {
    question.id = 0;
  }
  
  response.redirect(`/quiz/${params.id}/questions/${question.id}`);
};

export { addQuizAnswer, viewCorrect, viewIncorrect, viewQuizTopics, viewRandomQuiz, redirectQuiz };