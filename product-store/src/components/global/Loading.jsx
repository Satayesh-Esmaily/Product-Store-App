import { useContext } from "react";
import { SettingsContext } from "../../context/settingsContext";

function Loading({ message = "Loading products..." }) {
  const { state } = useContext(SettingsContext);
  const isDark = state.theme === "dark";

  return (
    <div
      className={`rounded-3xl border p-10 text-center shadow-sm ${
        isDark
          ? "border-white/10 bg-white/5 text-slate-300"
          : "border-slate-200 bg-white/90 text-slate-600"
      }`}
    >
      {message}
    </div>
  );
}

export default Loading;

