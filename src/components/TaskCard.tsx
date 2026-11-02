import { Alert, Pressable, StyleSheet, Text, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { Colors, Radius, Spacing } from "../constants/theme";

import type { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
  onPress: () => void;
  onToggle: () => void;
  onDelete: () => void;
}

export function TaskCard({ task, onPress, onToggle, onDelete }: TaskCardProps) {
  const priorityColor = {
    low: Colors.success,
    medium: Colors.warning,
    high: Colors.danger,
  }[task.priority];

  function confirmDelete() {
    Alert.alert(
      "Delete task?",
      `Are you sure you want to delete "${task.title}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: onDelete,
        },
      ],
    );
  }

  return (
    <View style={styles.card}>
      <View style={styles.mainRow}>
        <Pressable
          onPress={onToggle}
          style={styles.checkButton}
          accessibilityRole="checkbox"
          accessibilityState={{
            checked: task.status === "completed",
          }}
          accessibilityLabel={`Mark ${task.title} ${
            task.status === "completed" ? "incomplete" : "complete"
          }`}
        >
          <Ionicons
            name={
              task.status === "completed"
                ? "checkmark-circle"
                : "ellipse-outline"
            }
            size={25}
            color={task.status === "completed" ? Colors.success : Colors.muted}
          />
        </Pressable>

        <Pressable
          onPress={onPress}
          style={styles.content}
          accessibilityRole="button"
          accessibilityLabel={`Edit ${task.title}`}
        >
          <Text
            style={[
              styles.title,
              task.status === "completed" && styles.completedTitle,
            ]}
            numberOfLines={2}
          >
            {task.title}
          </Text>

          <Text style={styles.description} numberOfLines={2}>
            {task.description || "No description"}
          </Text>
        </Pressable>

        <Pressable
          onPress={confirmDelete}
          style={styles.deleteButton}
          accessibilityRole="button"
          accessibilityLabel={`Delete ${task.title}`}
        >
          <Ionicons name="trash-outline" size={19} color={Colors.muted} />
        </Pressable>
      </View>

      <View style={styles.footer}>
        <View style={styles.category}>
          <Text style={styles.categoryText}>{task.category}</Text>
        </View>

        <View style={styles.metadata}>
          <View
            style={[styles.priorityDot, { backgroundColor: priorityColor }]}
          />

          <Text style={styles.priorityText}>{task.priority}</Text>

          <Text style={styles.separator}>·</Text>

          <Text style={styles.statusText}>
            {task.status === "in-progress" ? "In progress" : task.status}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  mainRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.sm,
  },
  checkButton: {
    paddingTop: 1,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: Colors.text,
  },
  completedTitle: {
    textDecorationLine: "line-through",
    color: Colors.muted,
  },
  description: {
    fontSize: 12,
    color: Colors.muted,
    lineHeight: 18,
    marginTop: 5,
  },
  deleteButton: {
    padding: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.md,
    marginTop: Spacing.md,
  },
  category: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.round,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "600",
    color: Colors.primary,
  },
  metadata: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  priorityDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  priorityText: {
    color: Colors.muted,
    fontSize: 10,
    textTransform: "capitalize",
  },
  separator: {
    color: Colors.muted,
  },
  statusText: {
    color: Colors.muted,
    fontSize: 10,
    textTransform: "capitalize",
  },
});
