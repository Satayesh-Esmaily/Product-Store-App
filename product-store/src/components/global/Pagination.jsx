function Pagination({ page, setPage, totalPages, search }) {
  if (search) return null; 

  return (
    <div style={{ marginTop: "30px", display: "flex", gap: "8px", flexWrap: "wrap" }}>
      
      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => setPage((p) => p - 1)}
      >
        Prev
      </button>

      {/* Pages */}
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .slice(Math.max(0, page - 3), page + 2)
        .map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            style={{
              padding: "5px 10px",
              background: p === page ? "#333" : "#eee",
              color: p === page ? "#fff" : "#000",
              fontWeight: p === page ? "bold" : "normal",
              borderRadius: "4px",
            }}
          >
            {p}
          </button>
        ))}

      {/* Next */}
      <button
        disabled={page === totalPages}
        onClick={() => setPage((p) => p + 1)}
      >
        Next
      </button>

    </div>
  );
}

export default Pagination;