import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../store/cartSlice";

const CART_STORAGE_KEY = "product-store-cart";

const loadCartState = () => {
  try {
    const serializedState = localStorage.getItem(CART_STORAGE_KEY);
    if (!serializedState) return undefined;

    const items = JSON.parse(serializedState);
    return { cart: { items: Array.isArray(items) ? items : [] } };
  } catch {
    return undefined;
  }
};

const saveCartState = (state) => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.cart.items));
  } catch {
    // Ignore write errors (e.g. private mode / storage limits)
  }
};

export const store = configureStore({
  preloadedState: loadCartState(),
  reducer: {
    cart: cartReducer,
  },
});

store.subscribe(() => {
  saveCartState(store.getState());
});
