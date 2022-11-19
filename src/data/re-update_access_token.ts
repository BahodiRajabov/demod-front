import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../utils/axios";
import Cookies from 'js-cookie'
import { ACCESS_TOKEN_EXPIRATION, REFRESH_TOKEN_EXPIRATION } from "../utils/expiration";
export interface TokenType {
   token: string;
   data: any,
   status: string,
   error: null
}

const initialState: TokenType = {
   token: '',
   data: [],
   status: 'idle',
   error: null
};
export const getUpdatedAccessToken = createAsyncThunk('/auth/refreshToken/', async () => {
   var inFifteenMinutes = new Date(new Date().getTime() + Number(ACCESS_TOKEN_EXPIRATION));
   var inTwoMinutes = new Date(new Date().getTime() + Number(REFRESH_TOKEN_EXPIRATION));
   const response = await axios.post('/auth/refreshToken/',
     { 
      token: Cookies.get("refreshToken") 
     }
   )
   Cookies.set(
      'accessToken', 
      response?.data?.data?.accessToken?.token , 
      { expires: inFifteenMinutes, path: '/' }
   )
   return response.data
})
const updateToken = createSlice({
   name: 'update_access_token',
   initialState,
   reducers: {
      getUpdatedAccessToken(state, action) {
         const { token } = action.payload;
         state.token = token;
      },
      setAuthToken(state, action) {
         state.token = action.payload
      },
   },
   extraReducers(builder) {
      builder
        .addCase(getUpdatedAccessToken.pending, (state?: any, action?: any) => {
          state.status = 'loading'
        })
        .addCase(getUpdatedAccessToken.fulfilled, (state?: any, action?: any) => {
          state.status = 'succeeded'
          // Add any fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
        })
        .addCase(getUpdatedAccessToken.rejected, (state?: any, action?: any) => {
          state.status = 'failed'
          state.error = action.error.message
        })
      }
});

export const { setAuthToken } = updateToken.actions
export const selectUpdateToken = (state: any) => state?.update_access_token?.data[0]?.data?.accessToken

export const reducer = updateToken.reducer;