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
export const getAllModels = createAsyncThunk('/models', 
  async(wrapper ?: any)=>{
  let send__route = `models`

  console.log(wrapper?.category_id, wrapper?.color_id, wrapper?.style_id, "csmnex");

  for(let i=0; i<wrapper?.category_id?.length; i++) {
    if(!send__route?.includes("/?")) {
      send__route += `/?categories=${wrapper?.category_id[i]}`
    } else {
      send__route += `&categories=${wrapper?.category_id[i]}`
    }
  }

  for(let i=0; i<wrapper?.color_id?.length; i++) {
    if(!send__route?.includes("/?")) {
      send__route += `/?colors=${wrapper?.color_id[i]}`
    } else {
      send__route += `&colors=${wrapper?.color_id[i]}`
    }
  }

  for(let i=0; i<wrapper?.style_id?.length; i++) {
    if(!send__route?.includes("/?")) {
      send__route += `/?styles=${wrapper?.style_id[i]}`
    } else {
      send__route += `&styles=${wrapper?.style_id[i]}`
    }
  }
  if(!send__route?.includes("/?") && wrapper?.page) {
    send__route += `/?page=${wrapper?.page}`
  } else if(wrapper?.page){
    send__route += `&page=${wrapper?.page}`
  }
  const response = await api.get(send__route)
  return response.data
}) 

const get_all_models = createSlice({
    name: 'get_all_models',
    initialState,
    reducers: {
      resetAllModels() {
        return {
          ...initialState
        }
      },
    },
    extraReducers(builder) {
      builder
        .addCase(getAllModels.pending, (state?: any, action?: any) => {
          state.status = 'loading'
        })
        .addCase(getAllModels.fulfilled, (state?: any, action?: any) => {
          state.progress = 20
          state.status = 'succeeded'
          // Add any fetched posts to the array;
          state.data = [];
          state.data = state.data.concat(action.payload)
          state.progress = 100
        })
        .addCase(getAllModels.rejected, (state?: any, action?: any) => {
          state.status = 'failed'
          state.error = action.error.message
        })
      }
  });

export const { resetAllModels } = get_all_models.actions;
export const reducer = get_all_models.reducer;
export const selectAllModels = (state: any) => state?.get_all_models?.data
export default get_all_models;