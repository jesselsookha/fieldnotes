import { Pressable, StyleSheet, Text, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { Colors, Radius, Spacing } from "../constants/theme";

export default function NewTaskScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Pressable onPress={() => router.back()} style={styles.closeButton}>
          <Ionicons name="close" size={23} color={Colors.text} />
        </Pressable>

        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Ionicons name="create-outline" size={34} color={Colors.primary} />
          </View>

          <Text style={styles.title}>Create a task</Text>

          <Text style={styles.description}>
            Give your next activity a name, set a priority and decide when you
            want to complete it.
          </Text>

          <View style={styles.infoCard}>
            <Text style={styles.infoTitle}>Coming in Stage 2</Text>

            <Text style={styles.infoDescription}>
              We'll introduce interactive forms, validation, task creation and
              editing.
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    padding: Spacing.lg,
  },
  closeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
  },
  iconContainer: {
    width: 76,
    height: 76,
    borderRadius: Radius.xl,
    backgroundColor: Colors.primaryLight,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 27,
    fontWeight: "800",
    color: Colors.text,
    marginTop: Spacing.lg,
  },
  description: {
    color: Colors.muted,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 22,
    marginTop: Spacing.sm,
    maxWidth: 300,
  },
  infoCard: {
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    marginTop: Spacing.xl,
    width: "100%",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  infoTitle: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 14,
  },
  infoDescription: {
    color: Colors.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 7,
  },
});
