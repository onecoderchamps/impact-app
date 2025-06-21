import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postData } from '../../api/service'; // Pastikan path ini benar

const Register = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("KOL");
  const [whatsapp, setWhatsapp] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Ganti dengan gambar brand Anda, atau ilustrasi yang relevan dengan Impact.ID
  const brandIllustration = 'https://beres-backend-609517395039.asia-southeast2.run.app/api/v1/file/review/6849aee0211fd6926c9a4b81';

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Nama lengkap wajib diisi.";
    }

    if (!email.trim()) {
      newErrors.email = "Email wajib diisi.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Format email tidak valid.";
    }

    if (!whatsapp.trim()) {
      newErrors.whatsapp = "Nomor WhatsApp wajib diisi.";
    } else if (!/^(\+628|628|08)[0-9]{8,13}$/.test(whatsapp)) { // Regex ini bisa diperketat sesuai kebutuhan
      newErrors.whatsapp = "Format nomor telepon tidak valid. Gunakan format +628...";
    }

    if (!agree) {
      newErrors.agree = "Anda harus menyetujui syarat & ketentuan.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (number) => {
    const cleaned = number.replace(/[^0-9]/g, '');
    if (cleaned.startsWith('08')) return '+62' + cleaned.slice(1);
    if (cleaned.startsWith('628')) return '+' + cleaned;
    if (cleaned.startsWith('62')) return '+62' + cleaned.slice(2); // In case they type 628...
    if (cleaned.startsWith('+628')) return cleaned;
    return '+62' + cleaned; // Default fallback, ensure it always starts with +62
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = {
      fullName,
      email,
      phoneNumber: formatPhoneNumber(whatsapp),
      idRole: role,
    };

    try {
      setLoading(true);
      // Ganti dengan endpoint API Impact.ID yang sebenarnya
      const response = await postData("auth/register", formData);
      console.log('Registration successful:', response); // Untuk debugging
      alert("Pendaftaran berhasil! Silakan login."); // Mengubah alert untuk konsistensi
      navigate("/login");
    } catch (err) {
      console.error('Registration error:', err); // Log error lebih detail
      alert(`Pendaftaran gagal. Detail: ${err.message || 'Terjadi kesalahan tidak dikenal.'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 md:p-8">
      <div className="flex w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in-scale">
        {/* Left Side - Ilustrasi/Branding */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 to-purple-700 text-white flex-col items-center justify-center p-12 relative overflow-hidden">
          {/* Latar belakang abstrak / pola */}
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          
          <div className="z-10 text-center">
            <h1 className="text-5xl font-extrabold mb-4 leading-tight drop-shadow-md">
              Bergabunglah dengan <br />
              <span className="text-yellow-300">Impact.ID</span> Sekarang!
            </h1>
            <p className="text-lg mb-8 opacity-90 leading-relaxed max-w-sm mx-auto">
              Daftar untuk mendapatkan akses penuh ke platform terpadu kami dan mulai maksimalkan kolaborasi *influencer* Anda.
            </p>
            <img 
              src={brandIllustration} 
              alt="Register Illustration" 
              className="mt-10 max-w-[80%] h-auto mx-auto rounded-xl shadow-lg transform translate-y-2" // Sedikit transisi untuk visual
            />
          </div>
        </div>

        {/* Right Side - Form Register */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16">
          <div className="w-full max-w-sm">
            <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">Daftar</h2>
            
            <form className="space-y-6" onSubmit={handleSubmit} noValidate>
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-base font-semibold text-gray-700 mb-2">
                  Nama Lengkap <span className="text-red-500">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  className={`w-full px-5 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg
                    ${errors.fullName ? 'border-red-500' : 'border-gray-300'}`}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
                {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-base font-semibold text-gray-700 mb-2">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  className={`w-full px-5 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg
                    ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
              </div>

              {/* WhatsApp */}
              <div>
                <label htmlFor="whatsapp" className="block text-base font-semibold text-gray-700 mb-2">
                  Nomor WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  id="whatsapp"
                  type="text"
                  className={`w-full px-5 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg
                    ${errors.whatsapp ? 'border-red-500' : 'border-gray-300'}`}
                  placeholder="+6281515151515"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  required
                />
                {errors.whatsapp && <p className="text-sm text-red-500 mt-1">{errors.whatsapp}</p>}
              </div>

              {/* Role */}
              <div>
                <label htmlFor="role" className="block text-base font-semibold text-gray-700 mb-2">
                  Daftar Sebagai <span className="text-red-500">*</span>
                </label>
                <select
                  id="role"
                  className="w-full px-5 py-3 border border-gray-300 rounded-xl shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 text-lg"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="KOL">KOL</option>
                  <option value="Brand">Brand</option>
                </select>
              </div>

              {/* Checkbox Persetujuan */}
              <div className="flex items-start mt-6">
                <input
                  id="agree"
                  type="checkbox"
                  className={`mt-1 mr-2 rounded text-blue-600 focus:ring-blue-500 ${errors.agree ? 'border-red-500' : 'border-gray-300'}`}
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  required
                />
                <label htmlFor="agree" className="text-sm text-gray-700 leading-relaxed">
                  Saya memahami dan menyetujui{' '}
                  <a href="#" className="text-blue-600 font-semibold hover:underline hover:text-blue-700 transition-colors duration-200">
                    syarat penggunaan
                  </a>{' '}
                  dan{' '}
                  <a href="#" className="text-blue-600 font-semibold hover:underline hover:text-blue-700 transition-colors duration-200">
                    kebijakan privasi
                  </a>{' '}
                  Impact.ID.
                </label>
              </div>
              {errors.agree && <p className="text-sm text-red-500 mt-1">{errors.agree}</p>}

              {/* Tombol Submit */}
              <button
                type="submit"
                className={`w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 
                  ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-0.5'}`
                }
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Mendaftar...
                  </>
                ) : (
                  'Daftar Sekarang'
                )}
              </button>
            </form>

            {/* Link Navigasi */}
            <p className="mt-8 text-center text-base text-gray-600">
              Sudah punya akun?{' '}
              <Link to="/login" className="text-blue-600 font-semibold hover:underline hover:text-blue-700 transition-colors duration-200">
                Masuk di sini
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

export default Register;