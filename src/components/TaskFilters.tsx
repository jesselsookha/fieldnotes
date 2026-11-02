import { Pressable, StyleSheet, Text, View } from "react-native";

import { Colors, Radius, Spacing } from "../constants/theme";

import type { TaskStatus } from "../types/task";

export type TaskFilter = TaskStatus | "all";

interface TaskFiltersProps {
  selected: TaskFilter;
  onChange: (filter: TaskFilter) => void;
}

const filters: { label: string; value: TaskFilter }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "In progress", value: "in-progress" },
  { label: "Completed", value: "completed" },
];

export function TaskFilters({ selected, onChange }: TaskFiltersProps) {
  return (
    <View style={styles.container}>
      {filters.map((filter) => {
        const active = selected === filter.value;

        return (
          <Pressable
            key={filter.value}
            onPress={() => onChange(filter.value)}
            style={[styles.filter, active && styles.activeFilter]}
          >
            <Text style={[styles.label, active && styles.activeLabel]}>
              {filter.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  filter: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 13,
    paddingVertical: 9,
    borderRadius: Radius.round,
  },
  activeFilter: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  label: {
    fontSize: 11,
    fontWeight: "600",
    color: Colors.muted,
  },
  activeLabel: {
    color: "#FFFFFF",
  },
});
