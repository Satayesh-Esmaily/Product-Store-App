import { useDispatch, useSelector } from "react-redux";
import { useContext } from "react";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../store/cartSlice";
import { SettingsContext } from "../context/settingsContext";

function Cart() {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { state } = useContext(SettingsContext);
  const isDark = state.theme === "dark";

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-semibold">Your Cart</h1>

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

