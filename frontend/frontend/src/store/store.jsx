import { configureStore } from '@reduxjs/toolkit';
import rootAction from '../action/rootAction';

const store = configureStore({
  reducer: rootAction,
});

export default store;
