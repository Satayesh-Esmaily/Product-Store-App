import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { removeFromCart, clearCart, increaseQuantity, decreaseQuantity } from "../store/cartSlice";
import { fetchProducts } from "../services/productApi";
import { SettingsContext } from "../context/settingsContext";

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

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

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
            <article
              key={item.id}
              className={`flex flex-col gap-4 rounded-2xl border p-4 sm:flex-row sm:items-center sm:justify-between ${
                isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
              }`}
            >
              <div className="flex items-center gap-4">
                 <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="h-16 w-16 object-contain rounded"
                 />
                <h2 className="font-semibold">{item.title}</h2>
                <p className="mt-1 text-sm text-slate-500">${item.price}</p>
              </div>

              <div className="flex items-center gap-2">


                <button
                  onClick={() => dispatch(decreaseQuantity(item.id))}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                    isDark
                      ? "border border-white/10 text-slate-200 hover:bg-white/10"
                      : "border border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  -
                </button>
                <span className="w-8 text-center font-semibold">{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQuantity(item.id))}
                  className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${
                    isDark
                      ? "border border-white/10 text-slate-200 hover:bg-white/10"
                      : "border border-slate-300 hover:bg-slate-100"
                  }`}
                >
                  +
                </button>
                <button
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="ml-2 rounded-lg bg-rose-500 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-rose-600"
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <section
        className={`rounded-2xl border p-5 ${
          isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
        }`}
      >
        <h2 className="text-lg font-semibold">Cart Notes</h2>
        <p className={`mt-1 text-sm ${isDark ? "text-slate-300" : "text-slate-500"}`}>
          Add a note for your order. It will be saved locally.
        </p>
        <textarea
          value={cartNotes}
          onChange={(event) => setCartNotes(event.target.value)}
          rows={4}
          placeholder="Example: Please pack fragile items separately."
          className={`mt-3 w-full rounded-xl border px-3 py-2 text-sm outline-none ${
            isDark
              ? "border-white/10 bg-slate-900 text-slate-100 placeholder:text-slate-500"
              : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
          }`}
        />
      </section>

      {recommendedProducts.length > 0 && (
        <section
          className={`rounded-2xl border p-5 ${
            isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
          }`}
        >
          <h2 className="text-lg font-semibold">Recommended Products</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recommendedProducts.map((product) => (
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
      )}

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

