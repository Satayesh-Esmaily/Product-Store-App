import { Link, NavLink, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { SettingsContext } from "../../context/settingsContext";

function HomeIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M3 10.5 12 3l9 7.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5.5 9.5V20a1 1 0 0 0 1 1h4.5v-5.5a1 1 0 0 1 1-1h0a1 1 0 0 1 1 1V21h4.5a1 1 0 0 0 1-1V9.5" strokeLinecap="round" />
    </svg>
  );
}

function CartIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M3 4h2l2.2 10.2a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H7" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="10" cy="20" r="1.6" />
      <circle cx="18" cy="20" r="1.6" />
    </svg>
  );
}

function CardIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M3 10h18" strokeLinecap="round" />
      <path d="M7 15h4" strokeLinecap="round" />
    </svg>
  );
}

function MenuIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className}>
      <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className}>
      <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

function BrandIcon({ className = "h-5 w-5" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M6.5 7.5h11a1.5 1.5 0 0 1 1.5 1.5v8a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 5 17V9a1.5 1.5 0 0 1 1.5-1.5Z" />
      <path d="M8.5 7.5V6a3.5 3.5 0 0 1 7 0v1.5" strokeLinecap="round" />
      <path d="M9.5 12h5" strokeLinecap="round" />
      <path d="M10.5 14.5h3" strokeLinecap="round" />
    </svg>
  );
}

function Navbar() {
  const location = useLocation();
  const { state, dispatch } = useContext(SettingsContext);
  const { items } = useSelector((reduxState) => reduxState.cart);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isDark = state.theme === "dark";
  const isHomePage = location.pathname === "/";

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const navItems = [
    { to: "/", label: "Home", icon: HomeIcon },
    { to: "/cart", label: "Cart", icon: CartIcon },
    { to: "/checkout", label: "Checkout", icon: CardIcon },
  ];

  const navLinkClass = ({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
      isActive
        ? isDark
          ? "bg-blue-300 text-blue-950"
          : "bg-slate-900 text-blue-100"
        : isDark
        ? "text-slate-200 hover:bg-white/10"
        : "text-slate-700 hover:bg-slate-100"
    }`;

  const sidebarContent = (onNavigate) => (
    <>
      <Link
        to="/"
        onClick={onNavigate}
        className={`mb-6 flex items-center gap-3 rounded-2xl border px-3 py-3 transition ${
          isDark
            ? "border-white/10 bg-white/5 hover:bg-white/10"
            : "border-slate-200 bg-white hover:bg-slate-50"
        }`}
      >
        <span
          className={`grid h-10 w-10 place-items-center rounded-xl ${
            isDark ? "bg-blue-300 text-blue-950" : "bg-slate-900 text-blue-100"
          }`}
        >
          <BrandIcon className="h-4 w-4" />
        </span>
        <span className="min-w-0">
          <span className={`block truncate text-sm font-semibold ${isDark ? "text-slate-100" : "text-slate-900"}`}>
            Product Store
          </span>
          <span className={`block truncate text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
            Smart Shopping
          </span>
        </span>
      </Link>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.to} to={item.to} className={navLinkClass} onClick={onNavigate}>
              <Icon className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
              {item.to === "/cart" && totalItems > 0 && (
                <span
                  className={`ml-auto rounded-full px-2 py-0.5 text-xs font-semibold ${
                    isDark ? "bg-white/20 text-slate-100" : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {totalItems}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className="mt-auto space-y-3 pt-6">
        {isHomePage && (
          <div className={`rounded-2xl border p-3 ${isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"}`}>
            <div className={`mb-2 text-[11px] font-semibold uppercase tracking-wide ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Home View
            </div>
            <div className={`inline-flex w-full items-center gap-1 rounded-xl p-1 ${isDark ? "bg-slate-900/70" : "bg-slate-100"}`}>
              <button
                onClick={() => dispatch({ type: "SET_VIEW_MODE", payload: "grid" })}
                className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  state.viewMode === "grid"
                    ? isDark
                      ? "bg-blue-300 text-blue-950"
                      : "bg-slate-900 text-blue-100"
                    : isDark
                    ? "text-slate-300 hover:bg-white/10"
                    : "text-slate-700 hover:bg-white"
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => dispatch({ type: "SET_VIEW_MODE", payload: "list" })}
                className={`flex-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  state.viewMode === "list"
                    ? isDark
                      ? "bg-blue-300 text-blue-950"
                      : "bg-slate-900 text-blue-100"
                    : isDark
                    ? "text-slate-300 hover:bg-white/10"
                    : "text-slate-700 hover:bg-white"
                }`}
              >
                List
              </button>
            </div>
            <button
              onClick={() =>
                dispatch({
                  type: "SET_FEED_MODE",
                  payload: state.feedMode === "pagination" ? "infinite" : "pagination",
                })
              }
              className={`mt-2 w-full rounded-lg px-3 py-2 text-xs font-semibold transition ${
                isDark
                  ? "border border-white/10 text-slate-200 hover:bg-white/10"
                  : "border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
            >
              {state.feedMode === "pagination" ? "Infinite Scroll" : "Pagination"}
            </button>
          </div>
        )}

        <button
          onClick={() => dispatch({ type: "TOGGLE_THEME" })}
          className={`w-full rounded-xl px-3 py-2.5 text-xs font-semibold uppercase tracking-wide transition ${
            isDark ? "bg-blue-300 text-blue-950 hover:bg-blue-200" : "bg-slate-900 text-blue-100 hover:bg-slate-800"
          }`}
        >
          {state.theme === "light" ? "Dark mode" : "Light mode"}
        </button>
      </div>
    </>
  );

  return (
    <>
      <div
        className={`sticky top-0 z-50 flex items-center justify-between border-b px-4 py-3 md:hidden ${
          isDark ? "border-white/10 bg-slate-950/90" : "border-slate-200 bg-white/90"
        } backdrop-blur-xl`}
      >
        <Link to="/" className={`text-lg font-semibold tracking-tight ${isDark ? "text-blue-300" : "text-slate-900"}`}>
          Product Store
        </Link>
        <button
          onClick={() => setIsDrawerOpen(true)}
          className={`rounded-lg p-2 transition ${
            isDark ? "border border-white/10 text-slate-200 hover:bg-white/10" : "border border-slate-200 text-slate-700 hover:bg-slate-100"
          }`}
          aria-label="Open sidebar"
        >
          <MenuIcon />
        </button>
      </div>

      <aside
        className={`fixed inset-y-0 left-0 z-40 hidden w-64 border-r p-4 md:flex md:flex-col ${
          isDark ? "border-white/10 bg-slate-950/88" : "border-slate-200 bg-white/88"
        } backdrop-blur-xl`}
      >
        {sidebarContent()}
      </aside>

      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            className="absolute inset-0 bg-slate-950/50"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close sidebar overlay"
          />
          <aside className={`relative h-full w-80 max-w-[85vw] border-r p-4 ${isDark ? "border-white/10 bg-slate-950" : "border-slate-200 bg-white"}`}>
            <button
              onClick={() => setIsDrawerOpen(false)}
              className={`mb-4 rounded-lg p-2 transition ${
                isDark ? "border border-white/10 text-slate-200 hover:bg-white/10" : "border border-slate-200 text-slate-700 hover:bg-slate-100"
              }`}
              aria-label="Close sidebar"
            >
              <CloseIcon />
            </button>
            {sidebarContent(() => setIsDrawerOpen(false))}
          </aside>
        </div>
      )}
    </>
  );
}

export default Navbar;
