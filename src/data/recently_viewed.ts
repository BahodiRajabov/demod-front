//views/recent


import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
// import { Cookies } from 'react-cookie';
const initialState = {
   data: [],
   status: 'idle',
   error: null,
   progress: 0,
};
export const getRecentlyVieweds = createAsyncThunk('/views/recent',
   async () => {
      const response = await api.get("views/recent")
      return response.data
   })

const get_recently_vieweds = createSlice({
   name: 'get_recently_vieweds',
   initialState,
   reducers: {
      resetRecentlyVieweds() {
         return {
            ...initialState
         }
      },
   },
   extraReducers(builder) {
      builder
         .addCase(getRecentlyVieweds.pending, (state?: any, action?: any) => {
            state.status = 'loading'
         })
         .addCase(getRecentlyVieweds.fulfilled, (state?: any, action?: any) => {
            state.progress = 20
            state.status = 'succeeded'
            state.data = [];
            state.data = state.data.concat(action.payload)
            state.progress = 100
         })
         .addCase(getRecentlyVieweds.rejected, (state?: any, action?: any) => {
            state.status = 'failed'
            state.error = action.error.message
         })
   }
});

export const { resetRecentlyVieweds } = get_recently_vieweds.actions;
export const reducer = get_recently_vieweds.reducer;
export const selectRecentlyVieweds = (state: any) => state?.get_recently_vieweds?.data
export default get_recently_vieweds;