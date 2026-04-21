import { useContext } from "react";
import { SettingsContext } from "../../context/settingsContext";

function Pagination({ page, setPage, totalPages, search }) {
  const { state } = useContext(SettingsContext);
  const isDark = state.theme === "dark";
  if (search) return null;

  return (
    <div className="mt-10 flex flex-wrap items-center gap-2">
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
        className={`rounded-xl px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
          isDark
            ? "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
        }`}
      >
        Prev
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .slice(Math.max(0, page - 3), page + 2)
        .map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`min-w-10 rounded-xl px-3 py-2 text-sm font-semibold transition ${
              p === page
                ? isDark
                  ? "bg-blue-300 text-blue-950"
                  : "bg-slate-900 text-blue-100"
                : isDark
                ? "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
                : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
            }`}
          >
            {p}
          </button>
        ))}

      <button
        disabled={page === totalPages}
        onClick={() => setPage((p) => p + 1)}
        className={`rounded-xl px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
          isDark
            ? "border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10"
            : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-100"
        }`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;

