import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import { router, useLocalSearchParams } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

import { Colors, Radius, Spacing } from "../constants/theme";

import { TaskForm } from "../components/TaskForm";
import { useTasks } from "../hooks/useTasks";

import type { TaskInput } from "../types/task";

export default function NewTaskScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const { tasks, loading, addTask, updateTask } = useTasks();

  const existingTask = id ? tasks.find((task) => task.id === id) : undefined;

  const isEditing = Boolean(id);

  async function handleSubmit(input: TaskInput) {
    const success = existingTask
      ? await updateTask(existingTask.id, input)
      : await addTask(input);

    if (success) {
      router.back();
    } else {
      Alert.alert(
        "Unable to save task",
        "Your task could not be saved. Please try again.",
      );
    }
  }

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundTitle}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (isEditing && !existingTask) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFound}>
          <Text style={styles.notFoundTitle}>Task not found</Text>

          <Pressable onPress={() => router.back()}>
            <Text style={styles.backText}>Go back</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.closeButton}
          accessibilityRole="button"
          accessibilityLabel="Close task form"
        >
          <Ionicons name="close" size={22} color={Colors.text} />
        </Pressable>

        <Text style={styles.title}>
          {isEditing ? "Edit task" : "Create a task"}
        </Text>

        <View style={styles.placeholder} />
      </View>

      <View style={styles.body}>
        <TaskForm
          key={existingTask?.id ?? "new"}
          initialTask={existingTask}
          onSubmit={handleSubmit}
          submitLabel={isEditing ? "Save changes" : "Create task"}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: Radius.round,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },
  placeholder: {
    width: 40,
  },
  body: {
    flex: 1,
    paddingHorizontal: Spacing.md,
  },
  notFound: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.md,
  },
  notFoundTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.text,
  },
  backText: {
    color: Colors.primary,
    fontWeight: "600",
  },
});
