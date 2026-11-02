import type { SQLiteDatabase } from "expo-sqlite";

import type { Task, TaskInput } from "../types/task";

interface TaskRow {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: Task["priority"];
  status: Task["status"];
  due_date: string;
  created_at: string;
  updated_at: string;
}

function mapTask(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    category: row.category,
    priority: row.priority,
    status: row.status,
    dueDate: row.due_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function getAllTasks(db: SQLiteDatabase): Promise<Task[]> {
  const rows = await db.getAllAsync<TaskRow>(
    `SELECT *
     FROM tasks
     ORDER BY updated_at DESC`,
  );

  return rows.map(mapTask);
}

export async function insertTask(
  db: SQLiteDatabase,
  task: Task,
): Promise<void> {
  await db.runAsync(
    `INSERT INTO tasks (
      id,
      title,
      description,
      category,
      priority,
      status,
      due_date,
      created_at,
      updated_at
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    task.id,
    task.title,
    task.description,
    task.category,
    task.priority,
    task.status,
    task.dueDate,
    task.createdAt,
    task.updatedAt,
  );
}

export async function updateTask(
  db: SQLiteDatabase,
  id: string,
  input: TaskInput,
): Promise<void> {
  await db.runAsync(
    `UPDATE tasks
     SET
       title = ?,
       description = ?,
       category = ?,
       priority = ?,
       status = ?,
       due_date = ?,
       updated_at = ?
     WHERE id = ?`,
    input.title,
    input.description,
    input.category,
    input.priority,
    input.status,
    input.dueDate,
    new Date().toISOString(),
    id,
  );
}

export async function deleteTask(
  db: SQLiteDatabase,
  id: string,
): Promise<void> {
  await db.runAsync("DELETE FROM tasks WHERE id = ?", id);
}

export async function setTaskStatus(
  db: SQLiteDatabase,
  id: string,
  status: Task["status"],
): Promise<void> {
  await db.runAsync(
    `UPDATE tasks
     SET status = ?, updated_at = ?
     WHERE id = ?`,
    status,
    new Date().toISOString(),
    id,
  );
}
