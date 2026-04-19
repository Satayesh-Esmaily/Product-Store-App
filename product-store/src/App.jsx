import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/global/Navbar"
import { useContext } from "react";
import { SettingsContext } from "./context/SettingsContext";
import ProductDetails from "./pages/ProductDetails";

function App() {
  const { state } = useContext(SettingsContext);
  return (
    <>
    <Navbar />
    <div className={state.theme}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product/:id" element={<ProductDetails />} />
    </Routes>
    </div>
    </>
  );
}

export default App;