import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import { categoryReducer, taskReducer } from './slices';

const rootReducer = combineReducers({
  categoryReducer,
  taskReducer,
});

const setupStore = () => configureStore({
  reducer: rootReducer,
});

type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore['dispatch']

export type {
  RootState,
  AppStore,
  AppDispatch,
}

export {
  setupStore,
}