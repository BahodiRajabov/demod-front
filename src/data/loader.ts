import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { BooleanLiteral } from "typescript";

const initialState = {
  hidden: true,
  progress: 0,
  show_models_modal: false,
  color: "#7210BE",
};
const Loader = createSlice({
   name: 'loader',
   initialState,
   reducers: {
      setHidden: state => {
         state.hidden = !state.hidden
      },
      setProgress: (state, data) =>{
        console.log(state , "state progress")
        console.log(data , "state progress")
        console.log("Hi there")
        // state.progress = data.progress
      },
      setShowModelsModal(state, action) {
        state.show_models_modal = action.payload;
      },
  },
});

export const { setHidden, setProgress, setShowModelsModal } = Loader.actions;
export const reducer = Loader.reducer;
export default Loader;