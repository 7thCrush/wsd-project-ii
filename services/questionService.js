import { sql } from "../database/database.js";

const addQuestion = async (userId, topicId, questionText) => {
  await sql`INSERT INTO questions (user_id, topic_id, question_text) VALUES (${userId}, ${topicId}, ${questionText})`;
};

const deleteQuestion = async (id) => {
  await sql`DELETE FROM questions WHERE id = ${id}`;
};

const getQuestion = async (id) => {
  const rows = await sql`SELECT * FROM questions WHERE id = ${id}`;

  if (rows && rows.length > 0) {
    return rows[0];
  }

  return { id: 0, user_id: 0, topic_id: 0, question_text: "Unknown" };
};

const getQuestions = async (topicId) => {
  const rows = await sql`SELECT * FROM questions WHERE topic_id = ${topicId}`;
  return rows;
};

const getRandomQuestion = async (topicId) => {
  const rows = await sql`SELECT * FROM questions WHERE topic_id = ${topicId} ORDER BY RANDOM() LIMIT 1`;

  if (rows && rows.length > 0) {
    return rows[0];
  }

  return { id: false };
};

const getRandomQuestionAllTopics = async () => {
  const rows = await sql`SELECT * FROM questions ORDER BY RANDOM() LIMIT 1`;

  if (rows && rows.length > 0) {
    return rows[0];
  }

  return { id: false };
};

export { addQuestion, deleteQuestion, getQuestion, getQuestions, getRandomQuestion, getRandomQuestionAllTopics };