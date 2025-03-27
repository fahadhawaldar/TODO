import {configureStore} from '@reduxjs/toolkit';
import todosReducer from './TodosSlice';

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;
