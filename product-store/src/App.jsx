import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/global/Navbar"
import { useContext } from "react";
import { SettingsContext } from "./context/SettingsContext";


function App() {
  const { state } = useContext(SettingsContext);
  return (
    <>
    <Navbar />
    <div className={state.theme}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
    </div>
    </>
  );
}

export default App;