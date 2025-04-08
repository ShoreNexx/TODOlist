import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../store/todoSlice';

function TaskInput() {
  const [task, setTask] = useState('');
  const [priority, setPriority] = useState('medium');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.trim()) {
      dispatch(addTodo({ text: task, priority }));
      setTask('');
    }
  };

  return (
    <div className="p-6 border-b border-[#F2F2F7]">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task..."
            className="w-full px-4 py-3 rounded-xl bg-[#F2F2F7] border-0 text-black placeholder-[#8E8E93] focus:ring-2 focus:ring-[#007AFF]"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full sm:flex-1 px-4 py-3 rounded-xl bg-[#F2F2F7] border-0 text-black focus:ring-2 focus:ring-[#007AFF]"
          >
            <option value="high">High Priority 🔴</option>
            <option value="medium">Medium Priority 🟡</option>
            <option value="low">Low Priority 🟢</option>
          </select>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-3 bg-[#007AFF] text-white rounded-xl font-medium hover:bg-[#0055FF] transition-colors whitespace-nowrap"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskInput;