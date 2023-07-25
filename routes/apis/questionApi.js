import * as questionService from "../../services/questionService.js";
import * as optionService from "../../services/optionService.js";

const answerApi = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const content = await body.value;
  const option = await optionService.getOptionWithQuestion(content.optionId, content.questionId);
  
  response.body = { correct: option.is_correct };
};

const getRandomQuestionApi = async ({ response }) => {
  const question = await questionService.getRandomQuestionAllTopics();
  
  if (!question.id) {
    response.body = { };
    return;
  }

  const options = await optionService.getOptions(question.id);
  const data = [];

  for (let i = 0; i < options.length; i++) {
    const block = {
      optionId: options[i].id,
      optionText: options[i].option_text,
    }
    data.push(block);
  }

  response.body = { questionId: question.id, questionText: question.question_text, answerOptions: data};
};

export { answerApi, getRandomQuestionApi };