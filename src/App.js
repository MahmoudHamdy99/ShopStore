import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import { Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';

// مكون حماية للصفحات الخاصة
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? children : <Navigate to="/login" replace />;
};

const App = () => {
  return <div className='overflow-hidden'>
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={
          <>
            <Header />
            <Routes>
              <Route path='/' element={<PrivateRoute><Home /></PrivateRoute>} />
              <Route path='/product/:id' element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
              <Route path='/cart' element={<PrivateRoute><Cart /></PrivateRoute>} />
              <Route path='/checkout' element={<PrivateRoute><Checkout /></PrivateRoute>} />
            </Routes>
            <Sidebar />
            <Footer />
          </>
        } />
      </Routes>
    </Router>
  </div>;
};

export default App;
