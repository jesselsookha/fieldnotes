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

      <Text style={styles.label} numberOfLines={1}>
        {label}
      </Text>

      <Text style={styles.value}>{value}</Text>

      <Text style={styles.description} numberOfLines={2}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minWidth: 0,
    backgroundColor: Colors.surface,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.sm,
  },
  indicator: {
    width: 22,
    height: 4,
    borderRadius: 2,
    marginBottom: 10,
  },
  label: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.muted,
  },
  value: {
    fontSize: 25,
    fontWeight: "800",
    color: Colors.text,
    marginTop: 5,
  },
  description: {
    fontSize: 9,
    lineHeight: 13,
    color: Colors.muted,
    marginTop: 4,
  },
});
