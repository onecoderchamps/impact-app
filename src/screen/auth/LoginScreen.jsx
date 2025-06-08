import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [whatsapp, setWhatsapp] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!whatsapp) {
      alert('Nomor WhatsApp harus diisi');
      return;
    }

    console.log('Logging in with:', whatsapp);
    // Kirim ke backend di sini
  };

  const dummyImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s';

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-blue-600 text-white flex flex-col items-center justify-center p-10">
        <div className="max-w-md text-center">
          <img src={dummyImage} alt="Mockup" className="mb-6 w-3/4 mx-auto" />
          <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
          <p className="text-sm">
            Login dan dapatkan akses penuh ke semua fitur untuk kebutuhan influencer marketing Anda.
          </p>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-gray-100 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-sm bg-white p-8 rounded shadow space-y-4"
        >
          <h2 className="text-2xl font-semibold mb-6">Log in</h2>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Nomor WhatsApp*
            </label>
            <input
              type="text"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              placeholder="+628123456789"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Log in
          </button>

          <p className="mt-6 text-sm text-gray-600 text-center">
            Belum punya akun?{' '}
            <Link to="/register" className="text-blue-600 hover:underline">
              Daftar di sini
            </Link>
          </p>
          <p className="text-sm text-gray-600 text-center">
            Kembali ke{' '}
            <Link to="/" className="text-blue-600 hover:underline">
              Beranda
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
