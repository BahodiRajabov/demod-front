import * as React from 'react';
import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux';
import { getOneModel, selectOneModel } from '../../data/get_one_model';
// import { selectOneModel } from '../../data/get_one_model';
import { getRecentlyVieweds } from '../../data/recently_viewed'
import Header from '../../components/views/Header';
import Footer from '../../components/views/Footer';
import OneModel from '../../components/screens/Product';
// import Navbar from '../../components/views/Navbar';
import { useRouter } from 'next/router';
import IconBreadcrumbs from '../../components/Breadcrumbs';
import ConnectionError from '../../components/SiteInfo/ConnectionError';
// import NotFound from '../../components/SiteInfo/NotFound';
import { Box, Grid } from '@mui/material';
// import FakeSimpleModal from '../../components/Skeleton/FakeOneModel';
// import FakeProductSlider from '../../components/Skeleton/FakeOneModelSlider';
// import FakeModelInfo from '../../components/Skeleton/FakeModelInfo';
import CircularProgress from '@mui/material/CircularProgress';
import api from '../../utils/axios'
import { getOneModelReducer } from '../../data/get_one_model'
const OneProduct: NextPage = () => {
  const dispatch = useDispatch<any>();
  const getOneModel__status = useSelector((state: any) => state?.get_one_model?.status);
  const getRecentlyViewedsStatus = useSelector((state: any) => state?.get_recently_vieweds.status);
  const getOneModel__statusError = useSelector((state: any) => state?.get_one_model);

  const router = useRouter();
  React.useEffect(() => {
    if (router.query.id !== undefined) {
      // api.get(`models/${router.query.id}`).then((res: any)=>{
        dispatch(getOneModel(router.query.id))
      // })
    }
    if (getRecentlyViewedsStatus === "idle" && router.query.id !== undefined) {
      // dispatch(getRecentlyVieweds())
    }
  }, [router,dispatch, getRecentlyViewedsStatus]);
  const breadCrumbsData = useSelector(selectOneModel)
  console.log(breadCrumbsData?.data, "breadCrumbsData")
  const LoaderStyle = {
    // width: "100px !important",
    // height: "100px !important",
    zIndex: "10",
    position: "relative"
  }
  const ContainerStyle = {
    display: "flex",
    justifyContent: "center",
    maxWidth: "1200px",
    height: "697px",
    margin: "0 auto",
    alignItems: "center",
  }
  const BgBlur = {
    position: "absolute",
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    background: "#fff",
    filter: "blur(10px)"
  }

  // const breadCrumbsData = [
  //   {
  //     id: 1,
  //     text: "Living room"
  //   },
  //   {
  //     id: 2,
  //     text: "Sofas"
  //   },
  //   {
  //     id: 3,
  //     text: "Hiller Wide Sofa & Chaise"
  //   },
  // ]


  if (getOneModel__status === "succeeded") {
    return (
      <>
        <Header />
        {/* <Navbar /> */}
        <Box sx={{ background: "#fafafa" }}>
          <IconBreadcrumbs breadCrumbsData={breadCrumbsData} />
          <OneModel />
        </Box>
        <Footer />

      </>
    )
  } else if (getOneModel__status === "failed") {
    return (
      <>
        <Header />
        {/* <Navbar /> */}
        <Box sx={{ background: "#fafafa" }}>
          <IconBreadcrumbs />
          <ConnectionError />
        </Box>
        <Footer />
      </>
    )
  } else if (getOneModel__status === "failed") {
    return (
      <>
        <Header />
        {/* <Navbar /> */}
        <Box sx={{ background: "#fafafa" }}>
          <IconBreadcrumbs />
          <ConnectionError />
        </Box>
        <Footer />
      </>
    )
  } else {
    return (
      <>
        <>
          <Header />
          {/* <Navbar /> */}
          <Box sx={{ background: "#fafafa", position: "relative" }}>
            <Box sx={BgBlur} />
            <Box>
              <Box sx={ContainerStyle}>
                <CircularProgress sx={LoaderStyle} />
              </Box>
            </Box>
          </Box>
          <Footer />
        </>
      </>
    )
  }
}
export default OneProduct
