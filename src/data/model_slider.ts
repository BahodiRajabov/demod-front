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
export const getOneModel = createAsyncThunk('/models/:id', async(id: any)=>{
  const response = await api.get(`models/${id}`)
  return response.data
}) 

const get_one_model = createSlice({
    name: 'get_one_model',
    initialState,
    reducers: {
      getOneModel(state ?: any, action ?: any) {
        const { customers } = action.payload;
        state.customers = customers;
      },
      resetOneModel() {
        return {
          ...initialState
        }
      },
    },
    extraReducers(builder) {
      builder
        .addCase(getOneModel.pending, (state?: any, action?: any) => {
          state.status = 'loading'
        })
        .addCase(getOneModel.fulfilled, (state?: any, action?: any) => {
          state.progress = 20
          state.status = 'succeeded'
          // Add any fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
          state.progress = 100
        })
        .addCase(getOneModel.rejected, (state?: any, action?: any) => {
          state.status = 'failed'
          state.error = action.error.message
        })
      }
  });

export const { resetOneModel } = get_one_model.actions;
export const reducer = get_one_model.reducer;
export const selectOneModel = (state: any) => state?.get_one_model?.data[0]
export default get_one_model;