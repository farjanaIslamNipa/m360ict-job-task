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
    }
  }
})

export const {addTask} = taskSlice.actions;

export default taskSlice.reducer