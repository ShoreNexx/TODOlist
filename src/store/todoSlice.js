import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// here using a free API that dosen't requre authentication
export const fetchWeather = createAsyncThunk(
  'todos/fetchWeather',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://api.open-meteo.com/v1/forecast?latitude=51.5074&longitude=-0.1278&current=temperature_2m,weather_code'
      );
      
      // Transform the response to match our existing structure
      return {
        current: {
          temp_c: response.data.current.temperature_2m,
          condition: {
            text: getWeatherCondition(response.data.current.weather_code),
            icon: getWeatherIcon(response.data.current.weather_code)
          }
        }
      };
    } catch (error) {
      return rejectWithValue('Failed to fetch weather data. Please try again later.');
    }
  }
);

// funct to convert weather to text
function getWeatherCondition(code) {
  const conditions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    71: 'Slight snow fall',
    73: 'Moderate snow fall',
    75: 'Heavy snow fall',
    95: 'Thunderstorm',
  };
  return conditions[code] || 'Unknown';
}

//function to get weather icon
function getWeatherIcon(code) {
  // Using weather icons from a public CDN
  const baseUrl = 'https://raw.githubusercontent.com/basmilius/weather-icons/dev/production/fill/all';
  
  if (code === 0) return `${baseUrl}/clear-day.svg`;
  if (code <= 2) return `${baseUrl}/partly-cloudy-day.svg`;
  if (code === 3) return `${baseUrl}/cloudy.svg`;
  if (code <= 48) return `${baseUrl}/fog.svg`;
  if (code <= 55) return `${baseUrl}/drizzle.svg`;
  if (code <= 65) return `${baseUrl}/rain.svg`;
  if (code <= 75) return `${baseUrl}/snow.svg`;
  if (code === 95) return `${baseUrl}/thunderstorms.svg`;
  return `${baseUrl}/not-available.svg`;
}

const initialState = {
  todos: [],
  weather: null,
  status: 'idle',
  error: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload.text,
        priority: action.payload.priority,
        completed: false,
      });
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    toggleTodo: (state, action) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.weather = action.payload;
        state.error = null;
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch weather data';
      });
  },
});

export const { addTodo, deleteTodo, toggleTodo } = todoSlice.actions;
export default todoSlice.reducer;