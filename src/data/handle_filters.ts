import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const initialState = {
    categories: [],
    selected_child: [],
    category_name: '',
    colors: [],
    styles: [],
    page: 1,
    error: null,
    progress: 0,
};

const handle_filters = createSlice({
    name: 'handle_filters',
    initialState,
    reducers: {
      setCategoryFilter(state ?: any, action ?: any) {
        const { ...params } = action.payload;
        state.categories = params.knex;
      },
      setCategoryNameFilter(state ?: any, action ?: any) {
        const { ...params } = action.payload;
        console.log(params, "oaramama")
        state.category_name = params.knnex;
      },
      setCategorySelectedChild(state ?: any, action ?: any) {
        const { ...params } = action.payload;
        state.selected_child = params.selectedChilds;
      },
    
      setColorFilter(state ?: any, action ?: any) {
        const { ...params } = action.payload;
        state.colors = params.cnex;
        console.log(params, state, "params");
      },
      setStyleFilter(state ?: any, action ?: any) {
        const { ...params } = action.payload;
        state.styles = params.snex;
        console.log(params, state, "params");
      },
      setPageFilter(state?: any, action?: any) {
        const {...params } = action.payload;
        state.page = params.page;
        console.log(params, state, "params");
      },
      resetFilters() {
        return {
          ...initialState
        }
      },
    },
    extraReducers(builder) {
    }
       
  });

export const { setCategoryFilter,setCategorySelectedChild, setCategoryNameFilter, setColorFilter, setStyleFilter, setPageFilter, resetFilters } = handle_filters.actions;
export const reducer = handle_filters.reducer;
export default handle_filters;