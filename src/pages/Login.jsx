import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [role, setRole] = useState('engineer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const loggedUser = login(email, password, role);

    // Redirect to role-specific homepage
    if (loggedUser.role === 'auditor') {
      navigate('/auditor');
    } else if (loggedUser.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-md animate-fade-in-up">
      <div className="w-full max-w-md bg-surface-container-lowest border border-outline-variant/60 p-8 md:p-10 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary to-primary-container"></div>
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-2">
            <span className="material-symbols-outlined text-primary text-4xl" data-weight="fill">
              eco
            </span>
            <h1 className="text-2xl font-bold text-primary tracking-tight">EcoMetrix AI</h1>
          </div>
          <p className="font-body-md text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
            Carbon Intelligence Platform
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-2 uppercase tracking-wider text-on-surface-variant" htmlFor="role">
              Select Portal Role
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none bg-surface-container-lowest border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-sm text-on-surface py-2.5 px-4 pr-10 cursor-pointer shadow-sm transition-all"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="engineer">Operations Engineer</option>
                <option value="auditor">Third-Party Auditor</option>
                <option value="admin">System Administrator</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-on-surface-variant">
                <span className="material-symbols-outlined text-xl">arrow_drop_down</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-2 uppercase tracking-wider text-on-surface-variant" htmlFor="email">
              Email Address
            </label>
            <input
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-sm text-on-surface py-2.5 px-4 shadow-sm transition-all"
              id="email"
              placeholder={role === 'auditor' ? 'auditor@ecometrix.ai' : role === 'admin' ? 'admin@ecometrix.ai' : 'engineer@company.com'}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-2 uppercase tracking-wider text-on-surface-variant" htmlFor="password">
              Password
            </label>
            <input
              className="w-full bg-surface-container-lowest border border-outline-variant rounded-xl focus:border-primary focus:ring-1 focus:ring-primary font-body-md text-sm text-on-surface py-2.5 px-4 shadow-sm transition-all"
              id="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="w-full bg-primary text-on-primary font-label-md text-sm uppercase py-3 px-4 rounded-xl transition-all hover:bg-primary-fixed-variant cursor-pointer font-bold tracking-wider shadow active:scale-98 mt-6"
            type="submit"
          >
            Sign In as {role.charAt(0).toUpperCase() + role.slice(1)}
          </button>
        </form>

        <div className="mt-8 text-center flex flex-col gap-2">
          <a className="text-xs text-primary hover:underline font-semibold" href="#">
            Forgot your password?
          </a>
          <div className="text-[11px] text-on-surface-variant pt-4 border-t border-outline-variant/60 leading-normal">
            Select a role and click <span className="font-bold text-primary">Sign In</span> to enter the respective interface.
          </div>
        </div>
      </div>
    </div>
  );
}
