import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../context/settingsContext";
import Toast from "../global/Toast";

function ProductCard({ product, view = "grid" }) {
  const dispatch = useDispatch();
  const { state } = useContext(SettingsContext);
  const isDark = state.theme === "dark";
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (!toastMessage) return undefined;

    const timer = setTimeout(() => {
      setToastMessage("");
    }, 1800);

    return () => clearTimeout(timer);
  }, [toastMessage]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    setToastMessage(`${product.title} added to cart`);
  };

  return (
    <>
      <Toast message={toastMessage} isDark={isDark} />

      <article
        className={`group flex rounded-3xl border p-4 shadow-sm transition duration-300 hover:shadow-xl ${
          view === "list"
            ? "flex-row items-center gap-4"
            : "h-full flex-col justify-between hover:-translate-y-1"
        } ${
          isDark
            ? "border-white/10 bg-white/[0.03]"
            : "border-slate-200 bg-white/95"
        }`}
      >
        <img
          src={product.images?.[0]}
          alt={product.title}
          className={`rounded-2xl bg-white object-contain p-4 ${
            view === "list" ? "h-28 w-28 shrink-0" : "h-44 w-full"
          }`}
        />

        <div className={`${view === "list" ? "flex-1" : "mt-4"} space-y-2`}>
          <p
            className={`text-xs uppercase tracking-[0.2em] ${
              isDark ? "text-slate-500" : "text-slate-500"
            }`}
          >
            {product.category}
          </p>
          <h3 className="line-clamp-2 text-base font-semibold leading-6">
            {product.title}
          </h3>
        </div>

        <div className={`${view === "list" ? "" : "mt-4"} flex items-center justify-between`}>
          <p className="text-xl font-bold">${product.price}</p>
        </div>

        <div className={`${view === "list" ? "ml-auto" : "mt-5"} flex items-center gap-2`}>
          <button
            onClick={handleAddToCart}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              isDark
                ? "bg-blue-300 text-blue-950 hover:bg-blue-200"
                : "bg-slate-900 text-blue-100 hover:bg-slate-800"
            }`}
          >
            Add to Cart
          </button>

          <Link
            to={`/product/${product.id}`}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              isDark
                ? "border border-white/10 text-slate-200 hover:bg-white/10"
                : "border border-slate-200 text-slate-700 hover:bg-slate-100"
            }`}
          >
            Details
          </Link>
        </div>
      </article>
    </>
  );
}

export default ProductCard;

