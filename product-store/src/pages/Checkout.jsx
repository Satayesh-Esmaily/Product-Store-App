import { useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { SettingsContext } from "../context/settingsContext";

function Checkout() {
  const { items } = useSelector((state) => state.cart);
  const { state } = useContext(SettingsContext);
  const isDark = state.theme === "dark";

  const [form, setForm] = useState({
    fullName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const totalUnits = useMemo(
    () => items.reduce((total, item) => total + item.quantity, 0),
    [items]
  );
  const totalPrice = useMemo(
    () => items.reduce((total, item) => total + item.price * item.quantity, 0),
    [items]
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-3xl font-semibold">Checkout</h1>
        <Link
          to="/cart"
          className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
            isDark
              ? "border border-white/10 text-slate-200 hover:bg-white/10"
              : "border border-slate-300 text-slate-700 hover:bg-slate-100"
          }`}
        >
          Back to Cart
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <form
          onSubmit={handleSubmit}
          className={`space-y-4 rounded-2xl border p-5 lg:col-span-2 ${
            isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
          }`}
        >
          <h2 className="text-lg font-semibold">Payment Information</h2>

          <label className="block space-y-2">
            <span className="text-sm font-medium">Full Name</span>
            <input
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Satayesh Esmaily"
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${
                isDark
                  ? "border-white/10 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus:border-blue-300"
                  : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-slate-500"
              }`}
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium">Card Number</span>
            <input
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              placeholder="444 4444 444"
              className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${
                isDark
                  ? "border-white/10 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus:border-blue-300"
                  : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-slate-500"
              }`}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2">
              <span className="text-sm font-medium">Expiry</span>
              <input
                name="expiry"
                value={form.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${
                  isDark
                    ? "border-white/10 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus:border-blue-300"
                    : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-slate-500"
                }`}
              />
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium">CVV</span>
              <input
                name="cvv"
                value={form.cvv}
                onChange={handleChange}
                placeholder="123"
                className={`w-full rounded-lg border px-3 py-2 text-sm outline-none transition ${
                  isDark
                    ? "border-white/10 bg-slate-900 text-slate-100 placeholder:text-slate-500 focus:border-blue-300"
                    : "border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-slate-500"
                }`}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={items.length === 0}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              items.length === 0
                ? "cursor-not-allowed bg-slate-400 text-white"
                : "bg-emerald-600 text-white hover:bg-emerald-700"
            }`}
          >
            Simulate Payment
          </button>

          {isSubmitted && (
            <div
              className={`rounded-lg border px-4 py-3 text-sm ${
                isDark
                  ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-100"
                  : "border-emerald-300 bg-emerald-50 text-emerald-800"
              }`}
            >
              Payment submitted successfully.
            </div>
          )}
        </form>

        <aside
          className={`space-y-3 rounded-2xl border p-5 ${
            isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white"
          }`}
        >
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <p className={isDark ? "text-slate-300" : "text-slate-600"}>
            Unique Items: <span className="font-semibold">{items.length}</span>
          </p>
          <p className={isDark ? "text-slate-300" : "text-slate-600"}>
            Total Quantity: <span className="font-semibold">{totalUnits}</span>
          </p>
          <p className={isDark ? "text-slate-300" : "text-slate-600"}>
            Total Price: <span className="font-semibold">${totalPrice.toFixed(2)}</span>
          </p>
        </aside>
      </div>
    </section>
  );
}

export default Checkout;
