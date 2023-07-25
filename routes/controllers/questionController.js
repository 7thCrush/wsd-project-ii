import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";
import * as topicService from "../../services/topicService.js";
import { validasaur } from "../../deps.js";

const textValidationRules = {
  question_text: [validasaur.required, validasaur.minLength(1)],
};

const addQuestion = async ({ params, render, request, response, user }) => {
  const body = request.body({ type: "form" });
  const parameters = await body.value;

  const data = { question_text: parameters.get("question_text") };
  const [passes, errors] = await validasaur.validate(data, textValidationRules);

  if (!passes) {
    data.validationErrors = errors;
    data.topic = await topicService.getTopic(params.id);
    data.questions = await questionService.getQuestions(params.id);
    render("topic.eta", data);
  } else {
    await questionService.addQuestion(user.id, params.id, parameters.get("question_text"));

    response.redirect(`/topics/${params.id}`);
  }
};

const deleteQuestion = async ({ params, response }) => {
  await questionService.deleteQuestion(params.qId);

  response.redirect(`/topics/${params.id}`);
};

const viewQuestion = async ({ params, render }) => {
  const topic = {
    id: params.id,
  }
  const question = await questionService.getQuestion(params.qId);
  const options = await optionService.getOptions(params.qId);
  render("question.eta", { topic: topic, question: question, options: options });
};

export { addQuestion, deleteQuestion, viewQuestion };