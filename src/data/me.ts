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
export const getMyProfile = createAsyncThunk('/users/me', async()=>{
  const response = await api.get(`users/me`, {
    headers: {
      Authorization: `Bearer ${Cookies.get('accessToken')}`,
    },
    onDownloadProgress: (progressEvent) => {
      console.log('progressEvent', progressEvent);
      console.log(`${Math.round((100 * progressEvent.loaded) / progressEvent.total)}`, "progress")
      // initialState.progress = 70
      }
  })
  return response.data
}) 
export const deleteCustomer =createAsyncThunk('/reservations/customer/delete', async(id ?: any) =>{
  console.log(id)
  const response = await api.delete(`api/reservations/customer/${id}`,{
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
  })
  return response.data
 })
const myProfile = createSlice({
    name: 'myProfile',
    initialState,
    reducers: {
      getMyProfile(state ?: any, action ?: any) {
        const { customers } = action.payload;
        state.customers = customers;
      },
      resetMyProfile() {
        return {
          ...initialState
        }
      },
    },
    extraReducers(builder) {
      builder
        .addCase(getMyProfile.pending, (state?: any, action?: any) => {
          state.status = 'loading'
        })
        .addCase(getMyProfile.fulfilled, (state?: any, action?: any) => {
          state.progress = 20
          state.status = 'succeeded'
          // Add any fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
          state.progress = 100
        })
        .addCase(getMyProfile.rejected, (state?: any, action?: any) => {
          state.status = 'failed'
          state.error = action.error.message
        })
        .addCase(deleteCustomer.fulfilled, (state?: any, action?: any) => {
          state.status = 'idle'
          state.data.splice(state.data.findIndex((arrow?: any) => arrow.id === action.payload), 1);
        })
      }
  });

export const { resetMyProfile } = myProfile.actions;
export const reducer = myProfile.reducer;
export const selectMyProfile = (state: any) => state?.profile_me?.data[0]?.data
export default myProfile