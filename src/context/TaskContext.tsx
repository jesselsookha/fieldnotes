import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { SQLiteDatabase } from "expo-sqlite";

import type { Task, TaskInput } from "../types/task";

import { getDatabase } from "../database/database";

import {
  deleteTask as deleteTaskFromDb,
  getAllTasks,
  insertTask,
  setTaskStatus,
  updateTask as updateTaskInDb,
} from "../repositories/taskRepository";

interface TaskContextValue {
  tasks: Task[];
  loading: boolean;
  error: string | null;

  addTask: (input: TaskInput) => Promise<boolean>;

  updateTask: (id: string, input: TaskInput) => Promise<boolean>;

  deleteTask: (id: string) => Promise<boolean>;

  toggleTaskStatus: (id: string) => Promise<boolean>;
}

export const TaskContext = createContext<TaskContextValue | undefined>(
  undefined,
);

interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [database, setDatabase] = useState<SQLiteDatabase | null>(null);

  const [tasks, setTasks] = useState<Task[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const refreshTasks = useCallback(async (db: SQLiteDatabase) => {
    const storedTasks = await getAllTasks(db);

    setTasks(storedTasks);
  }, []);

  // Initialise SQLite when the application starts.

  useEffect(() => {
    let mounted = true;

    async function initialise() {
      try {
        const db = await getDatabase();

        const storedTasks = await getAllTasks(db);

        if (mounted) {
          setDatabase(db);
          setTasks(storedTasks);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to initialise the database.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void initialise();

    return () => {
      mounted = false;
    };
  }, []);

  // CREATE

  const addTask = useCallback(
    async (input: TaskInput): Promise<boolean> => {
      if (!database) return false;

      try {
        const now = new Date().toISOString();

        const task: Task = {
          ...input,
          id:
            `${Date.now().toString(36)}-` + Math.random().toString(36).slice(2),
          createdAt: now,
          updatedAt: now,
        };

        await insertTask(database, task);

        await refreshTasks(database);

        setError(null);

        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to create task.");

        return false;
      }
    },
    [database, refreshTasks],
  );

  // UPDATE

  const updateTask = useCallback(
    async (id: string, input: TaskInput): Promise<boolean> => {
      if (!database) return false;

      try {
        await updateTaskInDb(database, id, input);

        await refreshTasks(database);

        setError(null);

        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to update task.");

        return false;
      }
    },
    [database, refreshTasks],
  );

  // DELETE

  const deleteTask = useCallback(
    async (id: string): Promise<boolean> => {
      if (!database) return false;

      try {
        await deleteTaskFromDb(database, id);

        await refreshTasks(database);

        setError(null);

        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unable to delete task.");

        return false;
      }
    },
    [database, refreshTasks],
  );

  // TOGGLE STATUS

  const toggleTaskStatus = useCallback(
    async (id: string): Promise<boolean> => {
      if (!database) return false;

      try {
        const task = tasks.find((item) => item.id === id);

        if (!task) return false;

        const nextStatus =
          task.status === "completed" ? "pending" : "completed";

        await setTaskStatus(database, id, nextStatus);

        await refreshTasks(database);

        setError(null);

        return true;
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Unable to update task status.",
        );

        return false;
      }
    },
    [database, tasks, refreshTasks],
  );

  const value = useMemo(
    () => ({
      tasks,
      loading,
      error,
      addTask,
      updateTask,
      deleteTask,
      toggleTaskStatus,
    }),
    [tasks, loading, error, addTask, updateTask, deleteTask, toggleTaskStatus],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
