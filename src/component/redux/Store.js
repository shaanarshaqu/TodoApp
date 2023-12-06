import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./Todo"

export const store = configureStore({
    reducer:{
        todo:TodoReducer,
        
    }
})