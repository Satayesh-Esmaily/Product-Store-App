import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { removeFromCart, clearCart, increaseQuantity, decreaseQuantity } from "../store/cartSlice";
import { fetchProducts } from "../services/productApi";
import { SettingsContext } from "../context/settingsContext";
import CartItemRow from "../components/cart/CartItemRow";
import CartNotes from "../components/cart/CartNotes";
import RecommendedProducts from "../components/cart/RecommendedProducts";

const CART_NOTES_KEY = "product-store-cart-notes";

function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { state } = useContext(SettingsContext);
  const isDark = state.theme === "dark";
  const [cartNotes, setCartNotes] = useState(() => localStorage.getItem(CART_NOTES_KEY) || "");

  useEffect(() => {
    localStorage.setItem(CART_NOTES_KEY, cartNotes);
  }, [cartNotes]);

  const { data: recommendedData } = useQuery({
    queryKey: ["cart-recommended"],
    queryFn: () => fetchProducts(24, 0),
  });

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const recommendedProducts = (() => {
    if (!recommendedData?.products) return [];

    const cartIds = new Set(items.map((item) => item.id));
    const cartCategories = new Set(items.map((item) => item.category).filter(Boolean));

    const byCategory = recommendedData.products.filter(
      (product) => !cartIds.has(product.id) && cartCategories.has(product.category)
    );
    const fallback = recommendedData.products.filter((product) => !cartIds.has(product.id));

    const uniqueRecommendations = [...byCategory, ...fallback].filter(
      (product, index, array) =>
        index === array.findIndex((candidate) => candidate.id === product.id)
    );

    return uniqueRecommendations.slice(0, 6);
  })();

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold">Your Cart</h1>
        {items.length > 0 && (
          <button
            onClick={() => dispatch(clearCart())}
            className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
          >
            Clear Cart
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div
          className={`rounded-3xl border p-10 text-center ${
            isDark
              ? "border-white/10 bg-white/5 text-slate-300"
              : "border-slate-200 bg-white text-slate-600"
          }`}
        >
          Your cart is empty
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <CartItemRow
              key={item.id}
              item={item}
              isDark={isDark}
              onDecrease={() => dispatch(decreaseQuantity(item.id))}
              onIncrease={() => dispatch(increaseQuantity(item.id))}
              onRemove={() => dispatch(removeFromCart(item.id))}
            />
          ))}
        </div>
      )}

      <CartNotes isDark={isDark} value={cartNotes} onChange={setCartNotes} />

      <RecommendedProducts isDark={isDark} products={recommendedProducts} />

      <div
        className={`rounded-2xl border p-5 text-xl font-semibold ${
          isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
        }`}
      >
        Total: ${totalPrice.toFixed(2)}
      </div>
    </section>
  );
}

export default Cart;
