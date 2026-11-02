import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

import { Colors } from "../constants/theme";

import { TaskProvider } from "../context/TaskContext";

export default function RootLayout() {
  return (
    <TaskProvider>
      <StatusBar style="dark" />

      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: Colors.background,
          },
        }}
      >
        <Stack.Screen name="(tabs)" />

        <Stack.Screen
          name="new-task"
          options={{
            presentation: "modal",
            animation: "slide_from_bottom",
          }}
        />
      </Stack>
    </TaskProvider>
  );
}
