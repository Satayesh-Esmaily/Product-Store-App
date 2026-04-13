import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/productApi";
import ProductCard from "../components/home/ProductCard";


function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {data.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Home;