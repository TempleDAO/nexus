import {
  PropsWithChildren,
  useContext,
  createContext,
} from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "styles/theme";
import { NotificationProvider } from "providers/NotificationProvider";
import { WalletProvider } from "providers/WalletProvider";

import { Web3OnboardInitProvider } from "components/Web3OnboardInitProvider";
import { WrongNetworkPopover } from "components/Layouts/CoreLayout/WrongNetworkPopover";
import { RelicProvider } from "./RelicProvider";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface AppProviderState {}

export const INITIAL_STATE: AppProviderState = {};

export const AppContext = createContext<AppProviderState>(INITIAL_STATE);

// eslint-disable-next-line @typescript-eslint/ban-types
export const AppProvider = (props: PropsWithChildren<{}>) => {
  const queryClient = new QueryClient();

  return (
    <NotificationProvider>
      <Web3OnboardInitProvider>
        <WalletProvider>
          <QueryClientProvider client={queryClient}>
            <RelicProvider>
              <ThemeProvider theme={theme}>
                <AppContext.Provider value={{}}>
                  <WrongNetworkPopover />
                  {props.children}
                </AppContext.Provider>
              </ThemeProvider>
            </RelicProvider>
          </QueryClientProvider>
        </WalletProvider>
      </Web3OnboardInitProvider>
    </NotificationProvider>
  );
};

export const useAppContext = () => useContext(AppContext);
