import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postData } from '../../api/service'; // Pastikan path ini benar

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
    return '+62' + cleaned; // Default fallback, though should ideally be handled more robustly
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!whatsappNumber) {
      alert('Mohon masukkan nomor WhatsApp Anda.');
      return;
    }

    const formattedPhone = formatPhoneNumber(whatsappNumber);
    const formData = { phoneNumber: formattedPhone };

    try {
      setIsLoading(true);
      // Ganti dengan endpoint API Impact.ID yang sebenarnya
      const response = await postData('auth/login', formData); 
      console.log('Login successful:', response); // Untuk debugging
      navigate('/verify', { state: { phoneNumber: formattedPhone } });
    } catch (error) {
      console.error('Login error:', error); // Log error lebih detail
      alert(`Login gagal. Mohon periksa nomor WhatsApp Anda atau coba lagi. Detail: ${error.message || 'Terjadi kesalahan tidak dikenal.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Ganti dengan gambar brand Anda, atau ilustrasi yang relevan dengan Impact.ID
  const brandIllustration = 'https://beres-backend-609517395039.asia-southeast2.run.app/api/v1/file/review/6849aee0211fd6926c9a4b81'; 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 md:p-8">
      <div className="flex w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-scale">
        {/* Left Side - Ilustrasi/Branding */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 to-purple-700 text-white flex-col items-center justify-center p-12 relative overflow-hidden">
          {/* Latar belakang abstrak / pola */}
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          
          <div className="z-10 text-center">
            <h1 className="text-5xl font-extrabold mb-4 leading-tight drop-shadow-md">
              Selamat Datang Kembali di <br />
              <span className="text-yellow-300">Impact.ID</span>
            </h1>
            <p className="text-lg mb-8 opacity-90 leading-relaxed max-w-sm mx-auto">
              Masuk untuk melanjutkan perjalanan kolaborasi Anda dan ciptakan dampak yang lebih besar bersama para KOL terbaik.
            </p>
            <img 
              src={brandIllustration} 
              alt="Welcome Illustration" 
              className="mt-10 max-w-[80%] h-auto mx-auto rounded-xl shadow-lg transform translate-y-2" // Sedikit transisi untuk visual
            />
          </div>
        </div>

        {/* Right Side - Form Login */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16">
          <div className="w-full max-w-sm">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Login</h2>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="whatsappNumber" className="block text-base font-semibold text-gray-700 mb-2">
                  Nomor WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  id="whatsappNumber"
                  type="text"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                  placeholder="+628123456789"
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                  disabled={isLoading}
                  required
                />
              </div>
              
              <button
                type="submit"
                className={`w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 
                  ${isLoading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-0.5'}`
                }
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memuat...
                  </>
                ) : (
                  'Masuk'
                )}
              </button>
            </form>

            <p className="mt-8 text-center text-base text-gray-600">
              Belum punya akun?{' '}
              <Link to="/register" className="text-blue-600 font-semibold hover:underline hover:text-blue-700 transition-colors duration-200">
                Daftar di sini
              </Link>
            </p>
            <p className="mt-3 text-center text-base text-gray-600">
              Kembali ke{' '}
              <Link to="/" className="text-blue-600 font-semibold hover:underline hover:text-blue-700 transition-colors duration-200">
                Beranda
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Tailwind CSS Custom Animations and background pattern */}
      <style>{`
        @keyframes fadeInScale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fadeInScale 0.5s ease-out forwards;
        }
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'%3E%3Cpath d='M5 0h1L0 6V5zM6 5v1H5z'/%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>
    </div>
  );
};

export default Login;