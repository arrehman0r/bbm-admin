import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Store, { persistor } from "../store/store";
import { SnackbarProvider } from "notistack";
import AppLoader from "../../components/common/AppLoader";
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

const customTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          50: '#f8ecee',
          100: '#edd2d5',
          200: '#e2b7ba',
          300: '#d79ca0',
          400: '#cc8185',
          500: '#A67E85', // Your custom primary color
          600: '#8f6e74',
          700: '#785d63',
          800: '#614c52',
          900: '#4a3b41',
        },
        // Add other color definitions as needed (e.g., secondary, danger)
      },
    },
  },
});

export function StoreProviders({ children }) {
  const snackbarAnchorOrigin = {
    vertical: 'bottom',
    horizontal: 'right',
  };
  
  return (
    <CssVarsProvider theme={customTheme}>
      <Provider store={Store}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider anchorOrigin={snackbarAnchorOrigin} autoHideDuration={3000}>
            <AppLoader />
            {children}
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </CssVarsProvider>
  );
}
