function ReviewsList({ isDark, reviews }) {
  return (
    <div className="mt-6 space-y-3">
      {reviews.length === 0 ? (
        <p className={isDark ? "text-slate-300" : "text-slate-600"}>No reviews yet.</p>
      ) : (
        reviews.map((review, index) => (
          <article
            key={`${review.reviewerName || "anon"}-${review.date || index}-${index}`}
            className={`rounded-2xl border p-4 ${
              isDark ? "border-white/10 bg-slate-900/40" : "border-slate-200 bg-slate-50"
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-semibold">{review.reviewerName || "Anonymous"}</p>
              <p className={isDark ? "text-yellow-200" : "text-yellow-700"}>
                Rating: {Number(review.rating || 0).toFixed(1)} / 5
              </p>
            </div>
            <p className={`mt-2 leading-7 ${isDark ? "text-slate-300" : "text-slate-600"}`}>
              {review.comment}
            </p>
          </article>
        ))
      )}
    </div>
  );
}

export default ReviewsList;
