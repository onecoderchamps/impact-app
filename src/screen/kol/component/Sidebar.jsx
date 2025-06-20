import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getData } from '../../../api/service';

const menuItems = [
  { name: 'Beranda', path: '/appimpact/dashboard', icon: '🏠' },
  { name: 'Rate Card', path: '/appimpact/rate-card', icon: '📄' },
  {
    name: 'Campaigns',
    icon: '📢',
    children: [
      { name: 'Campaigns', path: '/appimpact/campaigns' },
      { name: 'Contract', path: '/appimpact/contract' },
    ],
  },
  {
    name: 'Digital Wallet',
    path: '/appimpact/wallet',
    icon: '💼',
    children: [
      { name: 'Invoice', path: '/appimpact/invoice' },
      { name: 'Balance', path: '/appimpact/balance' },
    ],
  },
];

const menuItemsBrand = [
  { name: 'Beranda', path: '/appimpact/dashboardBrand', icon: '🏠' },
  {
    name: 'Campaigns',
    icon: '📢',
    children: [
      { name: 'Buat Baru', path: '/appimpact/createCampaign' },
      { name: 'Proyek', path: '/appimpact/daftarCampaign' },
    ],
  },
  {
    name: 'Influencer',
    path: '/appimpact/PencarianInfluencer',
    icon: '💼',
  },
  {
    name: 'Tagihan',
    path: '/appimpact/wallet',
    icon: '📄',
    children: [
      { name: 'Invoice', path: '/appimpact/invoice' },
      { name: 'Balance', path: '/appimpact/balance' },
    ],
  },
];

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState({});
  const location = useLocation();
  const [user, setUser] = useState(null);

  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  useEffect(() => {
    const check = localStorage.getItem('accessToken');
    if (!check) {
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

  const isActivePath = (path) => location.pathname === path;

  return (
    <aside className="w-64 h-screen bg-white shadow fixed top-0 left-0 overflow-y-auto">
      <div className="p-4 text-2xl font-bold text-purple-600">Impact KOL</div>
      {user?.role === "KOL" &&
        <nav className="flex flex-col space-y-2 p-4">
          {
            menuItems.map((item) => {
              if (item.children) {
                const isOpen = openMenus[item.name] || item.children.some(child => isActivePath(child.path));
                return (
                  <div key={item.name}>
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded hover:bg-purple-100 'text-gray-700'`}
                    >
                      <div className="flex items-center space-x-3">
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                      </div>
                      <span>{isOpen ? '▲' : '▼'}</span>
                    </button>
                    {isOpen && (
                      <div className="pl-8 mt-1 space-y-1">
                        {item.children.map((subItem) => (
                          <NavLink
                            key={subItem.name}
                            to={subItem.path}
                            className={({ isActive }) =>
                              `block px-2 py-1 rounded hover:bg-purple-100 ${isActive ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-600'
                              }`
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
                    `flex items-center space-x-3 px-3 py-2 rounded hover:bg-purple-100 ${isActive ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-700'
                    }`
                  }
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              );
            })
          }
        </nav>
      }
      {user?.role === "Brand" &&
        <nav className="flex flex-col space-y-2 p-4">
          {
            menuItemsBrand.map((item) => {
              if (item.children) {
                const isOpen = openMenus[item.name] || item.children.some(child => isActivePath(child.path));
                return (
                  <div key={item.name}>
                    <button
                      onClick={() => toggleMenu(item.name)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded hover:bg-purple-100 'text-gray-700'`}
                    >
                      <div className="flex items-center space-x-3">
                        <span>{item.icon}</span>
                        <span>{item.name}</span>
                      </div>
                      <span>{isOpen ? '▲' : '▼'}</span>
                    </button>
                    {isOpen && (
                      <div className="pl-8 mt-1 space-y-1">
                        {item.children.map((subItem) => (
                          <NavLink
                            key={subItem.name}
                            to={subItem.path}
                            className={({ isActive }) =>
                              `block px-2 py-1 rounded hover:bg-purple-100 ${isActive ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-600'
                              }`
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
                    `flex items-center space-x-3 px-3 py-2 rounded hover:bg-purple-100 ${isActive ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-700'
                    }`
                  }
                >
                  <span>{item.icon}</span>
                  <span>{item.name}</span>
                </NavLink>
              );
            })
          }
        </nav>
      }
    </aside>
  );
}
