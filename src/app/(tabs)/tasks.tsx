import { useMemo, useState } from "react";

import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors, Spacing } from "../../constants/theme";

import { SectionHeading } from "../../components/SectionHeading";
import { TaskCard } from "../../components/TaskCard";
import { TaskFilters, type TaskFilter } from "../../components/TaskFilters";

import { useTasks } from "../../hooks/useTasks";

export default function TasksScreen() {
  const { tasks, toggleTaskStatus, deleteTask } = useTasks();

  const [filter, setFilter] = useState<TaskFilter>("all");

  const filteredTasks = useMemo(() => {
    if (filter === "all") {
      return tasks;
    }

    return tasks.filter((task) => task.status === filter);
  }, [tasks, filter]);

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>FIELDNOTES</Text>

          <Text style={styles.title}>Your tasks</Text>

          <Text style={styles.subtitle}>
            Everything you need to keep track of.
          </Text>
        </View>

        <SectionHeading
          title="All activities"
          subtitle={`${tasks.length} tasks in your workspace`}
        />

        <TaskFilters selected={filter} onChange={setFilter} />

        {filteredTasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="clipboard-outline" size={38} color={Colors.muted} />

            <Text style={styles.emptyTitle}>Nothing here yet</Text>

            <Text style={styles.emptyDescription}>
              There are no tasks matching this filter.
            </Text>
          </View>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onPress={() =>
                router.push({
                  pathname: "/new-task",
                  params: { id: task.id },
                })
              }
              onToggle={() => toggleTaskStatus(task.id)}
              onDelete={() => deleteTask(task.id)}
            />
          ))
        )}

        <Pressable
          style={styles.button}
          onPress={() => router.push("/new-task")}
        >
          <Text style={styles.buttonText}>+ Create a new task</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.md,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xl,
  },
  header: {
    marginBottom: Spacing.xl,
  },
  eyebrow: {
    color: Colors.primary,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
  },
  title: {
    color: Colors.text,
    fontSize: 29,
    fontWeight: "800",
    marginTop: 7,
  },
  subtitle: {
    color: Colors.muted,
    fontSize: 13,
    marginTop: 5,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: 14,
    alignItems: "center",
    marginTop: Spacing.md,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: Spacing.xxl,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginTop: Spacing.md,
  },
  emptyDescription: {
    fontSize: 12,
    color: Colors.muted,
    marginTop: 5,
    textAlign: "center",
  },
});
