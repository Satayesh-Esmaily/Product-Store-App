function HomeHero({ isDark }) {
  return (
    <section
      className={`relative overflow-hidden rounded-3xl border p-6 sm:p-10 ${
        isDark
          ? "border-white/10 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950"
          : "border-slate-200 bg-gradient-to-br from-white via-[#f7faff] to-[#eef5ff]"
      }`}
    >
      <div
        className={`absolute -right-16 -top-20 h-52 w-52 rounded-full blur-3xl ${
          isDark ? "bg-blue-300/20" : "bg-blue-500/20"
        }`}
      />
      <div className="relative">
        <p
          className={`text-xs uppercase tracking-[0.25em] ${
            isDark ? "text-blue-300/80" : "text-blue-600/80"
          }`}
        >
          Product Store
        </p>
        <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight sm:text-5xl">
          Discover Products You'll Love
        </h1>
        <p
          className={`mt-4 max-w-2xl text-sm sm:text-base ${
            isDark ? "text-slate-300/85" : "text-slate-600"
          }`}
        >
          Browse categories, compare prices, and add your favorites with a smooth shopping
          experience.
        </p>
      </div>
    </section>
  );
}

export default HomeHero;
