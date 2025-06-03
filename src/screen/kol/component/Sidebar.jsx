import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';

const menuItems = [
  { name: 'Beranda', path: '/AppKOL/dashboard', icon: '🏠' },
  { name: 'Rate Card', path: '/AppKOL/rate-card', icon: '📄' },
  {
    name: 'Campaigns',
    icon: '📢',
    children: [
      { name: 'Campaigns', path: '/AppKOL/campaigns' },
      { name: 'Contract', path: '/AppKOL/contract' },
    ],
  },
  {
    name: 'Digital Wallet',
    path: '/AppKOL/wallet',
    icon: '💼',
    children: [
      { name: 'Invoice', path: '/AppKOL/invoice' },
      { name: 'Balance', path: '/AppKOL/balance' },
    ],
  },
];

export default function Sidebar() {
  const [openMenus, setOpenMenus] = useState({});
  const location = useLocation();

  const toggleMenu = (name) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const isActivePath = (path) => location.pathname === path;

  return (
    <aside className="w-64 h-screen bg-white shadow fixed top-0 left-0 overflow-y-auto">
      <div className="p-4 text-2xl font-bold text-purple-600">Impact KOL</div>
      <nav className="flex flex-col space-y-2 p-4">
        {menuItems.map((item) => {
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
        })}
      </nav>
    </aside>
  );
}
