import ProductCard from "./ProductCard";

function ProductsGrid({ viewMode, products }) {
  return (
    <div
      className={
        viewMode === "list"
          ? "grid grid-cols-1 gap-4"
          : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      }
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} view={viewMode} />
      ))}
    </div>
  );
}

export default ProductsGrid;
