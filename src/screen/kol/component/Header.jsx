import { useEffect, useState, useRef } from "react";
import { getData } from "../../../api/service";

export default function Header() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const check = localStorage.getItem('accessToken');
    if(!check)
    {
      window.location.href = '/login';
    }
    const fetchUserData = async () => {
      try {
        const response = await getData("auth/verifySessions");
        if (response) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };
    fetchUserData();
  }, []);

  // Close dropdown jika klik di luar
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
    window.location.href = '/login';
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center fixed left-64 right-0 top-0 z-10">
      <h1 className="text-lg font-bold">Status : {user?.role} Management</h1>
      <div className="relative" ref={dropdownRef}>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <span>Hi, {user?.fullName}</span>
          <img
            src={user?.image}
            alt="Profile"
            className="w-8 h-8 rounded-full bg-gray-400 object-cover"
          />
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow z-50">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
