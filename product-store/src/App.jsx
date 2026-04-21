import { useContext } from "react";
import Navbar from "./components/global/Navbar";
import AppRouter from "./router/AppRouter";
import { SettingsContext } from "./context/settingsContext";

function App() {
  const { state } = useContext(SettingsContext);
  const isDark = state.theme === "dark";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${state.theme} ${
        isDark
          ? "bg-slate-950 text-slate-100"
          : "bg-gradient-to-b from-[#f7f9fc] via-[#f3f6fb] to-[#eef3f9] text-slate-900"
      }`}
    >
      <Navbar />
      <main className="w-full px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <AppRouter />
      </main>
    </div>
  );
}

export default App;
