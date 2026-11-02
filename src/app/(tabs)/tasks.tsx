import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { SectionHeading } from "../../components/SectionHeading";
import { TaskCard } from "../../components/TaskCard";
import { Colors, Spacing } from "../../constants/theme";
import { sampleTasks } from "../../data/sampleTasks";

export default function TasksScreen() {
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
          subtitle={`${sampleTasks.length} tasks in your workspace`}
        />

        {sampleTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

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
});
