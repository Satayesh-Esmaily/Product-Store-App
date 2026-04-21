import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useContext, useMemo, useState } from "react";
import { fetchProductById } from "../services/productApi";
import { SettingsContext } from "../context/settingsContext";
import Loading from "../components/global/Loading";

const REVIEWS_STORAGE_KEY = "product-store-reviews";
const loadStoredReviews = () => {
  try {
    const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : {};
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
};

function ProductDetails() {
  const { id } = useParams();
  const { state } = useContext(SettingsContext);
  const isDark = state.theme === "dark";
  const [localReviewsByProduct, setLocalReviewsByProduct] = useState(loadStoredReviews);
  const [form, setForm] = useState({
    reviewerName: "",
    rating: "5",
    comment: "",
  });

  const { data, isLoading, isError } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id),
  });

  const customReviews = useMemo(
    () => localReviewsByProduct[id] ?? [],
    [localReviewsByProduct, id]
  );

  const allReviews = useMemo(
    () => [...(data?.reviews || []), ...customReviews],
    [data?.reviews, customReviews]
  );

  const handleSubmitReview = (event) => {
    event.preventDefault();
    const reviewerName = form.reviewerName.trim();
    const comment = form.comment.trim();

    if (!reviewerName || !comment) return;

    const newReview = {
      reviewerName,
      rating: Number(form.rating),
      comment,
      date: new Date().toISOString(),
      reviewerEmail: "",
      source: "local",
    };

    const updatedCustomReviews = [...customReviews, newReview];
    setForm({
      reviewerName: "",
      rating: "5",
      comment: "",
    });

    setLocalReviewsByProduct((prev) => {
      const next = { ...prev, [id]: updatedCustomReviews };
      try {
        localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore write errors.
      }
      return next;
    });
  };

  if (isLoading) {
    return <Loading variant="productDetails" />;
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-rose-300/70 bg-rose-50 p-10 text-center text-rose-600">
        Error loading product
      </div>
    );
  }

  return (
    <div className="space-y-8">
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
          <div className="flex items-center gap-3">
            <h3 className="text-2xl font-bold">${data.price}</h3>
            <span
              className={`rounded-full px-3 py-1 text-sm font-semibold ${
                isDark ? "bg-yellow-300/20 text-yellow-200" : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {Number(data.rating ?? 0).toFixed(1)} / 5
            </span>
          </div>
        </div>
      </section>

      <section
        className={`rounded-3xl border p-6 sm:p-8 ${
          isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/95"
        }`}
      >
        <h3 className="text-2xl font-semibold">Reviews</h3>

        <form onSubmit={handleSubmitReview} className="mt-5 grid gap-3">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <input
              type="text"
              value={form.reviewerName}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, reviewerName: event.target.value }))
              }
              placeholder="Your name"
              className={`rounded-xl border px-3 py-2 text-sm outline-none ${
                isDark
                  ? "border-white/10 bg-slate-900 text-slate-100 placeholder:text-slate-500"
                  : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
              }`}
            />
            <select
              value={form.rating}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, rating: event.target.value }))
              }
              className={`rounded-xl border px-3 py-2 text-sm outline-none ${
                isDark
                  ? "border-white/10 bg-slate-900 text-slate-100"
                  : "border-slate-200 bg-white text-slate-900"
              }`}
            >
              <option value="5">5 stars</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
              <option value="2">2 stars</option>
              <option value="1">1 star</option>
            </select>
          </div>

          <textarea
            rows={4}
            value={form.comment}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, comment: event.target.value }))
            }
            placeholder="Write your review..."
            className={`rounded-xl border px-3 py-2 text-sm outline-none ${
              isDark
                ? "border-white/10 bg-slate-900 text-slate-100 placeholder:text-slate-500"
                : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
            }`}
          />

          <button
            type="submit"
            className={`w-fit rounded-xl px-4 py-2 text-sm font-semibold transition ${
              isDark
                ? "bg-blue-300 text-blue-950 hover:bg-blue-200"
                : "bg-slate-900 text-blue-100 hover:bg-slate-800"
            }`}
          >
            Submit review
          </button>
        </form>

        {allReviews.length === 0 ? (
          <p className={`mt-6 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
            No reviews yet.
          </p>
        ) : (
          <div className="mt-6 space-y-3">
            {allReviews.map((review, index) => (
              <article
                key={`${review.reviewerName}-${review.date}-${index}`}
                className={`rounded-2xl border p-4 ${
                  isDark ? "border-white/10 bg-slate-900/40" : "border-slate-200 bg-slate-50"
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{review.reviewerName || "Anonymous"}</p>
                  <p className={isDark ? "text-yellow-200" : "text-yellow-700"}>
                    Rating: {Number(review.rating ?? 0).toFixed(1)} / 5
                  </p>
                </div>
                <p className={`mt-2 leading-7 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
                  {review.comment}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default ProductDetails;

