import { createSlice } from '@reduxjs/toolkit';
export const sliceReducerTitle = createSlice({
  name: 'titles',
  initialState: [],
  reducers: {
    addTitle: (state, { payload }) => {
      state.unshift(payload);
    },
    removeTitle: (state) => {
      state.shift();
    },
  },
});
