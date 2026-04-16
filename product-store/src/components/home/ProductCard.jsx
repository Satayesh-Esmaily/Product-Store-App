import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <div style={{ border: "1px solid #ddd", padding: "10px", margin: "10px" }}>
      <img
        src={product.image}
        alt={product.title}
        style={{ width: "100px", height: "100px", objectFit: "contain" }}
      />

      <h3>{product.title}</h3>

      <p>${product.price}</p>

      <button onClick={() => dispatch(addToCart(product))}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductCard;