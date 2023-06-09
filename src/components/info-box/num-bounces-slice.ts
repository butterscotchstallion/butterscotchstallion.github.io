import { createSlice } from '@reduxjs/toolkit';

export interface INumBounces {
  value: number
};

const initialState: INumBounces = {
  value: 0,
};

export const numBouncesSlice = createSlice({
  name: 'numBounces',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    }
  },
})

export const { increment } = numBouncesSlice.actions
export default numBouncesSlice.reducer;