import { StyleSheet, Text, View } from "react-native";
import { useNetworkStatus } from "../hooks/useNetworkStatus";

export default function NetworkStatus() {
  const { isConnected, isInternetReachable, connectionType, isLoading } =
    useNetworkStatus();

  let title = "Checking connection...";
  let description = "Retrieving network information";
  let color = "#64748B";

  if (!isLoading) {
    if (isConnected === false) {
      title = "Offline";
      description = "Your tasks remain available on this device";
      color = "#DC2626";
    } else if (isConnected === true) {
      if (isInternetReachable === false) {
        title = "Network connected";
        description = "Internet access may be unavailable";
        color = "#D97706";
      } else if (isInternetReachable === null) {
        title = "Connection available";
        description = "Internet availability is unknown";
        color = "#D97706";
      } else {
        title = "Online";
        description = "Network connection available";
        color = "#16A34A";
      }
    } else {
      title = "Connection unknown";
      description = "Your local tasks remain available";
      color = "#64748B";
    }
  }

  const connectionLabel = connectionType
    ? connectionType.toLowerCase()
    : "unknown";

  return (
    <View style={styles.container}>
      <View style={[styles.indicator, { backgroundColor: color }]} />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <Text style={styles.connectionType}>
        {isLoading ? "..." : connectionLabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 12,
    marginVertical: 8,
    gap: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1E293B",
  },
  description: {
    fontSize: 12,
    color: "#64748B",
    marginTop: 3,
  },
  connectionType: {
    fontSize: 10,
    color: "#64748B",
    textTransform: "capitalize",
  },
});
