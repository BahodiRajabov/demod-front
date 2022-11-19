import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
const initialState = {
  data: [],
  status: 'idle',
  sub_status: 'idle',
  error: null,
};
export const getCategories = createAsyncThunk('/catgories', async () => {
  const response = await api.get(`/categories/main`)
  return response.data
})
export const getSubCategories = createAsyncThunk('/subcatgories', async (data: any) => {
  const response = await api.get(data)
  return response.data
})
const categories = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    getCategories(state, action) {
      const { budget } = action.payload;
      // state.budget = budget;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getCategories.pending, (state?: any, action?: any) => {
        state.status = 'loading'
      })
      .addCase(getCategories.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.status = 'succeeded'
        // Add any fetched posts to the array;
        //   state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getCategories.rejected, (state?: any, action?: any) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getSubCategories.pending, (state?: any, action?: any) => {
        state.sub_status = 'loading'
      })
      .addCase(getSubCategories.fulfilled, (state?: any, action?: any) => {
        state.progress = 20
        state.sub_status = 'succeeded'
        // Add any fetched posts to the array;
        //   state.data = [];
        state.data = state.data.concat(action.payload)
        state.progress = 100
      })
      .addCase(getSubCategories.rejected, (state?: any, action?: any) => {
        state.sub_status = 'failed'
        state.error = action.error.message
      })
  }
});

// export const { resetcategories } = categories.actions;
export const selectCategories = (state: any) => state?.categories?.data[0]?.data
// export default categories
export const reducer = categories.reducer;