import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/axios'
import Cookies from 'js-cookie'
const initialState = {
   data: [],
   status: 'idle',
   error: null,
   progress: 0,
};
export const get_brands = createAsyncThunk(`/brands/:id`, async (id: any) => {
   const response = await api.get(`/brands/${id}`)
   return response.data
   //    , {
   //    headers: {
   //       Authorization: `Bearer ${Cookies.get('accessToken')}`,
   //    },
   // }
})

const userBrands = createSlice({
   name: 'userBrands',
   initialState,
   reducers: {},
   extraReducers(builder) {
      builder
         .addCase(get_brands.pending, (state?: any, action?: any) => {
            state.status = 'loading'
         })
         .addCase(get_brands.fulfilled, (state?: any, action?: any) => {
            state.progress = 20
            state.status = 'succeeded'
            // Add any fetched posts to the array;
            state.data = [];
            state.data = state.data.concat(action.payload)
            state.progress = 100
         })
         .addCase(get_brands.rejected, (state?: any, action?: any) => {
            state.status = 'failed'
            state.error = action.error.message
         })
   }
});


export const reducer = userBrands.reducer;
export const selectUserProfile = (state: any) => state?.get_brands?.data[0]?.data
export default userBrands