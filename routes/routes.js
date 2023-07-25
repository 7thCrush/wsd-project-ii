import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicController from "./controllers/topicController.js";
import * as questionController from "./controllers/questionController.js";
import * as optionController from "./controllers/optionController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";
import * as questionApi from "./apis/questionApi.js";

const router = new Router();

router.get("/", mainController.showMain);

router.get("/topics", topicController.viewTopics);
router.post("/topics", topicController.addTopic);
router.get("/topics/:id", topicController.viewTopic);
router.post("/topics/:id/delete", topicController.deleteTopic);

router.post("/topics/:id/questions", questionController.addQuestion);
router.get("/topics/:id/questions/:qId", questionController.viewQuestion);
router.post("/topics/:id/questions/:qId/delete", questionController.deleteQuestion);

router.post("/topics/:id/questions/:qId/options", optionController.addOption);
router.post("/topics/:id/questions/:qId/options/:oId/delete", optionController.deleteOption);

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/quiz", quizController.viewQuizTopics);
router.get("/quiz/:id", quizController.redirectQuiz);
router.get("/quiz/:id/questions/:qId", quizController.viewRandomQuiz);
router.post("/quiz/:id/questions/:qId/options/:oId", quizController.addQuizAnswer);
router.get("/quiz/:id/questions/:qId/correct", quizController.viewCorrect);
router.get("/quiz/:id/questions/:qId/incorrect", quizController.viewIncorrect);

router.get("/api/questions/random", questionApi.getRandomQuestionApi);
router.post("/api/questions/answer", questionApi.answerApi);

export { router };