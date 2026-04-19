import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchProductById } from "../services/productApi"

function ProductDetails() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading product</p>;

  return (
    <div>
      <img
        src={data.image}
        alt={data.title}
        style={{ width: "200px" }}
      />

      <h2>{data.title}</h2>
      <p>{data.description}</p>
      <h3>${data.price}</h3>
    </div>
  );
}

export default ProductDetails;