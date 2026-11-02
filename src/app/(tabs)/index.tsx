import {
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    useWindowDimensions,
    View,
} from "react-native";

import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { SectionHeading } from "../../components/SectionHeading";
import { StatCard } from "../../components/StatCard";
import { TaskCard } from "../../components/TaskCard";
import { Colors, Radius, Spacing } from "../../constants/theme";
import { sampleTasks } from "../../data/sampleTasks";

export default function DashboardScreen() {
  const { width } = useWindowDimensions();

  const completed = sampleTasks.filter(
    (task) => task.status === "completed",
  ).length;

  const inProgress = sampleTasks.filter(
    (task) => task.status === "in-progress",
  ).length;

  const pending = sampleTasks.filter(
    (task) => task.status === "pending",
  ).length;

  const recentTasks = sampleTasks
    .filter((task) => task.status !== "completed")
    .slice(0, 2);

  const compact = width < 380;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={[styles.container, { maxWidth: 760 }]}>
          {/* Header */}

          <View style={styles.header}>
            <View>
              <Text style={styles.eyebrow}>FIELDNOTES</Text>

              <Text style={styles.heading}>Good morning.</Text>

              <Text style={styles.subtitle}>
                Here's what's happening today.
              </Text>
            </View>

            <View style={styles.avatar}>
              <Text style={styles.avatarText}>FN</Text>
            </View>
          </View>

          {/* Welcome panel */}

          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeLabel}>YOUR PRODUCTIVITY SPACE</Text>

            <Text style={styles.welcomeTitle}>Make today{"\n"}count.</Text>

            <Text style={styles.welcomeDescription}>
              Keep your activities organised, wherever you happen to be.
            </Text>

            <Pressable
              style={styles.primaryButton}
              onPress={() => router.push("/new-task")}
            >
              <Text style={styles.primaryButtonText}>Create a task</Text>
            </Pressable>

            <View style={styles.decorativeCircle} />
          </View>

          {/* Statistics */}

          <SectionHeading
            title="Your activity"
            subtitle="A snapshot of your tasks"
          />

          <View style={[styles.statsContainer, compact && styles.compactStats]}>
            <StatCard
              label="Completed"
              value={completed}
              description="Finished tasks"
              accent={Colors.success}
            />

            <StatCard
              label="In progress"
              value={inProgress}
              description="Currently working on"
              accent={Colors.warning}
            />

            <StatCard
              label="Pending"
              value={pending}
              description="Waiting to be started"
              accent={Colors.primary}
            />
          </View>

          {/* Recent tasks */}

          <View style={styles.section}>
            <SectionHeading
              title="Recent tasks"
              subtitle="Things that need your attention"
            />

            {recentTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}

            <Pressable
              style={styles.secondaryButton}
              onPress={() => router.push("/tasks")}
            >
              <Text style={styles.secondaryButtonText}>View all tasks →</Text>
            </Pressable>
          </View>

          {/* Footer */}

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              FieldNotes · Your day, organised.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.xl,
    alignItems: "center",
  },
  container: {
    width: "100%",
    alignSelf: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 2,
    color: Colors.primary,
  },
  heading: {
    fontSize: 27,
    fontWeight: "800",
    color: Colors.text,
    marginTop: 5,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.muted,
    marginTop: 5,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: Colors.primary,
    fontWeight: "800",
  },
  welcomeCard: {
    backgroundColor: Colors.primary,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.xl,
    overflow: "hidden",
  },
  welcomeLabel: {
    color: "#C4DCD1",
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.5,
  },
  welcomeTitle: {
    color: "#FFFFFF",
    fontSize: 34,
    fontWeight: "800",
    lineHeight: 39,
    marginTop: 14,
  },
  welcomeDescription: {
    color: "#D8E8E0",
    fontSize: 13,
    lineHeight: 20,
    maxWidth: 250,
    marginTop: 10,
  },
  primaryButton: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: Radius.md,
    alignSelf: "flex-start",
    marginTop: Spacing.lg,
  },
  primaryButtonText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: "700",
  },
  decorativeCircle: {
    position: "absolute",
    width: 145,
    height: 145,
    borderRadius: 73,
    backgroundColor: "rgba(255,255,255,0.07)",
    right: -48,
    top: -48,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignContent: "flex-start",
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  compactStats: {
    flexDirection: "column",
  },
  section: {
    marginTop: Spacing.sm,
  },
  secondaryButton: {
    alignSelf: "center",
    padding: Spacing.md,
  },
  secondaryButtonText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: "700",
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.lg,
    marginTop: Spacing.lg,
  },
  footerText: {
    color: Colors.muted,
    fontSize: 11,
    textAlign: "center",
  },
});
