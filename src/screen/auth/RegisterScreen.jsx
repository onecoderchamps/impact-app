import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const provinceData = {
  "Jawa Barat": ["Bandung", "Bekasi", "Bogor"],
  "Jawa Tengah": ["Semarang", "Solo", "Purwokerto"],
  "DKI Jakarta": ["Jakarta Selatan", "Jakarta Timur", "Jakarta Pusat"]
};

const Register = () => {
  const [role, setRole] = useState("KOL");
  const [whatsapp, setWhatsapp] = useState("");
  const [province, setProvince] = useState("");
  const [regency, setRegency] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleProvinceChange = (e) => {
    setProvince(e.target.value);
    setRegency("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!whatsapp || !province || !regency || !agree) {
      alert("Semua field harus diisi dan kamu harus menyetujui syaratnya.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, whatsapp, province, regency }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registrasi berhasil!");
        navigate("/login"); // redirect ke login
      } else {
        alert(data.message || "Registrasi gagal");
      }
    } catch (err) {
      alert("Terjadi kesalahan saat registrasi.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const dummyLogo = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGh5WFH8TOIfRKxUrIgJZoDCs1yvQ4hIcppw&s';

  return (
    <div className="flex min-h-screen">
      {/* Left */}
      <div className="w-1/2 bg-blue-700 text-white flex flex-col justify-center items-center p-10">
        <img src={dummyLogo} alt="KOL.ID" className="mb-6 w-32 h-32 object-contain" />
        <h1 className="text-3xl font-bold mb-4 text-center">One dashboard for all your influencer marketing needs</h1>
        <p className="text-center max-w-sm">
          Create an account and get full access to all features for your marketing needs. Trusted by over 4,000 professionals.
        </p>
      </div>

      {/* Right */}
      <div className="w-1/2 bg-gray-100 flex justify-center items-center p-10">
        <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold mb-2">Get Started</h2>

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

          {/* WhatsApp */}
          <div>
            <label className="block font-medium mb-1">WhatsApp Number*</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              placeholder="+6281515151515"
              value={whatsapp}
              onChange={(e) => setWhatsapp(e.target.value)}
              required
            />
          </div>

          {/* Province */}
          <div>
            <label className="block font-medium mb-1">Province</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={province}
              onChange={handleProvinceChange}
            >
              <option value="">Please Select Province</option>
              {Object.keys(provinceData).map((prov) => (
                <option key={prov} value={prov}>{prov}</option>
              ))}
            </select>
          </div>

          {/* Regency */}
          <div>
            <label className="block font-medium mb-1">Regency</label>
            <select
              className="w-full border rounded px-3 py-2"
              value={regency}
              onChange={(e) => setRegency(e.target.value)}
              disabled={!province}
            >
              <option value="">{province ? "Please Select Regency" : "Please Select Province First"}</option>
              {province &&
                provinceData[province].map((reg) => (
                  <option key={reg} value={reg}>{reg}</option>
                ))}
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
              I understand and agree to the <a href="#" className="underline">terms of usage</a> and <a href="#" className="underline">privacy policy</a> of KOL.ID.
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!agree || loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded disabled:opacity-50"
          >
            {loading ? "Processing..." : "Sign up"}
          </button>

          {/* Navigation Links */}
          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-700 font-medium hover:underline">
              Sign in
            </Link>
          </p>
          <p className="text-sm text-center">
            Go back to{" "}
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
