import { StyleSheet, Text, View } from "react-native";

import { Colors, Spacing } from "../constants/theme";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
  },
  title: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "800",
  },
  subtitle: {
    color: Colors.muted,
    fontSize: 12,
    marginTop: 4,
  },
});
