import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './components/ProductList';
import ComprobanteVenta from './components/ComprobanteVenta';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getProducts } from './redux/actions';


const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }
    , [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/comprobante" element={<ComprobanteVenta />} />
      </Routes>
    </Router>
  );
};

export default App;