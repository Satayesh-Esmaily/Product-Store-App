function Toast({ message, isDark = false }) {
  if (!message) return null;

  return (
    <div
      className={`fixed right-4 top-4 z-[9999] rounded-2xl border px-4 py-3 text-sm font-medium shadow-xl backdrop-blur-md transition sm:right-6 sm:top-6 ${
        isDark
          ? "border-emerald-300/30 bg-emerald-300/15 text-emerald-100"
          : "border-emerald-200 bg-emerald-50 text-emerald-800"
      }`}
    >
      <div className="flex items-center gap-2">
        <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span>{message}</span>
      </div>
    </div>
  );
}

export default Toast;

