import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import LandingPage from './landingpage.jsx';
import Signup from './signup.jsx';
import Login from './login.jsx';
import App from './App.jsx';
import Attractions from './attractions.jsx';
import Hotels from './hotels.jsx';
import Concerts from './concerts.jsx';
import Foodplaces from './foodplaces.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<App />} />
        {/* New routes for individual sections */}
        <Route path="/attractions" element={<Attractions />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/concerts" element={<Concerts />} />
        <Route path="/foodplaces" element={<Foodplaces />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);