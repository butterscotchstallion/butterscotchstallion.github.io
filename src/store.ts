import { configureStore } from '@reduxjs/toolkit'
import { numBouncesSlice } from './components/info-box/num-bounces-slice';

export const store = configureStore({
  reducer: {
    numBounces: numBouncesSlice.reducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch