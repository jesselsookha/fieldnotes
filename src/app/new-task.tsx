import { Pressable, StyleSheet, Text, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors, Radius, Spacing } from "../constants/theme";

import { TaskForm } from "../components/TaskForm";
import { useTasks } from "../hooks/useTasks";

export default function NewTaskScreen() {
  const { id } = useLocalSearchParams<{ id?: string }>();

  const { tasks, addTask, updateTask } = useTasks();

  const existingTask = id ? tasks.find((task) => task.id === id) : undefined;

  const isEditing = Boolean(id);

  function handleSubmit(input: Parameters<typeof addTask>[0]) {
    if (existingTask) {
      updateTask(existingTask.id, input);
    } else {
      addTask(input);
    }

    router.back();
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
