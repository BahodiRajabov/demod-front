import * as React from 'react';
import type { NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux';
import { getOneModel, selectOneModel } from '../../data/get_one_model';
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
import Image from 'next/image';
import SimpleTypography from '../../components/Typography';
import Link from 'next/link';
import Buttons from '../../components/Buttons';
import { get_brands, selectUserProfile } from '../../data/get_brands';

const OneProduct: NextPage = () => {
   const dispatch = useDispatch<any>();
   const get_brands_status = useSelector((state: any) => state?.get_brands?.status);
   const Brand = useSelector(selectUserProfile)

   const router = useRouter();

   React.useEffect(() => {
      if (router.isReady && get_brands_status === "idle") {
         console.log(router, 'router');
         dispatch(get_brands(router.query.id))
      }
   }, [dispatch, get_brands_status, router]);

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
   console.log(Brand, "Brand")
   if (get_brands_status === "succeeded") {
      return (
         <>
            <Header />
            {/* <Navbar /> */}
            <Box>
               <Box sx={{ background: "#fafafa", maxWidth: "1200px", margin: "0 auto", alignItems: "center" }}>
                  <Grid container spacing={2} sx={{ paddingBottom: "18px", marginBottom: "37px" }} >
                     <Grid item xs={4.5} >
                        <Image width={400} alt="natuzzi brand" height={400} src={Brand?.logo}></Image>
                        {/* <Image
                           width={400}
                           height={400}
                           alt="natuzzi brand"
                           src="/img/natuzzi-brand.jpg"
                        /> */}
                     </Grid>
                     <Grid sx={{ padding: "18px 0 0 0 !important" }} item xs={6.5} >
                        <SimpleTypography className='brand__name--text' text="Brand name" />
                        <SimpleTypography className='brand__name--title' text={Brand?.name} />
                        <SimpleTypography className='brand__name--text' text="Description" />
                        <SimpleTypography className='brand__desc' text={Brand?.description} />
                        <Box sx={{ display: "flex" }}>
                           <Link href={`https://www.google.com/maps/@${Brand?.location?.lat},${Brand?.location?.long},12z`} rel="noopener noreferrer">
                              <a style={{ textDecoration: "none", marginRight: "12px" }} target="_blank">
                                 <Buttons className='brand__box' name="">
                                    <Image width={19} height={23} alt="natuzzi brand" src={"/icons/location.svg"} />
                                    <Box sx={{ marginLeft: "11px" }}>
                                       <SimpleTypography className='brand__name' text="Location" />
                                       <SimpleTypography className='brand__box--text' text={`${Brand.location?.name}`} />
                                    </Box>
                                 </Buttons>
                              </a>
                           </Link>
                           <Link href={`tel:${Brand.phone_number}`}>
                              <a style={{ textDecoration: "none" }}>
                                 <Buttons className='brand__box' name="">
                                    <Image width={19} height={23} alt="brand box" src={"/icons/phone.svg"} />
                                    <Box sx={{ marginLeft: "11px" }}>
                                       <SimpleTypography className='brand__name' text="Telephone number" />
                                       <SimpleTypography className='brand__box--text' text={Brand?.phone_number} />
                                    </Box>
                                 </Buttons>
                              </a>
                           </Link>
                        </Box>

                     </Grid>
                  </Grid>
               </Box>
            </Box>
           
            <Footer />

         </>
      )
   } else if (get_brands_status === "failed") {
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
