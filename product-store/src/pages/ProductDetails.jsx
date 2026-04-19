import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { fetchProductById } from "../services/productApi";
import { SettingsContext } from "../context/SettingsContext";

function ProductDetails() {
  const { id } = useParams();
  const { state } = useContext(SettingsContext);
  const isDark = state.theme === "dark";

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-10 text-center text-slate-600 shadow-sm">
        Loading product...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-rose-300/70 bg-rose-50 p-10 text-center text-rose-600">
        Error loading product
      </div>
    );
  }

  return (
    <section
      className={`grid gap-8 rounded-3xl border p-6 sm:grid-cols-2 sm:p-8 ${
        isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/95"
      }`}
    >
      <div className="rounded-2xl bg-white p-6">
        <img
          src={data.images?.[0] || data.thumbnail}
          alt={data.title}
          className="mx-auto h-72 w-full object-contain"
        />
      </div>

      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
          {data.category}
        </p>
        <h2 className="text-3xl font-semibold">{data.title}</h2>
        <p className="leading-7 text-slate-500">{data.description}</p>
        <h3 className="text-2xl font-bold">${data.price}</h3>
      </div>
    </section>
  );
}

export default ProductDetails;
