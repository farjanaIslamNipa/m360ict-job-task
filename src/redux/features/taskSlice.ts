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
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    }
  }
})

export const {addTask, deleteTask} = taskSlice.actions;

export default taskSlice.reducer