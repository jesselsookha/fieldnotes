import { StyleSheet, Text, View } from "react-native";

import { Colors, Spacing } from "../constants/theme";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  action?: string;
}

export function SectionHeading({
  title,
  subtitle,
  action,
}: SectionHeadingProps) {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>

        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      {action ? <Text style={styles.action}>{action}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 19,
    fontWeight: "700",
    color: Colors.text,
  },
  subtitle: {
    fontSize: 13,
    color: Colors.muted,
    marginTop: 4,
  },
  action: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: "600",
  },
});
