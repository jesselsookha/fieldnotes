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
  onSubmit: (input: TaskInput) => void;
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

  const [errors, setErrors] = useState<string[]>([]);

  function handleSubmit() {
    const validationErrors: string[] = [];

    if (!title.trim()) {
      validationErrors.push("Please enter a task title.");
    }

    if (!category.trim()) {
      validationErrors.push("Please enter a category.");
    }

    if (dueDate.trim() && !/^\d{4}-\d{2}-\d{2}$/.test(dueDate.trim())) {
      validationErrors.push("Please use the date format YYYY-MM-DD.");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);

      Alert.alert("Check your information", validationErrors.join("\n"));

      return;
    }

    setErrors([]);

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      category: category.trim(),
      priority,
      status,
      dueDate: dueDate.trim(),
    });
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

        <Text style={styles.helper}>Example: 2026-11-05</Text>
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

      {errors.length > 0 && (
        <Text style={styles.error}>
          Please correct the highlighted information.
        </Text>
      )}

      <Pressable onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>{submitLabel}</Text>
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
  helper: {
    color: Colors.muted,
    fontSize: 11,
    marginTop: 6,
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
  error: {
    color: Colors.danger,
    fontSize: 12,
    marginBottom: Spacing.md,
  },
  submitButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.md,
    borderRadius: Radius.md,
    alignItems: "center",
    marginTop: Spacing.md,
  },
  submitText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
});
