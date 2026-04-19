import { Link } from "react-router-dom";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { SettingsContext } from "../../context/SettingsContext";

function Navbar() {
  const { state, dispatch } = useContext(SettingsContext);
  const { items } = useSelector((state) => state.cart);
  const totalItems = items.reduce(
  (total, item) => total + item.quantity,
  0
);
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart ({totalItems})</Link>
      <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
        Switch to {state.theme === "light" ? "Dark" : "Light"}  
      </button>
    </nav>
  );
}

export default Navbar;