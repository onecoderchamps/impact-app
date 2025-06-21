import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom'; // Menambahkan Link
import { postData } from '../../api/service'; // Pastikan path ini benar

const OTPVerification = () => {
  const [otp, setOtp] = useState(Array(4).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false); // State untuk tombol resend
  const [countdown, setCountdown] = useState(60); // Countdown untuk resend OTP
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location?.state?.phoneNumber;

  // Efek untuk fokus otomatis pada input pertama saat komponen dimuat
  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, []);

  // Efek untuk countdown resend OTP
  useEffect(() => {
    let timer;
    if (isResending && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsResending(false);
      setCountdown(60); // Reset countdown
    }
    return () => clearTimeout(timer);
  }, [isResending, countdown]);

  const handleChange = (index, value) => {
    if (!isNaN(value) && value.length <= 1) { // Hanya angka dan satu karakter
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Otomatis pindah fokus ke input selanjutnya
      if (value && index < inputsRef.current.length - 1) { // Perbaiki index batas akhir
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    } else if (e.key === 'Backspace' && otp[index]) { // Jika ada digit, hapus digit itu dulu
      const newOtp = [...otp];
      newOtp[index] = '';
      setOtp(newOtp);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim();
    if (pasteData.length === 4 && !isNaN(pasteData)) {
      const newOtp = pasteData.split('');
      setOtp(newOtp);
      // Fokus ke input terakhir setelah paste
      inputsRef.current[3].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join('');

    if (code.length < 4) {
      alert('Mohon masukkan 4 digit kode OTP Anda.'); // Pesan lebih user-friendly
      return;
    }

    if (!phoneNumber) {
      alert('Nomor WhatsApp tidak ditemukan. Mohon kembali ke halaman sebelumnya.');
      navigate('/login'); // Arahkan kembali jika nomor tidak ada
      return;
    }

    try {
      setIsLoading(true);
      const response = await postData('otp/validateWA', {
        phonenumber: phoneNumber,
        code: code,
      });
      const { accessToken, idRole, id } = response.message;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('role', idRole);
      localStorage.setItem('id', id);
      navigate('/appimpact'); // Ganti dengan rute dashboard aplikasi Anda
    } catch (error) {
      console.error('Verifikasi OTP gagal:', error); // Log error lebih detail
      alert('Kode OTP salah atau kedaluwarsa. Mohon coba lagi.'); // Pesan lebih user-friendly
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (isResending) return; // Jangan resend jika countdown masih jalan

    setIsResending(true);
    setCountdown(60); // Mulai countdown

    try {
      setIsLoading(true);
      // Ganti dengan endpoint resend OTP Anda
      await postData('auth/resendOTP', { phoneNumber: phoneNumber });
      alert('Kode OTP baru telah dikirimkan ke WhatsApp Anda.');
    } catch (error) {
      console.error('Gagal mengirim ulang OTP:', error);
      alert('Gagal mengirim ulang kode OTP. Mohon coba beberapa saat lagi.');
      setIsResending(false); // Hentikan countdown jika gagal
      setCountdown(60); // Reset countdown
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
            <h1 className="text-2xl font-extrabold mb-4 leading-tight drop-shadow-md">
              Verifikasi Akun Anda di <br />
              <span className="text-yellow-300">Impact.ID</span>
            </h1>
            <p className="text-lg mb-8 opacity-90 leading-relaxed max-w-sm mx-auto">
              Langkah terakhir menuju kolaborasi berdampak! Masukkan kode OTP yang kami kirimkan ke WhatsApp Anda.
            </p>
          </div>
        </div>

        {/* Right Side - Form OTP */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 md:p-16">
          <div className="w-full max-w-sm text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Verifikasi Kode</h2>
            
            <p className="text-base text-gray-600 mb-8 leading-relaxed">
              Kami telah mengirimkan kode verifikasi 4 digit ke WhatsApp Anda di <br />
              <span className="font-semibold text-gray-800">{phoneNumber || 'nomor Anda'}</span>
            </p>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex justify-center space-x-3"> {/* Jarak antar input */}
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputsRef.current[i] = el)}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code" // Untuk autofill OTP di mobile
                    className="w-14 h-14 text-3xl font-bold text-center border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(i, e.target.value)}
                    onKeyDown={(e) => handleBackspace(i, e)}
                    onPaste={i === 0 ? handlePaste : undefined} // Hanya paste di input pertama
                    disabled={isLoading}
                  />
                ))}
              </div>

              <button
                type="submit"
                className={`w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-bold rounded-xl shadow-lg transition-all duration-300 
                  ${isLoading ? 'opacity-60 cursor-not-allowed' : 'hover:bg-blue-700 hover:shadow-xl transform hover:-translate-y-0.5'}`
                }
                disabled={isLoading || otp.includes('')} // Disable jika ada input kosong
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memverifikasi...
                  </>
                ) : (
                  'Verifikasi'
                )}
              </button>
            </form>

            <p className="mt-8 text-base text-gray-600">
              Tidak menerima kode?{' '}
              <button
                type="button"
                onClick={handleResendOtp}
                className={`font-semibold transition-colors duration-200
                  ${isResending ? 'text-gray-500 cursor-not-allowed' : 'text-blue-600 hover:underline hover:text-blue-700'}`
                }
                disabled={isResending || isLoading}
              >
                {isResending ? `Kirim ulang dalam ${countdown}s` : 'Kirim Ulang OTP'}
              </button>
            </p>
            <p className="mt-3 text-base text-gray-600">
              Kembali ke{' '}
              <Link to="/login" className="text-blue-600 font-semibold hover:underline hover:text-blue-700 transition-colors duration-200">
                Login
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

export default OTPVerification;