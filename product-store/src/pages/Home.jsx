import { useState, useContext, useMemo, useEffect, useRef } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
  searchProducts,
} from "../services/productApi";
import SearchBar from "../components/global/SearchBar";
import ProductCard from "../components/home/ProductCard";
import Pagination from "../components/global/Pagination";
import Loading from "../components/global/Loading";
import { SettingsContext } from "../context/settingsContext";

function Home() {
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const { state } = useContext(SettingsContext);
  const isDark = state.theme === "dark";

  const limit = 12;
  const isInfiniteMode = state.feedMode === "infinite";

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const loadMoreRef = useRef(null);

  const { data: paginatedData, isLoading: isPaginationLoading, isError: isPaginationError } =
    useQuery({
      queryKey: ["products", category, page, search],
      enabled: !isInfiniteMode,
      queryFn: () => {
        const skip = (page - 1) * limit;

        if (search) return searchProducts(search);
        if (category === "all") return fetchProducts(limit, skip);
        return fetchProductsByCategory(category, limit, skip);
      },
    });

  const {
    data: infiniteData,
    isLoading: isInfiniteLoading,
    isError: isInfiniteError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products-infinite", category, search],
    enabled: isInfiniteMode,
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const skip = pageParam * limit;

      if (search) {
        return searchProducts(search);
      }

      if (category === "all") {
        return fetchProducts(limit, skip);
      }

      return fetchProductsByCategory(category, limit, skip);
    },
    getNextPageParam: (lastPage, allPages) => {
      if (search) return undefined;

      const loadedCount = allPages.reduce(
        (total, currentPage) => total + (currentPage.products?.length || 0),
        0
      );

      if (loadedCount >= (lastPage.total || 0)) return undefined;
      return allPages.length;
    },
  });

  useEffect(() => {
    if (!isInfiniteMode || !loadMoreRef.current || !hasNextPage || isFetchingNextPage) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      { rootMargin: "120px" }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [isInfiniteMode, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const uniqueCategories = categories?.filter(
    (cat, index, self) => index === self.findIndex((c) => c.slug === cat.slug)
  );

  const products = useMemo(() => {
    if (!isInfiniteMode) {
      return paginatedData?.products || [];
    }

    return (infiniteData?.pages || []).flatMap((singlePage) => singlePage.products || []);
  }, [isInfiniteMode, paginatedData?.products, infiniteData?.pages]);

  const totalPages = paginatedData ? Math.ceil(paginatedData.total / limit) : 1;

  if ((!isInfiniteMode && isPaginationLoading) || (isInfiniteMode && isInfiniteLoading)) {
    return <Loading />;
  }

  if ((!isInfiniteMode && isPaginationError) || (isInfiniteMode && isInfiniteError)) {
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
            Product Store
          </p>
          <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight sm:text-5xl">
            Discover Products You’ll Love
          </h1>
          <p
            className={`mt-4 max-w-2xl text-sm sm:text-base ${
              isDark ? "text-slate-300/85" : "text-slate-600"
            }`}
          >
            Browse a wide collection of categories, compare prices, and add your favorite products to cart with a smooth shopping experience.
          </p>
        </div>
      </section>

      <SearchBar
        onSearch={(value) => {
          setSearch(value);
          setPage(1);
        }}
        value={searchInput}
        onChange={setSearchInput}
      />

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

      <div
        className={
          state.viewMode === "list"
            ? "grid grid-cols-1 gap-4"
            : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        }
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} view={state.viewMode} />
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

      {!isInfiniteMode ? (
        <Pagination page={page} setPage={setPage} totalPages={totalPages} search={search} />
      ) : (
        <div className="space-y-3">
          {isFetchingNextPage && (
            <div className={`text-center text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              Loading more products...
            </div>
          )}
          {!search && hasNextPage && <div ref={loadMoreRef} className="h-4" />}
          {!search && !hasNextPage && products.length > 0 && (
            <div className={`text-center text-sm ${isDark ? "text-slate-400" : "text-slate-500"}`}>
              You reached the end.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;

