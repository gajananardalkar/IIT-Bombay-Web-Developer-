import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
    todoTask:[],
    ongoingTask:[],
    completedTask:[]
}

const menu = createSlice({
    name: "menu",
    initialState: initialValue,
    reducers: {
        saveTodoTask: (state, action) => {
            state.todoTask = action.payload.todoTask;
        },
        saveOngoingTask: (state, action) => {
            state.ongoingTask = action.payload.ongoingTask;
        },
        saveCompletedTask: (state, action) => {
            state.completedTask = action.payload.completedTask;
        }
    }
});

export const {
    saveTodoTask,
    saveOngoingTask,
    saveCompletedTask
} = menu.actions;

export default menu.reducer;
