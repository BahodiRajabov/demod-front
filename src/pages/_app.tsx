import * as React from 'react';
import '../styles/globals.css'
import '../styles/main.scss';
import 'remixicon/fonts/remixicon.css'
import 'react-toastify/dist/ReactToastify.css';
import '../components/Skeleton/Skeleton.scss';
import "@fontsource/barlow";
import { Provider } from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from '../utils/auth'
import type { AppProps } from 'next/app'
import store from '../store'
import ThemeProvider from '../theme/ThemeProvider';
import { useDispatch, useSelector } from 'react-redux';
import { getMyProfile, selectMyProfile } from '../data/me';
import TopLoading from '../components/TopLoading';
import 'react-loading-skeleton/dist/skeleton.css'
import "react-lazy-load-image-component/src/effects/blur.css";
import AlertWrapper from '../components/Alert';
import { Box } from '@mui/material';

function MyApp({ Component, pageProps }: AppProps) {
  const dispatch = useDispatch<any>()
  let myProfile = useSelector(selectMyProfile)
  const myProfileStatus = useSelector((state: any) => state?.profile_me?.status)
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)

  React.useEffect(() => {
    if (myProfileStatus === 'idle' && isAuthenticated) {
      dispatch(getMyProfile())
    }
  }, [dispatch, myProfileStatus, isAuthenticated])

  return (
    <AuthProvider>
      <ThemeProvider>
        <CookiesProvider>
          <Provider store={store}>
            <Box sx={{display: "flex",flexDirection:"column",height:"100vh"}}>
              <Component Component  {...pageProps}>
              </Component>
            </Box>
            <TopLoading />
            {/* <AlertWrapper /> */}
          </Provider>
        </CookiesProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore)
export default wrapper.withRedux(MyApp)