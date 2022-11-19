import { combineReducers } from '@reduxjs/toolkit';
import { reducer as profile_me } from '../data/me';
import { reducer as MenuSlice } from '../data/user_status';
import { reducer as auth_slicer } from '../data/login';
import { reducer as modal_checker } from '../data/modal_checker';
import { reducer as loader } from '../data/loader';
import { reducer as update_access_token } from '../data/re-update_access_token';
import { reducer as categories } from '../data/categories';
import { reducer as get_all_models } from '../data/get_all_models';
import { reducer as get_one_model } from '../data/get_one_model';
import { reducer as get_all_colors } from '../data/get_all_colors';
import { reducer as get_all_styles } from '../data/get_all_styles';
import { reducer as handle_filters } from '../data/handle_filters';
import { reducer as get_profile } from '../data/get_profile';
import { reducer as get_recently_vieweds } from '../data/recently_viewed';
import { reducer as get_brands }from '../data/get_brands';



const rootReducer = combineReducers({
  profile_me: profile_me,
  menu_slice: MenuSlice,
  auth_slicer: auth_slicer,
  modal_checker: modal_checker,
  loader: loader,
  update_access_token: update_access_token,
  categories: categories,
  get_all_models: get_all_models,
  get_one_model: get_one_model,
  get_all_colors: get_all_colors,
  get_all_styles: get_all_styles,
  handle_filters: handle_filters,
  get_profile: get_profile,
  get_recently_vieweds: get_recently_vieweds,
  get_brands:get_brands,
});

export default rootReducer;