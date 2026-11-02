import {
    createContext,
    useCallback,
    useMemo,
    useState,
    type ReactNode,
} from "react";

import type { Task, TaskInput } from "../types/task";

import { sampleTasks } from "../data/sampleTasks";

interface TaskContextValue {
  tasks: Task[];
  addTask: (input: TaskInput) => void;
  updateTask: (id: string, input: TaskInput) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
}

export const TaskContext = createContext<TaskContextValue | undefined>(
  undefined,
);

interface TaskProviderProps {
  children: ReactNode;
}

export function TaskProvider({ children }: TaskProviderProps) {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);

  const addTask = useCallback((input: TaskInput) => {
    const now = new Date().toISOString();

    const newTask: Task = {
      ...input,
      id: Date.now().toString(),
      createdAt: now,
      updatedAt: now,
    };

    setTasks((current) => [newTask, ...current]);
  }, []);

  const updateTask = useCallback((id: string, input: TaskInput) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              ...input,
              updatedAt: new Date().toISOString(),
            }
          : task,
      ),
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks((current) => current.filter((task) => task.id !== id));
  }, []);

  const toggleTaskStatus = useCallback((id: string) => {
    setTasks((current) =>
      current.map((task) => {
        if (task.id !== id) {
          return task;
        }

        return {
          ...task,
          status: task.status === "completed" ? "pending" : "completed",
          updatedAt: new Date().toISOString(),
        };
      }),
    );
  }, []);

  const value = useMemo(
    () => ({
      tasks,
      addTask,
      updateTask,
      deleteTask,
      toggleTaskStatus,
    }),
    [tasks, addTask, updateTask, deleteTask, toggleTaskStatus],
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
