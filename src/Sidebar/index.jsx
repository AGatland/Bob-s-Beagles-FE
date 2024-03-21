import { Link } from "react-router-dom";
import "./style.css";
import {
  IconHome,
  IconDogBowl,
  IconUser,
  IconShoppingCart,
  IconSettings,
} from "@tabler/icons-react";
import { useContext } from "react";
import { AuthContext } from "../App";

function Sidebar() {
  const { user } = useContext(AuthContext);
  return (
    <nav>
      <Link to="/">
        <button>
          <IconHome></IconHome>
          Home
        </button>
      </Link>
      <Link to="/products">
        <button>
          <IconDogBowl></IconDogBowl>
          Products
        </button>
      </Link>
      <Link to="/basket">
        <button>
          <IconShoppingCart></IconShoppingCart>
          Basket
        </button>
      </Link>
      <Link to="/login">
        <button>
          <IconUser></IconUser>
          {user ? "LogOut" : "LogIn"}
        </button>
      </Link>
      <Link to={user && `/users/${user.id}`}>
        <button>
          <IconSettings></IconSettings>
          Settings
        </button>
      </Link>
    </nav>
  );
}

export default Sidebar;
