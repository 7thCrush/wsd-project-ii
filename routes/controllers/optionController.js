import * as optionService from "../../services/optionService.js";
import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const textValidationRules = {
  option_text: [validasaur.required, validasaur.minLength(1)],
};

const addOption = async ({ params, request, render, response }) => {
  const body = request.body({ type: "form" });
  const parameters = await body.value;
  const isCorrect = parameters.has("is_correct");

  const data = { option_text: parameters.get("option_text") };
  const [passes, errors] = await validasaur.validate(data, textValidationRules);

  if (await optionService.hasOptionWhereTrue(params.qId) && isCorrect) {
    
    if (!passes) {
      data.validationErrors = errors;
      data.topic = { id: params.id };
      data.question = await questionService.getQuestion(params.qId);
      data.options = await optionService.getOptions(params.qId);
      render("question.eta", data);
    } else {
      response.redirect(`/topics/${params.id}/questions/${params.qId}`);
    }

  } else {
    
    if (!passes) {
      data.validationErrors = errors;
      data.topic = { id: params.id };
      data.question = await questionService.getQuestion(params.qId);
      data.options = await optionService.getOptions(params.qId);
      render("question.eta", data);
    } else {
      await optionService.addOption(params.qId, parameters.get("option_text"), isCorrect);

      response.redirect(`/topics/${params.id}/questions/${params.qId}`);
    }
    
  }
};

const deleteOption = async ({ params, response }) => {
  await optionService.deleteOption(params.oId);

  response.redirect(`/topics/${params.id}/questions/${params.qId}`);
};

export { addOption, deleteOption };