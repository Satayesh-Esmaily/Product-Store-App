import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { SettingsProvider } from "./context/SettingsContext.jsx";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
  <QueryClientProvider client={queryClient}>
  <SettingsProvider>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  </SettingsProvider>
  </QueryClientProvider>
  </Provider>
);

