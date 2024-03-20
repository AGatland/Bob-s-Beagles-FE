import "./App.css";
import Header from "./Header";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Sidebar from "./Sidebar";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Footer from "./Footer";
import { createContext, useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { environment } from "./environments/environment";
import ProductsList from "./ProductsList";
import Basket from "./Basket";
import Login from "./Login";
import Signup from "./Signup";
import ProductView from "./ProductView";
import OrderHistory from "./OrderHistory";
import OrderView from "./OrderView";

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
    if (user) {
      const getProducts = async () => {
        const response = await fetch(`${environment.apiUrl}products`, {
          Method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });
        const products = await response.json();
        setProducts(products);
      };
      getProducts();
    }
    if (!user) navigate("/login");
  }, [user]);

  if (!products.data && user) return <h1>Loading</h1>;

  return (
    <MantineProvider>
      <AuthContext.Provider value={{ user, authToken, login, logout }}>
        <ProductContext.Provider value={{ products: products.data }}>
          <BasketContext.Provider
            value={{ basket: basket, setBasket: setBasket }}
          >
            <div className="container">
              <Header></Header>
              <div className="nav-main-container">
                <Sidebar></Sidebar>
                <Routes>
                  <Route path="/" element={user ? <Dashboard /> : <Login />} />
                  <Route
                    path="/products"
                    element={user ? <ProductsList /> : <Login />}
                  />
                  <Route
                    path="/basket"
                    element={user ? <Basket /> : <Login />}
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/products/:id" element={<ProductView />} />
                  <Route path="/users/:id/orders" element={<OrderHistory />} />
                  <Route
                    path="/users/:id/orders/:orderId"
                    element={<OrderView />}
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
