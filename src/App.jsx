import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProductList from './components/ProductList';
import ComprobanteVenta from './components/ComprobanteVenta';
import NavBar from './components/NavBar';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from './redux/actions';

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/products" && <NavBar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/comprobante" element={<ComprobanteVenta />} />
      </Routes>
    </>
  );
};

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
