import { StyleSheet, Text, View } from "react-native";

import { Colors, Radius, Spacing } from "../constants/theme";
import type { Task } from "../types/task";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const priorityColor = {
    low: Colors.success,
    medium: Colors.warning,
    high: Colors.danger,
  }[task.priority];

  const statusLabel = {
    pending: "Pending",
    "in-progress": "In progress",
    completed: "Completed",
  }[task.status];

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.category}>
          <Text style={styles.categoryText}>{task.category}</Text>
        </View>

        <View style={styles.priority}>
          <View
            style={[styles.priorityDot, { backgroundColor: priorityColor }]}
          />

          <Text style={styles.priorityText}>{task.priority}</Text>
        </View>
      </View>

      <Text style={styles.title}>{task.title}</Text>

      <Text style={styles.description}>{task.description}</Text>

      <View style={styles.footer}>
        <Text style={styles.date}>Due {task.dueDate}</Text>

        <Text
          style={[
            styles.status,
            task.status === "completed" && styles.completed,
          ]}
        >
          {statusLabel}
        </Text>
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
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  category: {
    backgroundColor: Colors.primaryLight,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.round,
  },
  categoryText: {
    color: Colors.primary,
    fontSize: 11,
    fontWeight: "600",
  },
  priority: {
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
    fontSize: 11,
    textTransform: "capitalize",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    marginTop: Spacing.md,
  },
  description: {
    fontSize: 13,
    color: Colors.muted,
    lineHeight: 19,
    marginTop: 5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.md,
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  date: {
    fontSize: 11,
    color: Colors.muted,
  },
  status: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.warning,
  },
  completed: {
    color: Colors.success,
  },
});
