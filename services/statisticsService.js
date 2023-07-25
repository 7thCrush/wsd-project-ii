import { sql } from "../database/database.js";

const countTopics = async () => {
  const rows = await sql`SELECT COUNT(*) FROM topics`;

  if (rows[0].count === '0') {
    return 0;
  }

  return rows[0].count;
};

const countQuestionAnswers = async () => {
  const rows = await sql`SELECT COUNT(*) FROM question_answers`;

  return rows[0].count;
};

const countQuestions = async () => {
  const rows = await sql`SELECT COUNT(*) FROM questions`;

  return rows[0].count;
};

export { countTopics, countQuestionAnswers, countQuestions };