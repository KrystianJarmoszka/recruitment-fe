import { configureStore } from '@reduxjs/toolkit';
import JobsReducer from './reducers/JobsSlice';
import PropertiesReducer from './reducers/PropertiesSlice';

const store = configureStore({
  reducer: {
    jobs: JobsReducer,
    properties: PropertiesReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
