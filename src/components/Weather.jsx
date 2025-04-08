import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchWeather } from '../store/todoSlice';

function Weather() {
  const dispatch = useDispatch();
  const { weather, status, error } = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(fetchWeather());
    const interval = setInterval(() => {
      dispatch(fetchWeather());
    }, 30 * 60 * 1000);  // here i am having some trobule so i have used chatgpt's help

    return () => clearInterval(interval);
  }, [dispatch]);

  if (status === 'loading') {
    return (
      <div className="p-6 border-b border-[#F2F2F7] animate-pulse">
        <div className="h-6 bg-[#F2F2F7] rounded w-1/3 mb-4"></div>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-[#F2F2F7] rounded-full"></div>
          <div className="space-y-2">
            <div className="h-4 bg-[#F2F2F7] rounded w-20"></div>
            <div className="h-4 bg-[#F2F2F7] rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="p-6 border-b border-[#F2F2F7]">
        <p className="text-[#FF3B30]">Error: {error}</p>
        <button
          onClick={() => dispatch(fetchWeather())}
          className="mt-2 text-[#007AFF]"
        >
          Try again
        </button>
      </div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <div className="p-6 border-b border-[#F2F2F7]">
      <h3 className="text-xl font-semibold text-black mb-4">Weather</h3>
      <div className="flex items-center space-x-6">
        <img
          src={weather.current.condition.icon}
          alt={weather.current.condition.text}
          className="w-16 h-16"
        />
        <div>
          <p className="text-3xl font-semibold text-black">{weather.current.temp_c}°</p>
          <p className="text-[#8E8E93]">{weather.current.condition.text}</p>
        </div>
      </div>
    </div>
  );
}

export default Weather;