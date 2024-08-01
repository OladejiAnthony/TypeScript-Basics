//Beginner Level
//1. Setting Up Redux Toolkit with TypeScript - 
/*
Install Dependencies - First, ensure you have @reduxjs/toolkit and react-redux installed:
    npm install @reduxjs/toolkit react-redux
    npm install --save-dev @types/react-redux
*/

//2. Create a Redux Store - Create a store.ts file to configure the Redux store:
// src/store.ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


//3. Create a Slice - Create a counterSlice.ts file
// src/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;

//4. Setup Provider - Wrap your application with the Redux provider in index.tsx:
// src/index.tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);


//5. Using Redux in a Component - Create a Counter.tsx component:
// src/Counter.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { increment, decrement, incrementByAmount } from './counterSlice';

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button onClick={() => dispatch(decrement())}>-</button>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
      <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
    </div>
  );
};

export default Counter;





/*
Beginner Level
Setup: Install necessary dependencies and create a basic store and slice.
Provider: Wrap your application with the Redux provider.
Components: Use Redux in a simple component with useSelector and useDispatch.
*/