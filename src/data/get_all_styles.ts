import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
import Cookies from 'js-cookie'
// import { Cookies } from 'react-cookie';
const initialState = {
    data: [],
    status: 'idle',
    error: null,
    progress: 0,
};
export const getAllStyles = createAsyncThunk('/styles', async()=>{
  const response = await api.get(`styles`)
  return response.data
}) 

const get_all_styles = createSlice({
    name: 'get_all_styles',
    initialState,
    reducers: {},
    extraReducers(builder) {
      builder
        .addCase(getAllStyles.pending, (state?: any, action?: any) => {
          state.status = 'loading'
        })
        .addCase(getAllStyles.fulfilled, (state?: any, action?: any) => {
          state.progress = 20
          state.status = 'succeeded'
          // Add any fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
          state.progress = 100
        })
        .addCase(getAllStyles.rejected, (state?: any, action?: any) => {
          state.status = 'failed'
          state.error = action.error.message
        })
      }
  });

export const reducer = get_all_styles.reducer;
export const selectAllStyles = (state: any) => state?.get_all_styles?.data[0]
export default get_all_styles;