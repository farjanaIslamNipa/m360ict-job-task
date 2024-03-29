/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from "@reduxjs/toolkit";
import { TTask } from "../../types";

type TInitialState = {
  tasks: TTask[];
  filteredTasks: TTask[];
};
const initialState: TInitialState = {
  tasks: [],
  filteredTasks: []
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        ...action.payload,
        status: "To Do",
        isCompleted: false,
      });
    },
    updateTask: (state, action) => {
      const taskId = action.payload.id;
      const updatedTask = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === taskId ? updatedTask : task
      );
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    updateTaskStatus: (state, action) => {
      const taskId = action.payload.id;
      const updatedStatus = action.payload.status;
      state.tasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: updatedStatus } : task
      );
    },
    toggleComplete: (state, action) => {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      );
    },
    sortCompleted: (state) => {
      state.tasks = state.tasks.sort((a : any, b :any) => a.isCompleted - b.isCompleted)
    }
  },
});

export const {
  addTask,
  deleteTask,
  updateTask,
  updateTaskStatus,
  toggleComplete,
  sortCompleted
} = taskSlice.actions;

export default taskSlice.reducer;
