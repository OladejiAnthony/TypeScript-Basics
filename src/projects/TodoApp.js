import React, { useState } from 'react';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>('');

  const addTodo = () => {
    if (task.trim()) {
      setTodos([
        ...todos,
        { id: Date.now(), task, completed: false },
      ]);
      setTask('');
    }
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
              }}
              onClick={() => toggleComplete(todo.id)}
            >
              {todo.task}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
