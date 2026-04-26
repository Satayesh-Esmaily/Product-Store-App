import { useState, useContext, useMemo, useEffect, useRef, useCallback } from "react";
import { useQuery, useInfiniteQuery, keepPreviousData } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
  searchProducts,
} from "../services/productApi";
import SearchBar from "../components/global/SearchBar";
import Filters from "../components/home/Filters";
import Pagination from "../components/global/Pagination";
import Loading from "../components/global/Loading";
import HomeHero from "../components/home/HomeHero";
import CategoryChips from "../components/home/CategoryChips";
import ProductsGrid from "../components/home/ProductsGrid";
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
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [hasAdvancedFilters, setHasAdvancedFilters] = useState(false);
  const loadMoreRef = useRef(null);
  const handleSearch = useCallback((value) => {
    setSearch(value);
    setPage(1);
  }, []);

  const { data: paginatedData, isLoading: isPaginationLoading, isError: isPaginationError } =
    useQuery({
      queryKey: ["products", category, page, search],
      enabled: !isInfiniteMode,
      placeholderData: keepPreviousData,
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

      if (search) return searchProducts(search);
      if (category === "all") return fetchProducts(limit, skip);
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

  const handleFilteredChange = useCallback(({ products: nextProducts, hasAdvancedFilters: hasFilters }) => {
    setFilteredProducts(nextProducts);
    setHasAdvancedFilters(hasFilters);
  }, []);

  const displayProducts =
    hasAdvancedFilters || filteredProducts.length > 0 ? filteredProducts : products;

  const totalPages = paginatedData ? Math.ceil(paginatedData.total / limit) : 1;

  if ((!isInfiniteMode && isPaginationLoading) || (isInfiniteMode && isInfiniteLoading)) {
    return <Loading variant="productsGrid" />;
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
      <HomeHero isDark={isDark} />

      <SearchBar
        onSearch={handleSearch}
        value={searchInput}
        onChange={setSearchInput}
      />

      <Filters isDark={isDark} products={products} onFilteredChange={handleFilteredChange} />

      <CategoryChips
        isDark={isDark}
        category={category}
        uniqueCategories={uniqueCategories}
        onSelectCategory={(slug) => {
          setCategory(slug);
          setPage(1);
        }}
      />

      <ProductsGrid viewMode={state.viewMode} products={displayProducts} />

      {displayProducts.length === 0 && (
        <div
          className={`rounded-3xl border p-8 text-center ${
            isDark
              ? "border-white/10 bg-white/5 text-slate-300"
              : "border-slate-200 bg-white text-slate-600"
          }`}
        >
          {hasAdvancedFilters
            ? "No products match your filters."
            : "No products found for this search."}
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
          {!search && !hasNextPage && displayProducts.length > 0 && (
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
