
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import ProductList from './components/products/ProductList';
import ProductDetail from './components/products/ProductDetail';
import ShoppingCart from './components/cart/ShoppingCart';
import Checkout from './components/cart/Checkout';
import UserProfile from './components/user/UserProfile';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="container py-4">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
