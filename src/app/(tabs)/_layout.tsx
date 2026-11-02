import { Tabs } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

import { Colors } from "../../constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.muted,

        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
        },

        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Overview",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="grid-outline"
              color={color ? Colors.primary : Colors.muted}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="checkbox-outline"
              color={color ? Colors.primary : Colors.muted}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
