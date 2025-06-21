import { useEffect, useState, useRef } from "react";
import { getData } from "../../../api/service";

export default function Header() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Memastikan pengguna sudah login
    const check = localStorage.getItem('accessToken');
    if (!check) {
      window.location.href = '/login'; // Redirect ke halaman login jika tidak ada token
    }

    const fetchUserData = async () => {
      try {
        const response = await getData("auth/verifySessions");
        if (response && response.data) { // Memastikan response.data ada
          setUser(response.data);
        } else {
          // Handle jika token tidak valid atau sesi kadaluarsa
          console.error("User data not found or session invalid. Logging out.");
          handleLogout(); 
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        // Pertimbangkan untuk logout jika terjadi error fetching data
        handleLogout();
      }
    };
    fetchUserData();
  }, []);

  // Close dropdown jika klik di luar area dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('role'); // Hapus juga role dan id
    localStorage.removeItem('id');
    window.location.href = '/login'; // Arahkan ke halaman login
  };

  return (
    <header className="bg-white shadow-lg p-4 flex justify-between items-center fixed left-64 right-0 top-0 z-50 transition-all duration-300 ease-in-out">
      {/* Title / Brand Section */}
      <div className="flex items-center">
        <h1 className="text-xl font-bold text-gray-800">
          Dashboard <span className="text-blue-600">Impact.ID</span>
        </h1>
        {user?.role && (
          <span className="ml-4 px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full shadow-sm">
            {user.role} Management
          </span>
        )}
      </div>

      {/* User Profile and Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center gap-3 cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setDropdownOpen((prev) => !prev)}
          aria-expanded={dropdownOpen} // Aksesibilitas
          aria-label="User menu"
        >
          <span className="font-semibold text-gray-700 text-base hidden md:block">
            Hi, {user?.fullName || 'Pengguna'}
          </span>
          <img
            src={user?.image || "https://via.placeholder.com/40/F0F0F0/808080?text=User"} // Placeholder jika gambar tidak ada
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-blue-500 shadow-md"
          />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-3 w-48 bg-white border border-gray-200 rounded-lg shadow-xl overflow-hidden z-50 animate-fade-in-down transform origin-top-right">
            <div className="p-4 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-800 truncate">{user?.fullName || 'Pengguna'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || 'N/A'}</p>
            </div>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        )}
      </div>

      {/* Tailwind CSS Custom Animations */}
      <style>{`
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
}