"use client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Store, { persistor } from "../store/store";
import { SnackbarProvider } from "notistack";


export function StoreProviders({ children }) {
  const snackbarAnchorOrigin = {
    vertical: 'bottom', // Position from bottom
    horizontal: 'right', // Position from right
  };
  
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
       
          <SnackbarProvider anchorOrigin={snackbarAnchorOrigin}   autoHideDuration={3000}>
            {/* <AppLoader /> */}
            
            {children}
          </SnackbarProvider>
       
      </PersistGate>
    </Provider>
  );
}