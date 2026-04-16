import { Link } from "react-router-dom";
import { useContext } from "react";
import { SettingsContext } from "../../context/SettingsContext";

function Navbar() {
  const { state, dispatch } = useContext(SettingsContext);
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/cart">Cart</Link>
      <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
        Switch to {state.theme === "light" ? "Dark" : "Light"}  
      </button>
    </nav>
  );
}

export default Navbar;