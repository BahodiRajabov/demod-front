import React, { createContext, useState, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthState } from "../data/login";
import { getUpdatedAccessToken, selectUpdateToken } from '../data/re-update_access_token'
import axios from './axios';
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';
const AuthContext = createContext({});
import { setCategoryFilter, setCategoryNameFilter, setColorFilter, setStyleFilter, setPageFilter, } from '../data/handle_filters'

export const AuthProvider = ({ children }: any) => {
  const dispatch = useDispatch<any>();
  const update_cookie_status = useSelector((state: any) => state?.update_access_token?.status);
  const update_cookie_token = useSelector(selectUpdateToken);
  const [isInitialized, setIsInitialized] = useState(false);
  const router = useRouter();

  const getModelCategoryFilter = useSelector((state: any) => state?.handle_filters?.categories)
  const getModelCategoryNameFilter = useSelector((state: any) => state?.handle_filters?.category_name)
  const getModelColorFilter = useSelector((state: any) => state?.handle_filters?.colors)
  const getModelStyleFilter = useSelector((state: any) => state?.handle_filters?.styles)
  const getModelPageFilter = useSelector((state: any) => state?.handle_filters?.page)

  useEffect(()=>{
    if(router.isReady && !isInitialized) {

      console.log(getModelCategoryFilter, getModelCategoryNameFilter, getModelColorFilter, getModelStyleFilter, getModelPageFilter, "router is ready")
      if(router.query.category_name) {
        dispatch(setCategoryNameFilter({knnex: router.query.category_name}));
        console.log(router.query.category_name, "router is readyw")
      }
      if(router.query.category) {
        dispatch(setCategoryFilter({knex: router.query.category}));
      }
      if(router.query.colors) {
        dispatch(setColorFilter({cnex: router.query.colors}));
      }
      if(router.query.styles) {
        dispatch(setStyleFilter({snex: router.query.styles}));
      }
      if(router.query.page) {
        dispatch(setPageFilter({page: router.query.styles}));
      }
      setIsInitialized(true)
    }
  }, [dispatch, router, isInitialized])

  console.log(getModelCategoryFilter, getModelCategoryNameFilter, getModelColorFilter, getModelStyleFilter, getModelPageFilter, "router is ready")
  useEffect(() => {
    async function loadUserFromCookies() {

      if (Cookies.get('accessToken') && Cookies.get('refreshToken')) {
        dispatch(setAuthState(true));
      }

      if (Cookies.get('refreshToken')) {
        if (Cookies.get('refreshToken') && update_cookie_status === "idle" && !Cookies.get('accessToken')) {
          dispatch(getUpdatedAccessToken())
          if (update_cookie_status === 'succeeded') {
            // Cookies.set('accessToken', update_cookie_token?.token , { expires: inFifteenMinutes, path: '/' })
            dispatch(setAuthState(true));
          }
        }
      } else {
        dispatch(setAuthState(false));
      }
    }
    loadUserFromCookies();
  }, [update_cookie_status, dispatch]);

  return (
    <AuthContext.Provider
      value={{}}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => useContext(AuthContext);
