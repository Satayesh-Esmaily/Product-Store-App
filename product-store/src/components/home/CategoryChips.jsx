function CategoryChips({ isDark, category, uniqueCategories, onSelectCategory }) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectCategory("all")}
        className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
          category === "all"
            ? isDark
              ? "bg-blue-300 text-blue-950"
              : "bg-slate-900 text-blue-100"
            : isDark
            ? "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
            : "border border-slate-200 bg-white/90 text-slate-700 hover:bg-slate-100"
        }`}
      >
        All
      </button>

      {uniqueCategories?.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => onSelectCategory(cat.slug)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            category === cat.slug
              ? isDark
                ? "bg-blue-300 text-blue-950"
                : "bg-slate-900 text-blue-100"
              : isDark
              ? "border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"
              : "border border-slate-200 bg-white/90 text-slate-700 hover:bg-slate-100"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryChips;
