import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Chatbot from './Chatbot';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { label: 'Admin Overview', icon: 'admin_panel_settings', path: '/admin' },
    { label: 'Plants', icon: 'domain', path: '/admin/plants' },
    { label: 'Analysis Status', icon: 'analytics', path: '/admin/analysis' },
    { label: 'Audit Status', icon: 'verified', path: '/admin/audit' },
    { label: 'Reports', icon: 'assessment', path: '/admin/reports' },
    { label: 'User Roles', icon: 'manage_accounts', path: '/admin/users' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-background font-body-md text-on-surface">
      {/* Admin Sidebar Navigation */}
      <aside
        className={`fixed left-0 top-0 h-screen w-[260px] bg-surface-container-lowest border-r border-outline-variant flex flex-col py-lg px-md z-50 transition-all duration-300 ease-in-out shadow-md ${
          mobileMenuOpen
            ? 'translate-x-0'
            : sidebarCollapsed
            ? '-translate-x-full'
            : 'translate-x-0'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mb-xl px-sm">
          <div className="flex items-center gap-sm">
            <span className="material-symbols-outlined text-secondary text-3xl" data-weight="fill">
              admin_panel_settings
            </span>
            <div>
              <h1 className="font-headline-md text-headline-md font-bold text-secondary">EcoMetrix AI</h1>
              <p className="font-label-md text-label-md text-on-surface-variant font-semibold">Admin Console</p>
            </div>
          </div>

          <button
            onClick={() => setSidebarCollapsed(true)}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-secondary transition-colors cursor-pointer"
            title="Collapse Sidebar"
          >
            <span className="material-symbols-outlined text-xl">chevron_left</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(false)}
            className="md:hidden text-on-surface-variant hover:text-on-surface"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Admin Navigation Links */}
        <nav className="flex-1 overflow-y-auto space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-md px-md py-sm rounded transition-colors duration-200 ${
                  isActive
                    ? 'border-r-4 border-secondary text-secondary font-bold bg-surface-container-low'
                    : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="material-symbols-outlined" data-weight={isActive ? 'fill' : undefined}>
                    {item.icon}
                  </span>
                  <span className="font-body-md text-body-md">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Admin User Card */}
        <div className="pt-md border-t border-outline-variant flex items-center justify-between px-sm">
          <div className="flex items-center gap-sm">
            <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container font-bold flex items-center justify-center text-xs">
              {user?.name ? user.name.charAt(0) : 'M'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-on-surface truncate">{user?.name || 'System Admin'}</p>
              <p className="text-[10px] text-secondary font-bold capitalize">Administrator</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Sign Out"
            className="text-on-surface-variant hover:text-error transition-colors p-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'md:ml-0' : 'md:ml-[260px]'
        }`}
      >
        {/* Top Header */}
        <header
          className={`fixed top-0 right-0 h-16 bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center px-lg z-40 transition-all duration-300 ease-in-out ${
            sidebarCollapsed
              ? 'w-full left-0'
              : 'w-full md:w-[calc(100%-260px)] md:left-[260px]'
          }`}
        >
          <div className="flex items-center gap-md">
            {sidebarCollapsed && (
              <button
                onClick={() => setSidebarCollapsed(false)}
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-secondary rounded-md border border-outline-variant transition-all font-semibold text-xs cursor-pointer shadow-sm"
                title="Expand Sidebar"
              >
                <span className="material-symbols-outlined text-lg">chevron_right</span>
                <span>Menu</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-sm text-on-surface-variant hover:text-secondary transition-colors"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>

            <nav className="flex items-center gap-md font-label-md text-label-md">
              <span className="text-on-surface-variant">EcoMetrix Global</span>
              <span className="text-outline-variant">/</span>
              <span className="text-on-surface-variant">All Facilities</span>
              <span className="text-outline-variant">/</span>
              <span className="bg-secondary-container/40 text-secondary px-2 py-0.5 rounded font-bold uppercase text-[10px]">
                Admin Console
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-sm relative">
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="p-sm text-on-surface-variant hover:text-secondary rounded-full hover:bg-surface-container-low transition-all flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined">account_circle</span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg py-1 z-50 text-xs">
                  <div className="px-4 py-2 border-b border-outline-variant">
                    <p className="font-semibold text-on-surface">{user?.name}</p>
                    <p className="text-on-surface-variant truncate">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-error hover:bg-surface-container-low transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">logout</span>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Admin Outlet */}
        <main className="flex-1 mt-16 p-lg xl:p-xl transition-all duration-300 ease-in-out">
          <Outlet />
        </main>
      </div>

      <Chatbot />
    </div>
  );
}
