import {createSlice} from "@reduxjs/toolkit";
import {TTask} from "../../types";

type TInitialState = {
  tasks: TTask[]
}
const initialState : TInitialState = {
  tasks: []
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({...action.payload, status: 'To Do', isCompleted: false})
    },
    updateTask: (state, action) => {
      const taskId = action.payload.id;
      const updatedTask = action.payload
      state.tasks = state.tasks.map(task => task.id === taskId ? updatedTask : task )
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    }
  }
})

export const {addTask, deleteTask, updateTask} = taskSlice.actions;

export default taskSlice.reducer