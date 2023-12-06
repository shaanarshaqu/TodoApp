import { createSlice } from "@reduxjs/toolkit";
import { IoCheckmarkDoneCircle } from "react-icons/io5";


const initialState = [{ id: 1, title: "Learn Redux", edit: false }];

const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.push({ id: state.length + 1, title: action.payload, edit: false });
    },
    completedTodo: (state, action) => {
      let element = state.find((val)=>val.id === action.payload)
      element.color="green"
      element.background="white"
      element.icon="green"
      element.style="italic"
      element.border="gray"
      element.opacity=0.4
      element.component=<IoCheckmarkDoneCircle fontSize={"2em"}/>
    },

    editTodo:(state, action)=>{
      return state.map((todo) => {
        if(todo.id === action.payload.id){
          return {...todo,edit:action.payload.bool};
        }
        return todo;
      });
      
    },
    updateTodo:(state,action)=>{
      const currentTodo = state.find((val)=>val.id === action.payload.id)
      currentTodo.title=action.payload.title;
      currentTodo.edit= false;
    }
  },
});

export const { addTodo, completedTodo, editTodo,updateTodo} = TodoSlice.actions;
export default TodoSlice.reducer;
