import React from "react";
import AppRoutes from "./routes";
import { StoreProviders } from "./redux/provider/Provider";

const App = () => {
  return (
    <StoreProviders>
      <AppRoutes />
    </StoreProviders>
  );
}
export default App