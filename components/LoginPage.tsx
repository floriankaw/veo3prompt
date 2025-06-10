
import React, { useState } from 'react';
import { AppTranslations } from '../types'; // Assuming AppTranslations includes login keys

interface LoginPageProps {
  onLoginSuccess: () => void;
  translations: Pick<AppTranslations, 
    'loginPageTitle' | 
    'loginUsernameLabel' | 
    'loginPasswordLabel' | 
    'loginButtonText' | 
    'loginErrorMessage'
  >;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, translations }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'VEO3' && password === 'VEO3PRO') {
      onLoginSuccess();
    } else {
      setError(translations.loginErrorMessage);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-4">
      <div 
        className="w-full max-w-md p-8 bg-gray-800/80 backdrop-blur-md rounded-xl shadow-2xl ring-1 ring-sky-500/30"
        style={{ animation: 'fadeIn 0.5s ease-out' }}
      >
        <div className="text-center mb-8">
          <img 
            src="https://picsum.photos/seed/veoprologin/80/80?grayscale&invert" 
            alt="VEO3PRO Logo" 
            className="w-20 h-20 mx-auto rounded-full mb-4 ring-2 ring-sky-500/50"
          />
          <h1 className="text-3xl font-bold text-sky-400">{translations.loginPageTitle}</h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              {translations.loginUsernameLabel}
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm transition-colors"
              placeholder="Enter username"
            />
          </div>
          
          <div>
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-300 mb-1"
            >
              {translations.loginPasswordLabel}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 text-gray-100 placeholder-gray-400 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 shadow-sm transition-colors"
              placeholder="Enter password"
            />
          </div>
          
          {error && (
            <p className="text-sm text-red-400 bg-red-900/40 p-2.5 rounded-md border border-red-700 text-center">
              {error}
            </p>
          )}
          
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-500 transition-all duration-150 ease-in-out transform hover:scale-105"
            >
              {translations.loginButtonText}
            </button>
          </div>
        </form>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
