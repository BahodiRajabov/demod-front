import { createSlice } from "@reduxjs/toolkit";
// Type for our state
export interface AuthState {
  isLogin: boolean;
  isSignup: boolean;
  isVerify: boolean;
  isModalOpen: boolean;
  isEditModalOpen: boolean;
}

// Initial state
const initialState: AuthState = {
  isLogin: false,
  isSignup: false,
  isVerify: false,
  isEditModalOpen: false,
  isModalOpen: false,
};

// Actual Slice
const modalChecker = createSlice({
  name: "modal_checker",
  initialState,
  reducers: {

    // Action to set the authentication status
    setLoginState(state, action) {
      state.isLogin = action.payload;
    },
    setSignupState(state, action) {
      state.isSignup = action.payload;
    },
    setVerifyState(state, action) {
      state.isVerify = action.payload;
    },
    setOpenModal(state, action) {
      state.isModalOpen = action.payload;
    },

    setOpenEditModal(state, action) {
      state.isEditModalOpen = action.payload;
      console.log(action.payload,state.isEditModalOpen,"modalChecker");
      
    },

  },
});

export const { setLoginState, setSignupState,setOpenEditModal, setVerifyState, setOpenModal } = modalChecker.actions;

export const reducer = modalChecker.reducer;