function CartNotes({ isDark, value, onChange }) {
  return (
    <section
      className={`rounded-2xl border p-5 ${
        isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
      }`}
    >
      <h2 className="text-lg font-semibold">Cart Notes</h2>
      <p className={`mt-1 text-sm ${isDark ? "text-slate-300" : "text-slate-500"}`}>
        Add a note for your order. It will be saved locally.
      </p>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        placeholder="Example: Please pack fragile items separately."
        className={`mt-3 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
          isDark
            ? "border-white/10 bg-slate-900 text-slate-100 placeholder:text-slate-500"
            : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
        }`}
      />
    </section>
  );
}

export default CartNotes;
