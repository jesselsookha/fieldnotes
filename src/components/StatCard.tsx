import { StyleSheet, Text, View } from "react-native";

import { Colors, Radius, Spacing } from "../constants/theme";

interface StatCardProps {
  label: string;
  value: number;
  description: string;
  accent: string;
}

export function StatCard({ label, value, description, accent }: StatCardProps) {
  return (
    <View style={styles.card}>
      <View style={[styles.indicator, { backgroundColor: accent }]} />

      <Text style={styles.label}>{label}</Text>

      <Text style={styles.value}>{value}</Text>

      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 140,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  indicator: {
    width: 9,
    height: 9,
    borderRadius: 5,
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    color: Colors.muted,
    fontWeight: "500",
  },
  value: {
    fontSize: 29,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 5,
  },
  description: {
    fontSize: 11,
    color: Colors.muted,
    marginTop: 5,
  },
});
