import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
} from "../services/productApi";
import { searchProducts } from "../services/productApi";
import SearchBar from "../components/global/SearchBar";
import ProductCard from "../components/home/ProductCard";

function Home() {
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  

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
  // Categories
  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });


  const uniqueCategories = categories?.filter(
    (cat, index, self) =>
      index === self.findIndex((c) => c.slug === cat.slug)
  );


  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  return (
    <div>
   
      <SearchBar onSearch={setSearch} />
      {/*  Categories */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
        <button
          onClick={() => {
            setCategory("all");
            setPage(1);
          }}
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
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/*  Products */}
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {data?.products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}>
          Prev
        </button>

        <span>Page {page}</span>

        <button onClick={() => setPage((p) => p + 1)}>
          Next
        </button>
      </div>

    </div>
  );
}

export default Home;