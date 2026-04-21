import axios from "axios";

const api = axios.create({
  baseURL: "https://dummyjson.com",
});


export const fetchProducts = async (limit = 12, skip = 0) => {
  const res = await api.get(`/products?limit=${limit}&skip=${skip}`);
  return res.data;
};

export const fetchProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data;
};


export const fetchCategories = async () => {
  const res = await api.get("/products/categories");
  return res.data;
};


export const fetchProductsByCategory = async (category, limit = 12, skip = 0) => {
  const res = await api.get(
    `/products/category/${category}?limit=${limit}&skip=${skip}`
  );
  return res.data;
};

export const searchProducts = async (query) => {
  const res = await api.get(`/products/search?q=${query}`);
  return res.data;
};
