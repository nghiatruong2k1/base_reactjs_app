import { createSlice } from '@reduxjs/toolkit';
export const sliceReducerLoading = createSlice({
  name: 'loading',
  initialState: 0,
  reducers: {
    toggleLoading: (state, { payload }) => {
      if (payload) {
        state += 1;
      } else {
        state -= 1;
      }
    },
  },
});
