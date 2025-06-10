import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [whatsapp, setWhatsapp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!whatsapp) {
      alert('Nomor WhatsApp harus diisi');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ whatsapp }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login berhasil!');
        console.log('Response:', data);
        // redirect atau simpan token jika perlu
      } else {
        alert(data.message || 'Login gagal');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Terjadi kesalahan saat login');
    } finally {
      setLoading(false);
    }
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
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg transition text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {loading ? 'Logging in...' : 'Log in'}
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
