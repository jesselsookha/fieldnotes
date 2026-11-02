import { StyleSheet, Text, View } from "react-native";

import { Colors, Radius } from "../constants/theme";

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
    width: 0,
    minWidth: 0,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    paddingHorizontal: 7,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginBottom: 10,
  },
  label: {
    fontSize: 10,
    color: Colors.muted,
    fontWeight: "600",
  },
  value: {
    fontSize: 25,
    fontWeight: "700",
    color: Colors.text,
    marginTop: 5,
  },
  description: {
    fontSize: 9,
    color: Colors.muted,
    marginTop: 5,
  },
});
