import { sql } from "../database/database.js";

const addOption = async (questionId, optionText, isCorrect) => {
  await sql`INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES (${questionId}, ${optionText}, ${isCorrect})`;
};

const deleteOption = async (id) => {
  await sql`DELETE FROM question_answers WHERE question_answer_option_id IN (SELECT id FROM question_answer_options WHERE id = ${id})`;
  await sql`DELETE FROM question_answer_options WHERE id = ${id}`;
};

const getOption = async (id) => {
  const rows = await sql`SELECT * FROM question_answer_options WHERE id = ${id}`;

  if(rows && rows.length > 0) {
    return rows[0];
  }

  return { id: 0, question_id: 0, option_text: "Unknown", is_correct: false };
};

const getOptions = async (questionId) => {
  const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId}`;
  return rows;
};

const getOptionWhereTrue = async (questionId) => {
  const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId} AND is_correct IS true`;

  if (rows && rows.length > 0) {
    return rows[0];
  }

  return { option_text: "none of the options" };
};

const getOptionWithQuestion = async (id, questionId) => {
  const rows = await sql`SELECT * FROM question_answer_options WHERE id = ${id} AND question_id = ${questionId}`;

  if(rows && rows.length > 0) {
    return rows[0];
  }

  return { id: 0, question_id: 0, option_text: "Unknown", is_correct: false };
};

const hasOptionWhereTrue = async (questionId) => {
  const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId} AND is_correct IS true`;

  if (rows && rows.length > 0) {
    return true;
  }

  return false;
};

export { addOption, deleteOption, getOption, getOptions, getOptionWhereTrue, getOptionWithQuestion, hasOptionWhereTrue };