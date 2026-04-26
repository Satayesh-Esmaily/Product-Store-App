import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
  const totalUnits = items.reduce((total, item) => total + item.quantity, 0);

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
        <div>
          <h1 className="text-3xl font-semibold">Your Cart</h1>
          <p className={`mt-1 text-sm ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            {items.length} unique items, {totalUnits} total units
          </p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="space-y-4">
          <div
            className={`rounded-3xl border p-10 text-center ${
              isDark
                ? "border-white/10 bg-white/5 text-slate-300"
                : "border-slate-200 bg-white text-slate-600"
            }`}
          >
            <p className="text-lg font-medium">Your cart is empty</p>
            <p className="mt-2 text-sm">Add products from home page to see full cart summary.</p>
            <Link
              to="/"
              className="mt-4 inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Browse Products
            </Link>
          </div>
          <CartNotes isDark={isDark} value={cartNotes} onChange={setCartNotes} />
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
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
            <CartNotes isDark={isDark} value={cartNotes} onChange={setCartNotes} />
          </div>

          <aside
            className={`h-fit rounded-2xl border p-5 lg:sticky lg:top-24 ${
              isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
            }`}
          >
            <h2 className="text-lg font-semibold">Summary</h2>
            <div className="mt-4 space-y-2">
              <div
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                  isDark ? "bg-white/5 text-slate-300" : "bg-slate-50 text-slate-700"
                }`}
              >
                <span>Unique Items</span>
                <span className="font-semibold">{items.length}</span>
              </div>
              <div
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                  isDark ? "bg-white/5 text-slate-300" : "bg-slate-50 text-slate-700"
                }`}
              >
                <span>Total Quantity</span>
                <span className="font-semibold">{totalUnits}</span>
              </div>
              <div
                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                  isDark ? "bg-white/5 text-slate-300" : "bg-slate-50 text-slate-700"
                }`}
              >
                <span>Total Price</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className={`my-4 border-t ${isDark ? "border-white/10" : "border-slate-200"}`} />

            <div className="max-h-56 space-y-2 overflow-auto pr-1">
              {items.map((item) => (
                <div
                  key={`summary-${item.id}`}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm ${
                    isDark ? "bg-white/5 text-slate-300" : "bg-slate-50 text-slate-700"
                  }`}
                >
                  <span className="truncate pr-3">{item.title}</span>
                  <span className="shrink-0 font-medium">
                    {item.quantity} x ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2">
              <Link
                to="/checkout"
                className="block rounded-lg bg-emerald-600 px-4 py-2 text-center text-sm font-semibold text-white transition hover:bg-emerald-700"
              >
                Proceed to Payment
              </Link>
              <button
                onClick={() => dispatch(clearCart())}
                className="w-full rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
              >
                Clear Cart
              </button>
            </div>
          </aside>
        </div>
      )}

      <RecommendedProducts isDark={isDark} products={recommendedProducts} />
    </section>
  );
}

export default Cart;
