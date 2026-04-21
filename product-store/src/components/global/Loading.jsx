import { useContext } from "react";
import { SettingsContext } from "../../context/settingsContext";

function Loading({ message = "Loading products...", variant = "default" }) {
  const { state } = useContext(SettingsContext);
  const isDark = state.theme === "dark";

  if (variant === "productsGrid") {
    return (
      <div className="space-y-6 animate-pulse">
        <div
          className={`h-10 w-60 rounded-xl ${
            isDark ? "bg-white/10" : "bg-slate-200"
          }`}
        />
        <div
          className={`h-12 w-full max-w-xl rounded-2xl ${
            isDark ? "bg-white/10" : "bg-slate-200"
          }`}
        />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className={`rounded-3xl border p-4 ${
                isDark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"
              }`}
            >
              <div
                className={`h-44 w-full rounded-2xl ${
                  isDark ? "bg-white/10" : "bg-slate-200"
                }`}
              />
              <div className="mt-4 space-y-2">
                <div
                  className={`h-3 w-24 rounded ${
                    isDark ? "bg-white/10" : "bg-slate-200"
                  }`}
                />
                <div
                  className={`h-4 w-full rounded ${
                    isDark ? "bg-white/10" : "bg-slate-200"
                  }`}
                />
                <div
                  className={`h-4 w-3/4 rounded ${
                    isDark ? "bg-white/10" : "bg-slate-200"
                  }`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (variant === "productDetails") {
    return (
      <section
        className={`grid gap-8 rounded-3xl border p-6 sm:grid-cols-2 sm:p-8 animate-pulse ${
          isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/95"
        }`}
      >
        <div
          className={`h-80 rounded-2xl ${isDark ? "bg-white/10" : "bg-slate-200"}`}
        />
        <div className="space-y-4">
          <div
            className={`h-3 w-28 rounded ${isDark ? "bg-white/10" : "bg-slate-200"}`}
          />
          <div
            className={`h-8 w-4/5 rounded ${isDark ? "bg-white/10" : "bg-slate-200"}`}
          />
          <div
            className={`h-24 w-full rounded ${isDark ? "bg-white/10" : "bg-slate-200"}`}
          />
          <div
            className={`h-8 w-32 rounded ${isDark ? "bg-white/10" : "bg-slate-200"}`}
          />
        </div>
      </section>
    );
  }

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

