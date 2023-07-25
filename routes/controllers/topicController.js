import * as topicService from "../../services/topicService.js";
import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const topicValidationRules = {
  name: [validasaur.required, validasaur.minLength(1)],
};

const addTopic = async ({ render, request, response, user }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;

  if (user.admin) {
    const data = { name: params.get("name") };
    const [passes, errors] = await validasaur.validate(data, topicValidationRules);

    if (!passes) {
      data.validationErrors = errors;
      data.topics = await topicService.allTopics();
      render("topics.eta", data);
    } else {
      await topicService.addTopic(user.id, params.get("name"));

      response.redirect("/topics");
    }
    
  } else {
    response.status = 401;
  }
};

const deleteTopic = async ({ params, response, user }) => {
  if (user.admin) {
    await topicService.deleteTopic(params.id);

    response.redirect("/topics");
  } else {
    response.status = 401;
  }
};

const viewTopic = async ({ params, render }) => {
  const topic = await topicService.getTopic(params.id);
  const questions = await questionService.getQuestions(params.id);
  render("topic.eta", { topic: topic, questions: questions });
};

const viewTopics = async ({ render }) => {
  const topics = await topicService.allTopics();
  render("topics.eta", { topics: topics });
};

export { addTopic, deleteTopic, viewTopic, viewTopics };