function Filters({
  isDark,
  sortBy,
  setSortBy,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  onClear,
}) {
  return (
    <section
      className={`rounded-2xl border p-4 sm:p-5 ${
        isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/90"
      }`}
    >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <select
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className={`rounded-xl border px-3 py-2 text-sm outline-none ${
            isDark
              ? "border-white/10 bg-slate-900 text-slate-100"
              : "border-slate-200 bg-white text-slate-900"
          }`}
        >
          <option value="default">Sort: Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating-desc">Rating: High to Low</option>
          <option value="title-asc">Title: A-Z</option>
        </select>

        <input
          type="number"
          min="0"
          value={minPrice}
          onChange={(event) => setMinPrice(event.target.value)}
          placeholder="Min price"
          className={`rounded-xl border px-3 py-2 text-sm outline-none ${
            isDark
              ? "border-white/10 bg-slate-900 text-slate-100 placeholder:text-slate-500"
              : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
          }`}
        />

        <input
          type="number"
          min="0"
          value={maxPrice}
          onChange={(event) => setMaxPrice(event.target.value)}
          placeholder="Max price"
          className={`rounded-xl border px-3 py-2 text-sm outline-none ${
            isDark
              ? "border-white/10 bg-slate-900 text-slate-100 placeholder:text-slate-500"
              : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
          }`}
        />

        <select
          value={minRating}
          onChange={(event) => setMinRating(event.target.value)}
          className={`rounded-xl border px-3 py-2 text-sm outline-none ${
            isDark
              ? "border-white/10 bg-slate-900 text-slate-100"
              : "border-slate-200 bg-white text-slate-900"
          }`}
        >
          <option value="">Min rating</option>
          <option value="4.5">4.5+</option>
          <option value="4">4+</option>
          <option value="3.5">3.5+</option>
          <option value="3">3+</option>
        </select>

        <button
          onClick={onClear}
          className={`rounded-xl px-3 py-2 text-sm font-semibold transition ${
            isDark
              ? "border border-white/10 text-slate-200 hover:bg-white/10"
              : "border border-slate-200 text-slate-700 hover:bg-slate-100"
          }`}
        >
          Clear filters
        </button>
      </div>
    </section>
  );
}

export default Filters;

