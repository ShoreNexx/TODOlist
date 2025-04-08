import { useSelector, useDispatch } from 'react-redux';
import { deleteTodo, toggleTodo } from '../store/todoSlice';

function TaskList() {
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);
  
// sort the task by priority high has the highest priority and low has lowest priority
  const sortByPriority = (todos) => {
    return [...todos].sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  };

  const sortedActiveTodos = sortByPriority(activeTodos);
  const sortedCompletedTodos = sortByPriority(completedTodos);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-[#FF3B30]';
      case 'medium':
        return 'text-[#FFCC00]';
      case 'low':
        return 'text-[#34C759]';
      default:
        return 'text-[#8E8E93]';
    }
  };

  const TodoItem = ({ todo }) => (
    <div className="flex items-center py-4 px-6 border-b border-[#F2F2F7] group">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(toggleTodo(todo.id))}
        className="h-5 w-5 rounded-full border-2 border-[#8E8E93] text-[#007AFF] focus:ring-[#007AFF]"
      />
      <div className="flex-1 ml-4">
        <p className={`text-black ${todo.completed ? 'line-through text-[#8E8E93]' : ''}`}>
          {todo.text}
        </p>
        <span className={`text-sm ${getPriorityColor(todo.priority)}`}>
          {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)} Priority
        </span>
      </div>
      <button
        onClick={() => dispatch(deleteTodo(todo.id))}
        className="ml-4 text-[#FF3B30] opacity-0 group-hover:opacity-100 transition-opacity"
      >
        Delete
      </button>
    </div>
  );

  return (
    <div className="divide-y divide-[#F2F2F7]">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-black mb-4">
          Active Tasks ({sortedActiveTodos.length})
        </h2>
        <div className="bg-[#F2F2F7] rounded-xl overflow-hidden">
          {sortedActiveTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
          {sortedActiveTodos.length === 0 && (
            <p className="text-[#8E8E93] text-center py-4">No active tasks</p>
          )}
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-semibold text-black mb-4">
          Completed Tasks ({sortedCompletedTodos.length})
        </h2>
        <div className="bg-[#F2F2F7] rounded-xl overflow-hidden">
          {sortedCompletedTodos.map(todo => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
          {sortedCompletedTodos.length === 0 && (
            <p className="text-[#8E8E93] text-center py-4">No completed tasks</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskList;