import React from 'react';
import { Link } from 'react-router-dom';

const HeaderBar = () => {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo / Brand */}
      <div className="text-xl font-bold text-blue-600">
        <Link to="/">impact.id</Link>
      </div>

      {/* Menu Kanan */}
      <div className="space-x-4">
        <Link
          to="/login"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 font-medium"
        >
          Register
        </Link>
      </div>
    </header>
  );
};

export default HeaderBar;
