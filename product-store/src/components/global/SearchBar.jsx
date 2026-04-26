import { useEffect, useRef } from "react";
import { useContext } from "react";
import { SettingsContext } from "../../context/settingsContext";

function SearchBar({ onSearch, value, onChange }) {
  const { state } = useContext(SettingsContext);
  const isDark = state.theme === "dark";
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return undefined;
    }

    const timeout = setTimeout(() => {
      onSearch(value);
    }, 500);

    return () => clearTimeout(timeout);
  }, [value, onSearch]);

  return (
    <div className="mb-8">
      <label
        className={`mb-2 block text-sm font-medium tracking-wide ${
          isDark ? "text-slate-400" : "text-slate-500"
        }`}
      >
        Search Product
      </label>
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full max-w-xl rounded-2xl border px-5 py-3 text-sm outline-none transition sm:text-base ${
          isDark
            ? "border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-500 focus:border-blue-300/80 focus:ring-2 focus:ring-blue-200/30"
            : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15"
        }`}
      />
    </div>
  );
}

export default SearchBar;

