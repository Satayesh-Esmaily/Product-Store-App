function CartItemRow({ item, isDark, onDecrease, onIncrease, onRemove }) {
  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
        isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center gap-4">
        <img
          src={item.images?.[0]}
          alt={item.title}
          className="h-16 w-16 rounded object-contain"
        />
        <h2 className="font-semibold">{item.title}</h2>
        <p className="mt-1 text-sm text-slate-500">${item.price}</p>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onDecrease}
          className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
            isDark
              ? "border border-white/10 text-slate-200 hover:bg-white/10"
              : "border border-slate-300 hover:bg-slate-100"
          }`}
        >
          -
        </button>
        <span className="w-8 text-center font-semibold">{item.quantity}</span>
        <button
          onClick={onIncrease}
          className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
            isDark
              ? "border border-white/10 text-slate-200 hover:bg-white/10"
              : "border border-slate-300 hover:bg-slate-100"
          }`}
        >
          +
        </button>
        <button
          onClick={onRemove}
          className="ml-2 rounded-lg bg-rose-500 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-rose-600"
        >
          Remove
        </button>
      </div>
    </article>
  );
}

export default CartItemRow;
