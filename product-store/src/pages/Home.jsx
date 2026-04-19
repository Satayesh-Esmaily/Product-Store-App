import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
} from "../services/productApi";
import { searchProducts } from "../services/productApi";
import SearchBar from "../components/global/SearchBar";
import ProductCard from "../components/home/ProductCard";
import Pagination from "../components/global/Pagination";
import { SettingsContext } from "../context/SettingsContext";

function Home() {
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const { state } = useContext(SettingsContext);
  const isDark = state.theme === "dark";

  const limit = 12;

  const [search, setSearch] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", category, page, search],
    queryFn: () => {
      const skip = (page - 1) * limit;

      if (search) {
        return searchProducts(search);
      }

      if (category === "all") {
        return fetchProducts(limit, skip);
      }

      return fetchProductsByCategory(category, limit, skip);
    },
  });

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const uniqueCategories = categories?.filter(
    (cat, index, self) =>
      index === self.findIndex((c) => c.slug === cat.slug)
  );

  const totalPages = data ? Math.ceil(data.total / limit) : 1;
  const products = data?.products || [];

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white/90 p-10 text-center text-slate-600 shadow-sm">
        Loading products...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-rose-300/70 bg-rose-50 p-10 text-center text-rose-600">
        Error loading products
      </div>
    );
  }

  return (
    <div className="space-y-8">
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
            Curated Collection
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight sm:text-5xl">
            Clean Design, Smooth Shopping
          </h1>
          <p
            className={`mt-4 max-w-2xl text-sm sm:text-base ${
              isDark ? "text-slate-300/85" : "text-slate-600"
            }`}
          >
            Apple-inspired minimal UI with calm colors, soft surfaces, and
            better readability.
          </p>
        </div>
      </section>

      <SearchBar onSearch={setSearch} />

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => {
            setCategory("all");
            setPage(1);
          }}
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
            onClick={() => {
              setCategory(cat.slug);
              setPage(1);
            }}
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

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <div
          className={`rounded-3xl border p-8 text-center ${
            isDark
              ? "border-white/10 bg-white/5 text-slate-300"
              : "border-slate-200 bg-white text-slate-600"
          }`}
        >
          No products found for this search.
        </div>
      )}

      <Pagination
        page={page}
        setPage={setPage}
        totalPages={totalPages}
        search={search}
      />
    </div>
  );
}

export default Home;
