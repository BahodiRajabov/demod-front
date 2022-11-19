import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { BooleanLiteral } from "typescript";

const initialState = {
  hidden: true,
  show_models_modal: false,
};
const MenuSlice = createSlice({
   name: 'menu_slice',
   initialState,
   reducers: {
      setHidden: state => {
         state.hidden = !state.hidden
      },
      setShowModelsModal: state => {
         state.show_models_modal = !state.show_models_modal
      }
  },
});

// export const { resetMyProfile } = myProfile.actions;
export const reducer = MenuSlice.reducer;
export default MenuSlice;