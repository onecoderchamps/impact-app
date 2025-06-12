import React, { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { postData } from '../../api/service';

const OTPVerification = () => {
  const [otp, setOtp] = useState(Array(4).fill(''));
  const [isLoading, setIsLoading] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location?.state?.phoneNumber;

  const handleChange = (index, value) => {
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputsRef.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join('');

    if (code.length < 4) {
      alert('Masukkan 4 digit kode OTP');
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
      if (idRole === 'KOL') {
        navigate('/AppKOL/dashboard');
      } else {
        alert('Role tidak dikenali. Hubungi admin.');
      }
    } catch (error) {
      console.error('OTP verification failed:', error);
      alert('Kode OTP salah atau kedaluwarsa.');
    } finally {
      setIsLoading(false);
    }
  };

  const dummyImage = 'https://beres-backend-609517395039.asia-southeast2.run.app/api/v1/file/review/6849aee0211fd6926c9a4b81';

  return (
    <div className="flex min-h-screen">
      {/* Left */}
      <div className="w-1/2 bg-blue-700 text-white flex flex-col justify-center items-center p-10">
        <div className="max-w-md text-center">
          <img src={dummyImage} alt="Mockup" className="mb-6 w-3/4 mx-auto" />
          <h1 className="text-3xl font-bold mb-4 text-center">OTP Verification</h1>
          <p className="text-center">Please enter the OTP sent to your WhatsApp to continue.</p>
        </div>
      </div>

      {/* Right */}
      <div className="w-1/2 bg-gray-100 flex justify-center items-center p-10">
        <form className="w-full max-w-sm text-center space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold">Enter OTP</h2>
          <p className="text-sm text-gray-600">
            We've sent an OTP code to <span className="font-medium">{phoneNumber}</span>
          </p>

          <div className="flex justify-center space-x-2">
            {otp.map((digit, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                inputMode="numeric"
                className="w-12 h-12 text-xl text-center border rounded focus:outline-blue-500"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(i, e.target.value)}
                onKeyDown={(e) => handleBackspace(i, e)}
                disabled={isLoading}
              />
            ))}
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-600 text-white font-semibold py-2 rounded transition ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            disabled={isLoading || otp.includes('')}
          >
            {isLoading ? 'Verifying...' : 'Verify'}
          </button>

          <p className="text-sm text-gray-600">
            Didn’t receive the code?{' '}
            <button type="button" className="text-blue-700 font-medium hover:underline" disabled={isLoading}>
              Resend
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
