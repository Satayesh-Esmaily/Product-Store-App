import { useState, useEffect } from "react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(input);
    }, 500);

    return () => clearTimeout(timeout);
  }, [input, onSearch]);

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search products..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          border: "1px solid #ccc",
          borderRadius: "6px",
        }}
      />
    </div>
  );
}

export default SearchBar;