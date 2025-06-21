import { NavLink, useLocation, useNavigate } from 'react-router-dom'; // Menambahkan useNavigate
import { useEffect, useState } from 'react';
import { getData } from '../../../api/service';

const menuItemsKOL = [ // Mengubah nama menjadi KOL agar lebih jelas
  { name: 'Beranda', path: '/appimpact/dashboard', icon: '🏠' },
  { name: 'Rate Card', path: '/appimpact/rate-card', icon: '📄' },
  {
    name: 'Kampanye', // Mengubah 'Campaigns' menjadi 'Kampanye' untuk konsistensi bahasa
    icon: '📢',
    children: [
      { name: 'Daftar Kampanye', path: '/appimpact/campaigns' }, // Mengubah 'Campaigns' menjadi 'Daftar Kampanye'
      { name: 'Kontrak', path: '/appimpact/contract' }, // Mengubah 'Contract' menjadi 'Kontrak'
    ],
  },
  {
    name: 'Dompet Digital', // Mengubah 'Digital Wallet' menjadi 'Dompet Digital'
    path: '/appimpact/wallet', // Path ini kemungkinan ke overview wallet, tapi children-nya yang lebih spesifik
    icon: '💼',
    children: [
      { name: 'Faktur', path: '/appimpact/invoice' }, // Mengubah 'Invoice' menjadi 'Faktur'
      { name: 'Saldo', path: '/appimpact/balance' }, // Mengubah 'Balance' menjadi 'Saldo'
    ],
  },
];

const menuItemsBrand = [
  { name: 'Beranda', path: '/appimpact/dashboardBrand', icon: '🏠' },
  {
    name: 'Kampanye', // Konsisten dengan Kampanye
    icon: '📢',
    children: [
      { name: 'Buat Kampanye Baru', path: '/appimpact/createCampaign' }, // Lebih eksplisit
      { name: 'Proyek Kampanye', path: '/appimpact/daftarCampaign' }, // Lebih eksplisit
    ],
  },
  {
    name: 'Pencarian Influencer', // Lebih eksplisit
    path: '/appimpact/PencarianInfluencer',
    icon: '🔍', // Mengubah ikon agar lebih relevan
  },
  {
    name: 'Tagihan', // Lebih deskriptif
    path: '/appimpact/wallet', // Path ini kemungkinan ke overview wallet, tapi children-nya yang lebih spesifik
    icon: '💳', // Mengubah ikon agar lebih relevan
    children: [
      { name: 'Faktur', path: '/appimpact/invoice' },
      { name: 'Saldo', path: '/appimpact/balance' },
    ],
  },
];

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState({});
  const location = useLocation();
  const navigate = useNavigate(); // Inisialisasi useNavigate
  const [user, setUser] = useState(null);

  // Fungsi untuk membuka/menutup menu dropdown
  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // Efek untuk mengambil data pengguna dan mengelola otentikasi
  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        navigate('/login'); // Arahkan ke halaman login jika tidak ada token
        return;
      }

      try {
        const response = await getData("auth/verifySessions");
        if (response && response.data) {
          setUser(response.data);
          // Otomatis membuka menu yang sedang aktif jika ada sub-menu
          if (response.data.role === "KOL") {
            menuItemsKOL.forEach(item => {
              if (item.children && item.children.some(child => location.pathname.startsWith(child.path))) {
                setOpenMenus(prev => ({ ...prev, [item.name]: true }));
              }
            });
          } else if (response.data.role === "Brand") {
            menuItemsBrand.forEach(item => {
              if (item.children && item.children.some(child => location.pathname.startsWith(child.path))) {
                setOpenMenus(prev => ({ ...prev, [item.name]: true }));
              }
            });
          }
        } else {
          // Token ada tapi tidak valid/sesi berakhir
          console.error("User data not found or session invalid. Logging out.");
          localStorage.removeItem('accessToken');
          localStorage.removeItem('role');
          localStorage.removeItem('id');
          navigate('/login');
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('role');
        localStorage.removeItem('id');
        navigate('/login');
      }
    };
    checkAuth();
  }, [location.pathname, navigate]); // Tambahkan location.pathname dan navigate sebagai dependency

  // Fungsi untuk mengecek apakah path aktif (untuk single item atau parent menu)
  const isActivePath = (path) => {
    return location.pathname.startsWith(path);
  };

  // Render menu item
  const renderMenuItem = (item) => {
    const isParentActive = item.children && item.children.some(child => isActivePath(child.path));
    const isOpen = openMenus[item.name] || isParentActive;

    if (item.children) {
      return (
        <div key={item.name} className="relative">
          <button
            onClick={() => toggleMenu(item.name)}
            className={`flex items-center justify-between w-full px-4 py-2 text-gray-700 rounded-lg transition-all duration-200 
                        hover:bg-blue-50 hover:text-blue-700 
                        ${isParentActive ? 'bg-blue-100 text-blue-700 font-semibold shadow-sm' : ''}`}
            aria-expanded={isOpen}
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{item.icon}</span> {/* Ukuran ikon */}
              <span className="text-base font-medium">{item.name}</span>
            </div>
            <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </span>
          </button>
          {isOpen && (
            <div className="pl-6 mt-1 space-y-1 border-l-2 border-blue-200 ml-4"> {/* Indentasi dan border */}
              {item.children.map((subItem) => (
                <NavLink
                  key={subItem.name}
                  to={subItem.path}
                  className={({ isActive }) =>
                    `block px-3 py-2 text-sm rounded-lg transition-all duration-200 
                    ${isActive ? 'bg-blue-200 text-blue-800 font-semibold' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-800'}`
                  }
                >
                  {subItem.name}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      );
    }

    return (
      <NavLink
        key={item.name}
        to={item.path}
        className={({ isActive }) =>
          `flex items-center space-x-3 px-4 py-2 text-gray-700 rounded-lg transition-all duration-200 
          hover:bg-blue-50 hover:text-blue-700 
          ${isActive ? 'bg-blue-100 text-blue-700 font-semibold shadow-sm' : ''}`
        }
      >
        <span className="text-xl">{item.icon}</span> {/* Ukuran ikon */}
        <span className="text-base font-medium">{item.name}</span>
      </NavLink>
    );
  };

  const currentMenuItems = user?.role === "Brand" ? menuItemsBrand : menuItemsKOL;

  return (
    <aside className="w-64 h-screen bg-white shadow-xl fixed top-0 left-0 overflow-y-auto transform transition-transform duration-300 ease-in-out z-40">
      <div className="p-5 border-b border-gray-100 mb-4">
        <h1 className="text-3xl font-extrabold text-blue-700 animate-fade-in-down">
          Impact.<span className="text-purple-600">ID</span>
        </h1>
      </div>
      
      <nav className="flex flex-col space-y-2 px-4">
        {user ? (
          currentMenuItems.map(renderMenuItem)
        ) : (
          <div className="p-4 text-center text-gray-500">Memuat menu...</div>
        )}
      </nav>
    </aside>
  );
}