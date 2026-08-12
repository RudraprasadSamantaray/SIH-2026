import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [role, setRole] = useState('engineer');
  const [email, setEmail] = useState('engineer@company.com');
  const [password, setPassword] = useState('••••••••');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password, role);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-md">
      <div className="w-full max-w-md bg-surface-container-lowest border border-[#E5E7EB] p-xl rounded-lg shadow-sm">
        <div className="text-center mb-xl">
          <div className="flex justify-center items-center gap-2 mb-sm">
            <span className="material-symbols-outlined text-primary text-4xl" data-weight="fill">
              eco
            </span>
            <h1 className="font-display text-display text-primary">EcoMetrix AI</h1>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Life Cycle Assessment &amp; Circularity Platform
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-md">
            <label className="block font-label-md text-label-md text-on-surface mb-xs uppercase" htmlFor="role">
              Select Role
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none bg-surface-container-lowest border border-[#D1D5DB] rounded focus:border-primary focus:ring-0 font-body-md text-body-md text-on-surface py-sm px-md pr-xl"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="engineer">Engineer</option>
                <option value="admin">Admin</option>
                <option value="auditor">Auditor</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-body-lg">arrow_drop_down</span>
              </div>
            </div>
          </div>

          <div className="mb-md">
            <label className="block font-label-md text-label-md text-on-surface mb-xs uppercase" htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full bg-surface-container-lowest border border-[#D1D5DB] rounded focus:border-primary focus:ring-0 font-body-md text-body-md text-on-surface py-sm px-md"
              id="email"
              placeholder="name@company.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-xl">
            <label className="block font-label-md text-label-md text-on-surface mb-xs uppercase" htmlFor="password">
              Password
            </label>
            <input
              className="w-full bg-surface-container-lowest border border-[#D1D5DB] rounded focus:border-primary focus:ring-0 font-body-md text-body-md text-on-surface py-sm px-md"
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-primary-container text-on-primary font-label-md text-label-md uppercase py-sm px-md rounded transition-colors hover:bg-primary cursor-pointer font-bold tracking-wider"
            type="submit"
          >
            Sign In
          </button>
        </form>

        <div className="mt-lg text-center flex flex-col gap-2">
          <a className="font-body-sm text-body-sm text-primary hover:underline" href="#">
            Forgot your password?
          </a>
          <div className="text-xs text-on-surface-variant pt-4 border-t border-outline-variant">
            Demo credentials pre-filled. Click <span className="font-bold text-primary">Sign In</span> to access the platform.
          </div>
        </div>
      </div>
    </div>
  );
}
