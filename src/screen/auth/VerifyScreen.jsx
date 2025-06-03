import React, { useRef, useState } from 'react';

const OTPVerification = ({ phoneNumber = '+628157838322' }) => {
  const [otp, setOtp] = useState(Array(6).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!isNaN(value) && value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move to next input
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join('');
    console.log('Verifying OTP:', code);
    // Call verification logic here
  };

  return (
    <div className="flex min-h-screen">
      {/* Left */}
      <div className="w-1/2 bg-blue-700 text-white flex flex-col justify-center items-center p-10">
        <img src="/logo.svg" alt="KOL.ID" className="mb-6" />
        <h1 className="text-3xl font-bold mb-4 text-center">OTP Verification</h1>
        <p className="text-center">Please enter the OTP sent to your WhatsApp to continue.</p>
      </div>

      {/* Right */}
      <div className="w-1/2 bg-gray-100 flex justify-center items-center p-10">
        <form className="w-full max-w-sm text-center space-y-6" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold">Enter OTP</h2>
          <p className="text-sm text-gray-600">We've sent an OTP code to <span className="font-medium">{phoneNumber}</span></p>

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
              />
            ))}
          </div>

          <button
            onPress={() => window.location.href = '/'}
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
            disabled={otp.includes('')}
            
          >
            Verify
          </button>

          <p className="text-sm text-gray-600">
            Didn’t receive the code? <button type="button" className="text-blue-700 font-medium hover:underline">Resend</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;
