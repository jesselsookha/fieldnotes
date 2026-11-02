import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

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
          height: 62,
          paddingTop: 8,
          paddingBottom: 8,
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
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name="grid-outline"
              color={focused ? Colors.primary : Colors.muted}
              size={size}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarIcon: ({ focused, size }) => (
            <Ionicons
              name="checkbox-outline"
              color={focused ? Colors.primary : Colors.muted}
              size={size}
            />
          ),
        }}
      />
    </Tabs>
  );
}
