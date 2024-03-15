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
      console.log(action.payload, 'action')
      const {id, updatedTask} = action.payload
      const index = state.tasks.findIndex(task => task.id === id)

      if(index !== -1){
        state.tasks[index] = updatedTask
      }
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    }
  }
})

export const {addTask, deleteTask, updateTask} = taskSlice.actions;

export default taskSlice.reducer