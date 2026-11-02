import * as Network from "expo-network";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppState } from "react-native";

export interface NetworkStatusState {
  isConnected: boolean | null;
  isInternetReachable: boolean | null;
  connectionType: Network.NetworkStateType | null;
  isLoading: boolean;
}

const initialState: NetworkStatusState = {
  isConnected: null,
  isInternetReachable: null,
  connectionType: null,
  isLoading: true,
};

export function useNetworkStatus() {
  const [network, setNetwork] = useState<NetworkStatusState>(initialState);

  const mounted = useRef(true);
  const requestId = useRef(0);

  const refreshNetwork = useCallback(async () => {
    const currentRequest = ++requestId.current;

    try {
      const state = await Network.getNetworkStateAsync();

      if (!mounted.current || currentRequest !== requestId.current) {
        return;
      }

      setNetwork({
        isConnected: state.isConnected ?? null,
        isInternetReachable: state.isInternetReachable ?? null,
        connectionType: state.type ?? null,
        isLoading: false,
      });
    } catch (error) {
      if (mounted.current && currentRequest === requestId.current) {
        console.warn("Unable to retrieve network state:", error);
        setNetwork((previous) => ({
          ...previous,
          isLoading: false,
        }));
      }
    }
  }, []);

  useEffect(() => {
    mounted.current = true;

    // Initial network check
    void refreshNetwork();

    // Listen for network changes
    const networkSubscription = Network.addNetworkStateListener(() => {
      void refreshNetwork();
    });

    // Recheck connectivity when returning to foreground
    const appStateSubscription = AppState.addEventListener(
      "change",
      (state) => {
        if (state === "active") {
          void refreshNetwork();
        }
      },
    );

    return () => {
      mounted.current = false;
      requestId.current += 1;

      networkSubscription.remove();
      appStateSubscription.remove();
    };
  }, [refreshNetwork]);

  return {
    ...network,
    refreshNetwork,
  };
}
