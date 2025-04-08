import { useSelector, useDispatch } from 'react-redux';
import { logout } from './store/authSlice';
import Login from './components/Login';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import Weather from './components/Weather';

function App() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-[#F2F2F7]">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white rounded-2xl shadow-sm mb-6">
          <div className="p-6 border-b border-[#F2F2F7]">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-semibold text-black">
                  Hello, {user?.username}
                </h1>
                <p className="text-[#8E8E93]">Let's organize your day</p>
              </div>
              <button
                onClick={() => dispatch(logout())}
                className="bg-[#FF3B30] text-white px-6 py-2 rounded-xl hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
          
          <Weather />
          <TaskInput />
          <TaskList />
        </div>
      </div>
    </div>
  );
}

export default App;