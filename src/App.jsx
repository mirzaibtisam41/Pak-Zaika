import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import Menu from './pages/Menu';
import DishDetails from './pages/DishDetails';
import Checkout from './pages/Checkout';
import OrderSummary from './pages/OrderSummary';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/dish/:id" element={<DishDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-summary/:orderId" element={<OrderSummary />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;