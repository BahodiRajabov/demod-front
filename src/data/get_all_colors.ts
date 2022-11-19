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
export const getAllColors = createAsyncThunk('/colors', async()=>{
  const response = await api.get(`colors`)
  return response.data
}) 

const get_all_colors = createSlice({
    name: 'get_all_colors',
    initialState,
    reducers: {
      resetAllColors() {
        return {
          ...initialState
        }
      },
    },
    extraReducers(builder) {
      builder
        .addCase(getAllColors.pending, (state?: any, action?: any) => {
          state.status = 'loading'
        })
        .addCase(getAllColors.fulfilled, (state?: any, action?: any) => {
          state.progress = 20
          state.status = 'succeeded'
          // Add any fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
          state.progress = 100
        })
        .addCase(getAllColors.rejected, (state?: any, action?: any) => {
          state.status = 'failed'
          state.error = action.error.message
        })
      }
  });

export const { resetAllColors } = get_all_colors.actions;
export const reducer = get_all_colors.reducer;
export const selectAllColors = (state: any) => state?.get_all_colors?.data
export default get_all_colors;