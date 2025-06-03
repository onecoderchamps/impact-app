import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!whatsappNumber) {
      alert('Please enter your WhatsApp number');
      return;
    }
    console.log('Logging in with:', whatsappNumber);
    // Lakukan proses login di sini
  };

  const dummyImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s';

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-blue-600 text-white flex flex-col items-center justify-center p-10">
        <div className="max-w-md text-center">
          <img
            src={dummyImage}
            alt="Mockup"
            className="mb-6 w-3/4 mx-auto"
          />
          <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-sm">
            Login dan dapatkan akses penuh ke semua fitur untuk kebutuhan influencer marketing Anda.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h2 className="text-2xl font-semibold mb-6">Log in</h2>
          <form onSubmit={handleLogin}>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Nomor WhatsApp*
            </label>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="+628123456789"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onPress={() => window.location.href = '/'}
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Log in
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-600">
            Belum punya akun?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Daftar di sini
            </Link>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Kembali ke{' '}
            <Link to="/" className="text-blue-600 hover:underline">
              Beranda
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
