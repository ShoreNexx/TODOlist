import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store/authSlice';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username && password) {
      dispatch(login({ username }));
    }
  };

  return (
    <div className="min-h-screen bg-[#F2F2F7] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-semibold text-black mb-2">Welcome Back</h2>
          <p className="text-[#8E8E93]">Please sign in to your account</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm">
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F2F2F7] border-0 text-black placeholder-[#8E8E93] focus:ring-2 focus:ring-[#007AFF]"
                placeholder="Username"
              />
            </div>
            
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#F2F2F7] border-0 text-black placeholder-[#8E8E93] focus:ring-2 focus:ring-[#007AFF]"
                placeholder="Password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#007AFF] text-white py-3 rounded-xl font-medium hover:bg-[#0055FF] transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>

        
      </div>
    </div>
  );
}

export default Login;