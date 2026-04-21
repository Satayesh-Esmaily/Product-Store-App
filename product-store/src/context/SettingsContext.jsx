import { useReducer } from "react";
import { SettingsContext } from "./settingsContext";

const initialState = {
  theme: "light",
  viewMode: "grid",
  feedMode: "pagination",
};

function settingsReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME":
      return {
        ...state,
        theme: state.theme === "light" ? "dark" : "light",
      };
    case "SET_VIEW_MODE":
      return {
        ...state,
        viewMode: action.payload === "list" ? "list" : "grid",
      };
    case "SET_FEED_MODE":
      return {
        ...state,
        feedMode: action.payload === "infinite" ? "infinite" : "pagination",
      };
    default:
      return state;
  }
}

export function SettingsProvider({ children }) {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  return (
    <SettingsContext.Provider value={{ state, dispatch }}>
      {children}
    </SettingsContext.Provider>
  );
}
