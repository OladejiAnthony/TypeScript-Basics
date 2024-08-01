//Intermediate Level
//Async Thunks and Middleware
//1. Async Thunks - Modify counterSlice.ts to include async actions:
// src/counterSlice.ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
};

export const fetchCount = createAsyncThunk('counter/fetchCount', async (amount: number) => {
  const response = await fetch(`/fakeApi/count?amount=${amount}`);
  const data = await response.json();
  return data.value;
});

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
  extraReducers: (builder) => {
    builder
      .addCase(fetchCount.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCount.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = 'idle';
        state.value += action.payload;
      })
      .addCase(fetchCount.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;

//2. Using Thunks in a Component - Modify Counter.tsx to handle async actions:
// src/Counter.tsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { increment, decrement, incrementByAmount, fetchCount } from './counterSlice';

const Counter: React.FC = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const status = useSelector((state: RootState) => state.counter.status);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button onClick={() => dispatch(decrement())}>-</button>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
      <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
      <button onClick={() => dispatch(fetchCount(10))}>
        {status === 'loading' ? 'Loading...' : 'Fetch Count'}
      </button>
    </div>
  );
};

export default Counter;

/*
Intermediate Level
Async Thunks: Add async actions to your slice using createAsyncThunk.
Thunks in Components: Dispatch thunks in your components and handle loading stat
*/







