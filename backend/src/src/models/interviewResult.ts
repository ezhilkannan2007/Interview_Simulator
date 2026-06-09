import mysql from "mysql2/promise";
import pool from "../config/db";

export interface InterviewRecordInput {
  userId: number | null;
  topic: string;
  difficulty: string;
  score: number | null;
}

export interface ResponseRecord {
  question: string;
  answer: string;
  feedback: string | null;
  score: number | null;
}

const insertInterviewRecord = async (
  connection: mysql.PoolConnection,
  payload: InterviewRecordInput
): Promise<number> => {

  const sql = `
    INSERT INTO interviews (user_id, topic, difficulty, score, created_at)
    VALUES (?, ?, ?, ?, NOW())
  `;

  const [result] = await connection.execute(sql, [
    payload.userId,
    payload.topic,
    payload.difficulty,
    payload.score
  ]) as mysql.ResultSetHeader[];

  return result.insertId;
};

export const saveInterviewResult = async (
  interview: InterviewRecordInput,
  responses: ResponseRecord[]
): Promise<number> => {

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const interviewId = await insertInterviewRecord(connection, interview);

    if (responses.length) {
      const responseSql = `
        INSERT INTO responses (interview_id, question, answer, feedback, score)
        VALUES (?, ?, ?, ?, ?)
      `;

      for (const response of responses) {
        await connection.execute(responseSql, [
          interviewId,
          response.question,
          response.answer,
          response.feedback,
          response.score
        ]);
      }
    }

    await connection.commit();
    return interviewId;

  } catch (error) {
    await connection.rollback();
    throw error;

  } finally {
    connection.release();
  }
};