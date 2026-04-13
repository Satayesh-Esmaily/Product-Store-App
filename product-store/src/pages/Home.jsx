import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/productApi";

function Home() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading products</p>;

  return (
    <div>
      {data.map((product) => (
        <p key={product.id}>{product.title}</p>
      ))}
    </div>
  );
}

export default Home;