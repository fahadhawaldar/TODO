import { createSlice } from "@reduxjs/toolkit";

export type TodosState = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
};

const initialState: { Todos: TodosState[] } = {
  Todos: [],
};

const TodosSlice = createSlice({
  name: "Todos",
  initialState,
  reducers: {
    addTodos: (state, action: { payload: TodosState[] }) => {
      const newTodos = action.payload;

      state.Todos = newTodos;
    },
    createTodo: (state, action: { payload: TodosState }) => {
      const newTodo = {
        ...action.payload,
        id: state.Todos.length + 1 + Math.random(),
        createdAt: new Date().toString(),
        updatedAt: "",
      };
      state.Todos.push(newTodo);
    },
    deleteTodos: (state, action: { payload: number }) => {
      const id = action.payload;
      state.Todos = state.Todos.filter((todo) => todo.id !== id);
    },
    editTodos: (state, action: { payload: TodosState }) => {
      const updatedTodo = {
        ...action.payload,
        updatedAt: new Date().toString(),
      };
      state.Todos = state.Todos.map((todo) =>
        todo.id === updatedTodo.id ? updatedTodo : todo
      );
    },
    toggleCompleted: (state, action: { payload: number }) => {
      const id = action.payload;
      state.Todos = state.Todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
    },
  },
});

export const { addTodos, createTodo, deleteTodos, editTodos, toggleCompleted } =
  TodosSlice.actions;
export const selectTodos = (state: any) => state.todos.Todos;
export default TodosSlice.reducer;
