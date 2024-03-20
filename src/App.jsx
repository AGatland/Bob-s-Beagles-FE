import "./App.css";
import Header from "./Header";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Sidebar from "./Sidebar";
import { Route, Routes, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { createContext, useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { environment } from "./environments/environment";
import ProductsList from "./ProductsList";
import Basket from "./Basket";
import Login from "./Login";
import Signup from "./Signup";
import ProductView from './ProductView';

const ProductContext = createContext();
const BasketContext = createContext();
const AuthContext = createContext();

const loadUserDataFromStorage = () => {
  const userVal = localStorage.getItem("authUser");
  if (userVal !== undefined || userVal !== null) return JSON.parse(userVal);
  return null;
};

function App() {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState([]);
  const [user, setUser] = useState(loadUserDataFromStorage());

  const navigate = useNavigate();

  const [authToken, setAuthToken] = useState(
    localStorage.getItem("authToken") || ""
  );

    // called when we successfully log in
    const login = (user, authToken) => {
      setUser(user);
      setAuthToken(authToken);
      // update local storage
      localStorage.setItem("authUser", JSON.stringify(user));
      localStorage.setItem("authToken", authToken);
      // redirect to home page after login
      navigate("/");
    };
  
    // called to logout: clear local storage + reset local state
    const logout = () => {
      // reset local user auth state
      setUser(null);
      setAuthToken("");
      // clear local storage
      localStorage.removeItem("authUser");
      localStorage.removeItem("authToken");
      // redirect to login page
      navigate("/login");
    };

  useEffect(() => {
    fetch(`${environment.devUrl}products`)
      .then((response) => response.json())
      .then(setProducts);
  }, []);

  if (!products) return <h1>Loading products</h1>;

  return (
    <MantineProvider>
      <AuthContext.Provider value={{ user, authToken, login, logout }}>
        <ProductContext.Provider value={{ products: products }}>
          <BasketContext.Provider
            value={{ basket: basket, setBasket: setBasket }}
          >
            <div className="container">
              <Header></Header>
              <div className="nav-main-container">
                <Sidebar></Sidebar>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/products" element={<ProductsList />} />
                  <Route path="/basket" element={<Basket />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/products/:id" element={<ProductView />}
              />
                </Routes>
              </div>
              <Footer></Footer>
            </div>
          </BasketContext.Provider>
        </ProductContext.Provider>
      </AuthContext.Provider>
    </MantineProvider>
  );
}
export { App, ProductContext, BasketContext, AuthContext };
