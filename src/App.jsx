import './App.css'
import Header from './Header'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Sidebar from './Sidebar';
import { Route, Routes } from 'react-router-dom';
import Footer from './Footer';
import { createContext, useEffect, useState } from 'react';
import Dashboard from './Dashboard';
import { environment } from './environments/environment';
import ProductsList from './ProductsList';

const ProductContext = createContext()

function App() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch(`${environment.apiUrl}products`)
      .then(response => response.json())
      .then(setProducts)
  }, [])

  if (!products) return <h1>Loading products</h1>

  return (
    <MantineProvider>
      <ProductContext.Provider value={{products: products}}>
        <div className="container">
          <Header></Header>
          <div className="nav-main-container">
            <Sidebar></Sidebar>
            <Routes>
              <Route
                path="/"
                element={<Dashboard />}
                />
              <Route
                path="/products"
                element={<ProductsList />}
              />
            </Routes>
          </div>
          <Footer></Footer>
        </div>
      </ProductContext.Provider>
    </MantineProvider>
  )
}

export {App, ProductContext}
