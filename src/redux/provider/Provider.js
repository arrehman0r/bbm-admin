"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Store, { persistor } from "../store/store";
import { SnackbarProvider } from "notistack";


export function StoreProviders({ children }) {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
       
          <SnackbarProvider>
            {/* <AppLoader /> */}
            
            {children}
          </SnackbarProvider>
       
      </PersistGate>
    </Provider>
  );
}