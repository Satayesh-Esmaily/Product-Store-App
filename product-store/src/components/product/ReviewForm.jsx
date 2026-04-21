function ReviewForm({ isDark, form, setForm, onSubmit, onAddTestReview, isSubmitting }) {
  return (
    <>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-semibold">Reviews</h3>
        <button
          onClick={onAddTestReview}
          disabled={isSubmitting}
          className={`rounded-xl px-3 py-2 text-xs font-semibold transition disabled:opacity-50 ${
            isDark
              ? "border border-white/10 text-slate-200 hover:bg-white/10"
              : "border border-slate-200 text-slate-700 hover:bg-slate-100"
          }`}
        >
          Add test data
        </button>
      </div>

      <form onSubmit={onSubmit} className="grid gap-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <input
            type="text"
            value={form.reviewerName}
            onChange={(event) => setForm((prev) => ({ ...prev, reviewerName: event.target.value }))}
            placeholder="Your name"
            className={`rounded-xl border px-3 py-2 text-sm outline-none ${
              isDark
                ? "border-white/10 bg-slate-900 text-slate-100 placeholder:text-slate-500"
                : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
            }`}
          />
          <select
            value={form.rating}
            onChange={(event) => setForm((prev) => ({ ...prev, rating: event.target.value }))}
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
          onChange={(event) => setForm((prev) => ({ ...prev, comment: event.target.value }))}
          placeholder="Write your review..."
          className={`rounded-xl border px-3 py-2 text-sm outline-none ${
            isDark
              ? "border-white/10 bg-slate-900 text-slate-100 placeholder:text-slate-500"
              : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
          }`}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-fit rounded-xl px-4 py-2 text-sm font-semibold transition disabled:opacity-50 ${
            isDark
              ? "bg-blue-300 text-blue-950 hover:bg-blue-200"
              : "bg-slate-900 text-blue-100 hover:bg-slate-800"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit review"}
        </button>
      </form>
    </>
  );
}

export default ReviewForm;
