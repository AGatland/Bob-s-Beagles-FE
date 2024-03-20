import "./App.css";
import Header from "./Header";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import Sidebar from "./Sidebar";
import { Route, Routes } from "react-router-dom";
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
const UserContext = createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch(`${environment.devUrl}products`)
      .then((response) => response.json())
      .then(setProducts);
  }, []);

  if (!products) return <h1>Loading products</h1>;

  return (
    <MantineProvider>
      <ProductContext.Provider value={{ products: products }}>
        <BasketContext.Provider
          value={{ basket: basket, setBasket: setBasket }}
        >
          <UserContext.Provider value={{ user: user }}>
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
          </UserContext.Provider>
        </BasketContext.Provider>
      </ProductContext.Provider>
    </MantineProvider>
  );
}
export { App, ProductContext, BasketContext };
