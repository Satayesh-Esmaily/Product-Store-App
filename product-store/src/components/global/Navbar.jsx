import { Link } from "react-router-dom";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { SettingsContext } from "../../context/SettingsContext";

function Navbar() {
  const { state, dispatch } = useContext(SettingsContext);
  const { items } = useSelector((state) => state.cart);
  const isDark = state.theme === "dark";

  const totalItems = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav
      className={`sticky top-0 z-50 border-b backdrop-blur-xl transition-colors duration-300 ${
        isDark
          ? "border-white/10 bg-slate-950/80"
          : "border-slate-200/70 bg-white/80"
      }`}
    >
      <div className="flex w-full items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className={`text-xl font-semibold tracking-tight ${
            isDark ? "text-blue-300" : "text-slate-900"
          }`}
        >
          Product Store
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <Link
            to="/"
            className={`rounded-full px-3 py-2 text-sm font-medium transition ${
              isDark
                ? "text-slate-200 hover:bg-white/10"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            Home
          </Link>

          <Link
            to="/cart"
            className={`rounded-full px-3 py-2 text-sm font-medium transition ${
              isDark
                ? "text-slate-200 hover:bg-white/10"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            Cart ({totalItems})
          </Link>

          <button
            onClick={() => dispatch({ type: "TOGGLE_THEME" })}
            className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide transition sm:text-sm ${
              isDark
                ? "bg-blue-300 text-blue-950 hover:bg-blue-200"
                : "bg-slate-900 text-blue-100 hover:bg-slate-800"
            }`}
          >
            {state.theme === "light" ? "Dark mode" : "Light mode"}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
