import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(''); 
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const strongPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=]).{8,}$/;
  const mediumPassword = /^(?=.*[A-Za-z])(?=.*\d).{6,}$/;
  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    setUsernameError(false);
  // Simple validation 
    if (username.trim() === '' || password.trim() === '') {
  setError('Please enter username and password');
      if (username.trim() === '') setUsernameError(true);
      return;
    }
    if (username.length < 5 || username.length > 30) {
  setError('Invalid username');
      setUsernameError(true);
      valid = false;
    } else {
      setUsernameError(false);
    }
  // Password strength check (advisory only)
    if (password.length === 0) {
      setPasswordStrength('');
      setError('');
    } else if (strongPassword.test(password)) {
      setPasswordStrength('strong');
      setError('');
    } else if (mediumPassword.test(password)) {
      setPasswordStrength('medium');
  setError('We recommend using a strong password (at least 8 characters, uppercase, lowercase, number, and special symbol)');
    } else {
      setPasswordStrength('weak');
  setError('Password is too weak, please use a stronger password');
    }
    if (!valid) return;
  // Dummy login
    localStorage.setItem('user', JSON.stringify({ username }));
    setError('');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center" 
    style={{background: 'linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)'}}>
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
  <h1 className="text-2xl font-bold mb-6 text-center text-gray-700">Login</h1>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className={`border rounded-md px-4 py-2 focus:outline-none transition text-base bg-gray-50 
              ${usernameError ? 'border-red-500 focus:border-red-500' : username.length >= 5 && username.length <= 30 ?
                 'border-green-500 focus:border-green-500' : 'border-gray-300 focus:border-blue-400'}`}
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className={`border rounded-md px-4 py-2 focus:outline-none transition text-base bg-gray-50 w-full
                ${passwordStrength === 'weak' ? 'border-red-500 focus:border-red-500'
                  : passwordStrength === 'medium' ? 'border-orange-400 focus:border-orange-400'
                  : passwordStrength === 'strong' ? 'border-green-500 focus:border-green-500'
                  : 'border-gray-300 focus:border-blue-400'}`}
              value={password}
              onChange={e => {
                setPassword(e.target.value);
                // Update password strength live while typing
                if (e.target.value.length === 0) {
                  setPasswordStrength('');
                } else if (strongPassword.test(e.target.value)) {
                  setPasswordStrength('strong');
                } else if (mediumPassword.test(e.target.value)) {
                  setPasswordStrength('medium');
                } else {
                  setPasswordStrength('weak');
                }
              }}
              required
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1 focus:outline-none"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12C4.5 7.5 9 4.5 12 4.5c3 0 7.5 3 9.75 7.5-2.25 4.5-6.75 7.5-12 7.5-2.25 0-4.5-.75-6.75-2.25z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 2.25 12c2.25 4.5 6.75 7.5 12 7.5 2.25 0 4.5-.75 6.75-2.25M3.98 8.223l16.042 7.554M3.98 8.223l2.02 2.02m14.022 5.534l-2.02-2.02M9.75 9.75a3 3 0 1 1 4.5 4.5" />
                </svg>
              )}
            </button>
          </div>
          {error && <div className="text-red-500 text-sm text-center font-semibold bg-red-50 rounded py-2">{error}</div>}
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition font-bold shadow text-base"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
