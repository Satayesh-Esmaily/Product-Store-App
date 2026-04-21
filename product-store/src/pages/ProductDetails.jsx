import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useContext, useMemo, useState } from "react";
import { fetchProductById } from "../services/productApi";
import { SettingsContext } from "../context/settingsContext";
import Loading from "../components/global/Loading";
import ReviewForm from "../components/product/ReviewForm";
import ReviewsList from "../components/product/ReviewsList";

const submitReviewMock = async (review) => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    ...review,
    date: new Date().toISOString(),
  };
};

const loadStoredReviews = () => {
  try {
    const stored = localStorage.getItem("reviews");
    return stored ? JSON.parse(stored) : {};
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

  const addReviewMutation = useMutation({
    mutationFn: submitReviewMock,
    onSuccess: (newReview) => {
      setLocalReviewsByProduct((prev) => {
        const updated = {
          ...prev,
          [id]: [newReview, ...(prev[id] || [])],
        };

        localStorage.setItem("reviews", JSON.stringify(updated));
        return updated;
      });

      setForm({ reviewerName: "", rating: "5", comment: "" });
    },
  });

  const handleSubmitReview = (event) => {
    event.preventDefault();

    const reviewerName = form.reviewerName.trim();
    const comment = form.comment.trim();

    if (!reviewerName || !comment) return;

    addReviewMutation.mutate({
      reviewerName,
      rating: Number(form.rating),
      comment,
    });
  };

  const handleAddTestReview = () => {
    addReviewMutation.mutate({
      reviewerName: "Test User",
      rating: 4,
      comment: "This is a test review added via mutation.",
    });
  };

  const localReviews = useMemo(
    () => localReviewsByProduct[id] || [],
    [localReviewsByProduct, id]
  );

  const allReviews = useMemo(
    () => [...localReviews, ...(data?.reviews || [])],
    [localReviews, data?.reviews]
  );

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
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{data.category}</p>
          <h2 className="text-3xl font-semibold">{data.title}</h2>
          <p className="leading-7 text-slate-500">{data.description}</p>
          <h3 className="text-2xl font-bold">${data.price}</h3>
        </div>
      </section>

      <section
        className={`rounded-3xl border p-6 sm:p-8 ${
          isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-white/95"
        }`}
      >
        <ReviewForm
          isDark={isDark}
          form={form}
          setForm={setForm}
          onSubmit={handleSubmitReview}
          onAddTestReview={handleAddTestReview}
          isSubmitting={addReviewMutation.isPending}
        />

        <ReviewsList isDark={isDark} reviews={allReviews} />
      </section>
    </div>
  );
}

export default ProductDetails;
