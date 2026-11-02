import { useState } from "react";

import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import { Colors, Radius, Spacing } from "../constants/theme";

import type { Task, TaskInput, TaskPriority, TaskStatus } from "../types/task";

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (input: TaskInput) => void | Promise<void>;
  submitLabel: string;
}

const priorities: TaskPriority[] = ["low", "medium", "high"];

const statuses: TaskStatus[] = ["pending", "in-progress", "completed"];

export function TaskForm({
  initialTask,
  onSubmit,
  submitLabel,
}: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title ?? "");

  const [description, setDescription] = useState(
    initialTask?.description ?? "",
  );

  const [category, setCategory] = useState(initialTask?.category ?? "Personal");

  const [priority, setPriority] = useState<TaskPriority>(
    initialTask?.priority ?? "medium",
  );

  const [status, setStatus] = useState<TaskStatus>(
    initialTask?.status ?? "pending",
  );

  const [dueDate, setDueDate] = useState(initialTask?.dueDate ?? "");

  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (!title.trim()) {
      Alert.alert("Missing information", "Please enter a task title.");

      return;
    }

    if (!category.trim()) {
      Alert.alert("Missing information", "Please enter a category.");

      return;
    }

    if (dueDate.trim() && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate.trim())) {
      Alert.alert("Invalid date", "Please use YYYY-MM-DD.");

      return;
    }

    setSubmitting(true);

    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        category: category.trim(),
        priority,
        status,
        dueDate: dueDate.trim(),
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.field}>
        <Text style={styles.label}>Task title *</Text>

        <TextInput
          value={title}
          onChangeText={setTitle}
          placeholder="What needs to be done?"
          placeholderTextColor={Colors.muted}
          autoCapitalize="sentences"
          autoCorrect
          returnKeyType="next"
          maxLength={100}
          style={styles.input}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Description</Text>

        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Add some details..."
          placeholderTextColor={Colors.muted}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          autoCapitalize="sentences"
          style={[styles.input, styles.textArea]}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Category *</Text>

        <TextInput
          value={category}
          onChangeText={setCategory}
          placeholder="e.g. Work, Personal"
          placeholderTextColor={Colors.muted}
          autoCapitalize="words"
          style={styles.input}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Due date</Text>

        <TextInput
          value={dueDate}
          onChangeText={setDueDate}
          placeholder="YYYY-MM-DD"
          placeholderTextColor={Colors.muted}
          keyboardType="numbers-and-punctuation"
          maxLength={10}
          style={styles.input}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Priority</Text>

        <View style={styles.options}>
          {priorities.map((option) => (
            <Pressable
              key={option}
              onPress={() => setPriority(option)}
              style={[
                styles.option,
                priority === option && styles.selectedOption,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  priority === option && styles.selectedOptionText,
                ]}
              >
                {option}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Status</Text>

        <View style={styles.options}>
          {statuses.map((option) => (
            <Pressable
              key={option}
              onPress={() => setStatus(option)}
              style={[
                styles.option,
                status === option && styles.selectedOption,
              ]}
            >
              <Text
                style={[
                  styles.optionText,
                  status === option && styles.selectedOptionText,
                ]}
              >
                {option === "in-progress" ? "In progress" : option}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Pressable
        onPress={() => void handleSubmit()}
        disabled={submitting}
        style={[styles.submitButton, submitting && styles.disabledButton]}
      >
        <Text style={styles.submitText}>
          {submitting ? "Saving..." : submitLabel}
        </Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    paddingBottom: Spacing.xxl,
  },
  field: {
    marginBottom: Spacing.lg,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.md,
    paddingHorizontal: Spacing.md,
    paddingVertical: 13,
    fontSize: 14,
    color: Colors.text,
  },
  textArea: {
    minHeight: 105,
  },
  options: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  option: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radius.round,
    paddingHorizontal: 13,
    paddingVertical: 9,
    backgroundColor: Colors.surface,
  },
  selectedOption: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionText: {
    color: Colors.muted,
    fontSize: 12,
    fontWeight: "600",
    textTransform: "capitalize",
  },
  selectedOptionText: {
    color: "#FFFFFF",
  },
  submitButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: Radius.md,
    alignItems: "center",
    marginTop: Spacing.md,
  },
  disabledButton: {
    opacity: 0.6,
  },
  submitText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});
