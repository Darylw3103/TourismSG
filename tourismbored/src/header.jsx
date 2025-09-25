import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="bg-blue-600 text-white fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-16">
      <div className="text-3xl font-extrabold cursor-pointer select-none">
        SGTourism
      </div>
      <button
        onClick={() => navigate('/login')}
        className="px-4 py-2 border border-white rounded hover:bg-white hover:text-blue-600 transition font-semibold"
      >
        Sign In
      </button>
    </header>
  );
}
