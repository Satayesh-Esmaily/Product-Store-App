import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/global/Navbar";
import { useContext } from "react";
import { SettingsContext } from "./context/settingsContext";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const { state } = useContext(SettingsContext);
  const isDark = state.theme === "dark";

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${state.theme} ${
        isDark
          ? "bg-slate-950 text-slate-100"
          : "bg-gradient-to-b from-[#f7f9fc] via-[#f3f6fb] to-[#eef3f9] text-slate-900"
      }`}
    >
      <Navbar />
      <main className="w-full px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

