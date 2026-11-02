import { useEffect, useRef, useState } from "react";
import { AppState, type AppStateStatus } from "react-native";

function getInitialAppState(): AppStateStatus | null {
  const state = AppState.currentState;

  if (state === "active" || state === "background" || state === "inactive") {
    return state;
  }

  return null;
}

export function useAppState() {
  const initialState = getInitialAppState();

  const [appState, setAppState] = useState<AppStateStatus | null>(initialState);

  const previousAppState = useRef<AppStateStatus | null>(initialState);

  const [previousState, setPreviousState] = useState<AppStateStatus | null>(
    null,
  );

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      setPreviousState(previousAppState.current);
      previousAppState.current = nextState;
      setAppState(nextState);
    });

    return () => subscription.remove();
  }, []);

  return {
    appState,
    previousState,

    isActive: appState === "active",

    isInBackground: appState === "background",

    isInactive: appState === "inactive",

    hasReturnedToForeground:
      appState === "active" &&
      (previousState === "background" || previousState === "inactive"),
  };
}
