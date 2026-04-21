import { Link } from "react-router-dom";

function RecommendedProducts({ isDark, products }) {
  if (products.length === 0) return null;

  return (
    <section
      className={`rounded-2xl border p-5 ${
        isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
      }`}
    >
      <h2 className="text-lg font-semibold">Recommended Products</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className={`rounded-xl border p-3 ${
              isDark ? "border-white/10 bg-slate-900/40" : "border-slate-200 bg-slate-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <img
                src={product.images?.[0] || product.thumbnail}
                alt={product.title}
                className="h-14 w-14 rounded-lg bg-white object-contain p-1"
              />
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-sm font-semibold">{product.title}</h3>
                <p className="text-sm text-slate-500">${product.price}</p>
              </div>
              <Link
                to={`/product/${product.id}`}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  isDark
                    ? "border border-white/10 text-slate-200 hover:bg-white/10"
                    : "border border-slate-200 text-slate-700 hover:bg-slate-100"
                }`}
              >
                View
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default RecommendedProducts;
