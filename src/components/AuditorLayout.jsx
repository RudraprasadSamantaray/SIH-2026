import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Chatbot from './Chatbot';

export default function AuditorLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const navItems = [
    { label: 'Audit Overview', icon: 'verified_user', path: '/auditor' },
    { label: 'Data Verification', icon: 'fact_check', path: '/auditor/data-verification' },
    { label: 'LCA Review', icon: 'eco', path: '/auditor/lca' },
    { label: 'Circularity Review', icon: 'rebase_edit', path: '/auditor/circularity' },
    { label: 'Transportation Review', icon: 'local_shipping', path: '/auditor/transportation' },
    { label: 'Scenario Review', icon: 'query_stats', path: '/auditor/scenarios' },
    { label: 'Recommendations Review', icon: 'lightbulb', path: '/auditor/recommendations' },
    { label: 'Reports', icon: 'assessment', path: '/auditor/reports' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-background font-body-md text-on-surface">
      {/* Auditor Sidebar Navigation */}
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
            <span className="material-symbols-outlined text-tertiary text-3xl" data-weight="fill">
              verified_user
            </span>
            <div>
              <h1 className="font-headline-md text-headline-md font-bold text-tertiary">EcoMetrix AI</h1>
              <p className="font-label-md text-label-md text-on-surface-variant font-semibold">Auditor Portal</p>
            </div>
          </div>

          <button
            onClick={() => setSidebarCollapsed(true)}
            className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-tertiary transition-colors cursor-pointer"
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

        {/* Auditor Navigation Links */}
        <nav className="flex-1 overflow-y-auto space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/auditor'}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-md px-md py-sm rounded transition-colors duration-200 ${
                  isActive
                    ? 'border-r-4 border-tertiary text-tertiary font-bold bg-surface-container-low'
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

        {/* Auditor User Card */}
        <div className="pt-md border-t border-outline-variant flex items-center justify-between px-sm">
          <div className="flex items-center gap-sm">
            <div className="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary-container font-bold flex items-center justify-center text-xs">
              {user?.name ? user.name.charAt(0) : 'A'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-on-surface truncate">{user?.name || 'Lead Auditor'}</p>
              <p className="text-[10px] text-tertiary font-bold capitalize">Auditor Role</p>
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
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-surface-container hover:bg-surface-container-high text-tertiary rounded-md border border-outline-variant transition-all font-semibold text-xs cursor-pointer shadow-sm"
                title="Expand Sidebar"
              >
                <span className="material-symbols-outlined text-lg">chevron_right</span>
                <span>Menu</span>
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-sm text-on-surface-variant hover:text-tertiary transition-colors"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>

            <nav className="flex items-center gap-md font-label-md text-label-md">
              <span className="text-on-surface-variant">Aluminium</span>
              <span className="text-outline-variant">/</span>
              <span className="text-on-surface-variant">Plant A-12</span>
              <span className="text-outline-variant">/</span>
              <span className="bg-tertiary-container/30 text-tertiary px-2 py-0.5 rounded font-bold uppercase text-[10px]">
                Auditor View
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-sm relative">
            <div className="relative">
              <button
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="p-sm text-on-surface-variant hover:text-tertiary rounded-full hover:bg-surface-container-low transition-all relative cursor-pointer"
              >
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-tertiary rounded-full"></span>
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-surface-container-lowest border border-outline-variant rounded-lg shadow-lg p-md z-50">
                  <h4 className="font-headline-sm text-xs font-bold text-on-surface mb-2 pb-1 border-b border-outline-variant">
                    Audit Notifications
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 bg-surface-bright rounded border border-outline-variant">
                      <p className="font-semibold text-tertiary">New Data Submission</p>
                      <p className="text-on-surface-variant">Plant A-12 submitted Q3 operational data for verification.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="p-sm text-on-surface-variant hover:text-tertiary rounded-full hover:bg-surface-container-low transition-all flex items-center gap-1 cursor-pointer"
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

        {/* Dynamic Auditor Outlet */}
        <main className="flex-1 mt-16 p-lg xl:p-xl transition-all duration-300 ease-in-out">
          <Outlet />
        </main>
      </div>

      <Chatbot />
    </div>
  );
}
