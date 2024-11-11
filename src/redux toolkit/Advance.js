//Advanced Level
/* Real-World Project Example: Todo List */
//1. Setup - Install additional dependencies:
/*
npm install axios
npm install --save-dev @types/axios
*/

//Create a Slice - Create a todosSlice.ts file:
// src/todosSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface TodosState {
  items: Todo[];
  status: 'idle' | 'loading' | 'failed';
}

const initialState: TodosState = {
  items: [],
  status: 'idle',
};

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
  return response.data;
});

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const newTodo: Todo = {
        id: state.items.length + 1,
        title: action.payload,
        completed: false,
      };
      state.items.push(newTodo);
    },
    toggleTodo: (state, action: PayloadAction<number>) => {
      const todo = state.items.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { addTodo, toggleTodo } = todosSlice.actions;
export default todosSlice.reducer;

//3. Update Store - Update store.ts to include the todos sli
// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import todosReducer from './todosSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

//4. Create Todo Component - Create a TodoList.tsx component:
// src/TodoList.tsx
import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { fetchTodos, addTodo, toggleTodo } from './todosSlice';

const TodoList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.items);
  const status = useSelector((state: RootState) => state.todos.status);
  const [newTodo, setNewTodo] = useState<string>('');

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleNewTodoChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = (event: FormEvent) => {
    event.preventDefault();
    if (newTodo.trim().length > 0) {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  const handleToggleTodo = (id: number) => {
    dispatch(toggleTodo(id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Failed to load todos</p>}
      {status === 'idle' && (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <label style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleTodo(todo.id)}
                />
                {todo.title}
              </label>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleAddTodo}>
        <input type="text" value={newTodo} onChange={handleNewTodoChange} />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
};

export default TodoList;

//5. Integrate TodoList Component in App - Update App.tsx to include the TodoList component:
// src/App.tsx
import React from 'react';
import TodoList from './TodoList';
import Counter from './Counter';

const App: React.FC = () => {
  return (
    <div>
      <h1>React Redux Toolkit with TypeScript</h1>
      <Counter />
      <TodoList />
    </div>
  );
};

export default App;


/*
Advanced Level
Real-World Example: Create a Todo List application.
Slices and Thunks: Manage complex state and async actions.
Components: Build components to add, toggle, and fetch todos.
Integration: Combine multiple features (e.g., Counter and Todo List) in a single application.
*/




