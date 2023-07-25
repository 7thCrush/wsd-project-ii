import { sql } from "../database/database.js";

const addQuizAnswer = async (userId, questionId, questionAnswerOptionId) => {
  await sql`INSERT INTO question_answers (user_id, question_id, question_answer_option_id) VALUES (${userId}, ${questionId}, ${questionAnswerOptionId})`;
};

export { addQuizAnswer };