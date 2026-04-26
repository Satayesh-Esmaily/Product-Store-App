function CartItemRow({ item, isDark, onDecrease, onIncrease, onRemove }) {
  const itemSubtotal = item.price * item.quantity;

  return (
    <article
      className={`rounded-2xl border p-4 ${
        isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border ${
              isDark ? "border-white/10 bg-slate-900/60" : "border-slate-200 bg-slate-50"
            }`}
          >
            <img
              src={item.images?.[0]}
              alt={item.title}
              className="h-16 w-16 object-contain"
            />
          </div>

          <div className="min-w-0">
            <h2 className="truncate text-base font-semibold sm:text-lg">{item.title}</h2>
            <p className={`mt-1 text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              Unit price: ${item.price}
            </p>
            {item.category && (
              <p className={`mt-1 text-xs uppercase tracking-wide ${isDark ? "text-slate-500" : "text-slate-400"}`}>
                {item.category}
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div
            className={`inline-flex items-center rounded-xl border p-1 ${
              isDark ? "border-white/10 bg-slate-900/60" : "border-slate-200 bg-slate-50"
            }`}
          >
            <button
              onClick={onDecrease}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                isDark ? "text-slate-200 hover:bg-white/10" : "text-slate-700 hover:bg-white"
              }`}
              aria-label={`Decrease quantity for ${item.title}`}
            >
              -
            </button>
            <span className="w-10 text-center text-sm font-semibold">{item.quantity}</span>
            <button
              onClick={onIncrease}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                isDark ? "text-slate-200 hover:bg-white/10" : "text-slate-700 hover:bg-white"
              }`}
              aria-label={`Increase quantity for ${item.title}`}
            >
              +
            </button>
          </div>

          <div className={`rounded-xl px-3 py-2 text-sm ${isDark ? "bg-white/10 text-slate-200" : "bg-slate-100 text-slate-700"}`}>
            Subtotal: <span className="font-semibold">${itemSubtotal.toFixed(2)}</span>
          </div>

          <button
            onClick={onRemove}
            className="rounded-lg bg-rose-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
          >
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}

export default CartItemRow;
