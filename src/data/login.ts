import { createSlice } from "@reduxjs/toolkit";
// Type for our state
export interface AuthState {
  authState: boolean;
}

// Initial state
const initialState: AuthState = {
  authState: false,
};

// Actual Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

    // Action to set the authentication status
    setAuthState(state, action) {
      state.authState = action.payload;
    },

  },
});

export const { setAuthState } = authSlice.actions;

export const reducer = authSlice.reducer;