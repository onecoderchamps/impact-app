import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postData } from '../../api/service';

const Login = () => {
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const formatPhoneNumber = (number) => {
    const cleaned = number.replace(/[^0-9]/g, '');
    if (cleaned.startsWith('08')) return '+62' + cleaned.slice(1);
    if (cleaned.startsWith('62')) return '+62' + cleaned.slice(2);
    if (cleaned.startsWith('8')) return '+62' + cleaned;
    if (cleaned.startsWith('628')) return '+' + cleaned;
    if (cleaned.startsWith('+628')) return cleaned;
    return '+62' + cleaned;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!whatsappNumber) {
      alert('Please enter your WhatsApp number');
      return;
    }

    const formattedPhone = formatPhoneNumber(whatsappNumber);
    const formData = { phoneNumber: formattedPhone };

    try {
      setIsLoading(true);
      const response = await postData('auth/login', formData);
      navigate('/verify', { state: { phoneNumber: formattedPhone } });
    } catch (error) {
      console.log(error)
      alert('Login gagal. Pastikan nomor valid atau coba lagi nanti.');
    } finally {
      setIsLoading(false);
    }
  };

  const dummyImage = 'https://beres-backend-609517395039.asia-southeast2.run.app/api/v1/file/review/6849aee0211fd6926c9a4b81';

  return (
    <div className="flex min-h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-blue-600 text-white flex flex-col items-center justify-center p-10">
        <div className="max-w-md text-center">
          <img src={dummyImage} alt="Mockup" className="mb-6 mx-auto" />
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
              disabled={isLoading}
            />
            <button
              type="submit"
              className={`w-full bg-blue-600 text-white py-2 rounded-lg transition ${
                isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Log in'}
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
