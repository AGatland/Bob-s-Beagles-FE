import './App.css'
import Header from './Header'
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import Sidebar from './Sidebar';
import { Route, Routes } from 'react-router-dom';
import Footer from './Footer';

function App() {
  return (
    <MantineProvider>
      <div className="container">
        <Header></Header>
        <div className="nav-main-container">
          <Sidebar></Sidebar>
          <Routes>
            <Route
              path="/"
              element={<h2>Hello, World!</h2>}
              />
          </Routes>
        </div>
        <Footer></Footer>
      </div>
    </MantineProvider>
  )
}

export default App
