import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postData } from '../../api/service';

const Register = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("KOL");
  const [whatsapp, setWhatsapp] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const dummyImage = 'https://beres-backend-609517395039.asia-southeast2.run.app/api/v1/file/review/6849aee0211fd6926c9a4b81';

  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!whatsapp.trim()) {
      newErrors.whatsapp = "WhatsApp number is required";
    } else if (!/^(\+628|628|08)[0-9]{8,13}$/.test(whatsapp)) {
      newErrors.whatsapp = "Invalid phone number format";
    }

    if (!agree) {
      newErrors.agree = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatPhoneNumber = (number) => {
    const cleaned = number.replace(/[^0-9]/g, '');
    if (cleaned.startsWith('08')) return '+62' + cleaned.slice(1);
    if (cleaned.startsWith('628')) return '+' + cleaned;
    if (cleaned.startsWith('62')) return '+62' + cleaned.slice(2);
    if (cleaned.startsWith('+628')) return cleaned;
    return '+62' + cleaned;
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
      await postData("auth/register", formData);
      navigate("/login");
      alert("Pendaftaran Berhasil")
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left */}
      <div className="w-1/2 bg-blue-700 text-white flex flex-col justify-center items-center p-10">
        <div className="max-w-md text-center">
          <img src={dummyImage} alt="Mockup" className="mb-6 w-3/4 mx-auto" />
          <h1 className="text-3xl font-bold mb-4 text-center">
            One dashboard for all
          </h1>
          <p className="text-center max-w-sm">
            Create an account and get full access to all features for your marketing needs. Trusted by over 4,000 professionals.
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="w-1/2 bg-gray-100 flex justify-center items-center p-10">
        <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit} noValidate>
          <h2 className="text-2xl font-semibold mb-2">Get Started</h2>

          {/* Full Name */}
          <div>
            <label className="block font-medium mb-1">Full Name*</label>
            <input
              type="text"
              className={`w-full border rounded px-3 py-2 ${errors.fullName ? 'border-red-500' : ''}`}
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && <p className="text-sm text-red-500">{errors.fullName}</p>}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Email*</label>
            <input
              type="email"
              className={`w-full border rounded px-3 py-2 ${errors.email ? 'border-red-500' : ''}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block font-medium mb-1">WhatsApp Number*</label>
            <input
              type="text"
              className={`w-full border rounded px-3 py-2 ${errors.whatsapp ? 'border-red-500' : ''}`}
              placeholder="+6281515151515"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
            />
            {errors.whatsapp && <p className="text-sm text-red-500">{errors.whatsapp}</p>}
          </div>

          {/* Role */}
          <div>
            <label className="block font-medium mb-1">Role*</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="KOL">KOL</option>
              <option value="Brand">Brand</option>
            </select>
          </div>

          {/* Checkbox */}
          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              className="mt-1"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            <label className="text-sm">
              I understand and agree to the{' '}
              <a href="#" className="underline">terms of usage</a> and{' '}
              <a href="#" className="underline">privacy policy</a> of KOL.ID.
            </label>
          </div>
          {errors.agree && <p className="text-sm text-red-500">{errors.agree}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full text-white font-semibold py-2 rounded transition ${loading ? 'bg-blue-400 cursor-wait' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Sign up'}
          </button>

          {/* Navigation Links */}
          <p className="text-sm text-center mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-700 font-medium hover:underline">
              Sign in
            </Link>
          </p>
          <p className="text-sm text-center">
            Go back to{' '}
            <Link to="/" className="text-blue-700 font-medium hover:underline">
              Homepage
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
