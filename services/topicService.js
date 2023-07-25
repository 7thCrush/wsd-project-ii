import { sql } from "../database/database.js";

const addTopic = async (userId, name) => {
  await sql`INSERT INTO topics (user_id, name) VALUES (${userId}, ${name})`;
};

const allTopics = async () => {
  const rows = await sql`SELECT * FROM topics ORDER BY name`;
  return rows;
};

const deleteTopic = async (id) => {
  await sql`DELETE FROM question_answers WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${id})`;
  await sql`DELETE FROM question_answer_options WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${id})`;
  await sql`DELETE FROM questions WHERE topic_id = ${id}`;
  await sql`DELETE FROM topics WHERE id = ${id}`;
};

const getTopic = async (id) => {
  const rows = await sql`SELECT * FROM topics WHERE id = ${id}`;

  if (rows && rows.length > 0) {
    return rows[0];
  }

  return { id: 0, user_id: 0, name: "Unknown" };
};

export { addTopic, allTopics, deleteTopic, getTopic };