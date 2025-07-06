import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [isRegister, setIsRegister] = useState(false); // 🔁 Toggle login/register
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // 🔐 Login handler
  const handleLogin = async (e) => {
    e.preventDefault();

    // console.log("🟢 Login attempt with:", { email, password, name });

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
        email,
        password
      });
      const { token, user } = res.data;

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('name', res.data.user.name);
      localStorage.setItem('email', res.data.user.email);

      // console.log("🔄 login :", localStorage.getItem("token"));
      toast.success('Login  successful!');
      navigate('/addTodo');
      setEmail('');
      setPassword('');


    } catch (error) {
      // console.error("❌ Login failed:", error.response?.data?.message || error.message);
      // alert("Login failed!");
      toast.error(error.response?.data?.message || 'Registration failed!');
    }
  };

  // 📝 Register handler
  const handleRegister = async (e) => {
    e.preventDefault();

    // console.log("🟡 Registration attempt with:", { email, password, name });

    // const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
        name,
        email,
        password,
      });

      toast.success('Registration successful! Please login.');
      setIsRegister(false);
      setEmail('');
      setPassword('');
      setName('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed!');
    }

  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700   flex items-center justify-center overflow-hidden">
      <div className="bbackdrop-blur-md bg-white/10 border border-white/20 shadow-xl rounded-xl p-8 w-full max-w-sm">

        <h2 className="text-2xl font-bold text-center text-white mb-6">
          {isRegister ? 'Register' : 'Login'}
        </h2>

        <form className="space-y-5" onSubmit={isRegister ? handleRegister : handleLogin}>
          {isRegister && (
            <div>
              <label className="block text-sm text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border text-pink-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          )}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Enter Your email</label>
            <input
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border text-pink-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border text-pink-400 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 rounded-md text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>

        {/* Toggle link */}
        <p className="mt-4 text-center text-sm text-white">
          {isRegister ? 'Already have an account?' : 'New user?'}{' '}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="p-2 ml-1 rounded-md text-white font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {isRegister ? 'Login here' : 'Register here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
