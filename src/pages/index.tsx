import * as React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router'
import HomePage from '../components/screens/Home';
import Header from '../components/views/Header';
import Navbar from '../components/views/Navbar';
import Footer from '../components/views/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getAllModels, selectAllModels } from '../data/get_all_models';
import { getAllColors, selectAllColors } from '../data/get_all_colors';
import MenuSlice from '../data/user_status';
import IconBreadcrumbs from '../components/Breadcrumbs';
import { getAllStyles } from '../data/get_all_styles';

const Home: NextPage = () => {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  // router.replace({
  //   pathname: "/models",
  //   query: {
  //     page: page,
  //     modelStatusCode: code,
  //     searchByTags: searchByTags,
  //     // modelId: modelId,
  //     sortModelByCategory: sortModelByCategory,
  //     sortModelByCategoryObjName: sortModelByCategoryObjName,
  //     sortModelByCategoryObjId: sortModelByCategoryObjId,
  //   },
  //   shallow: true,
  // });

  // ---- intial staters ---- //

  const getModelStatus = useSelector((state: any)=> state?.get_all_models?.status);
  const getColorStatus = useSelector((state: any)=> state?.get_all_colors?.status);
  const StyleStatus = useSelector((state: any) => state?.get_all_styles?.status)
  
  // ---- filters selector ----- //

  const getModelCategoryFilter = useSelector((state: any)=> state?.handle_filters?.categories)
  const getModelColorFilter = useSelector((state: any)=> state?.handle_filters?.colors)
  const getModelStyleFilter = useSelector((state: any)=> state?.handle_filters?.styles)

  console.log(getModelCategoryFilter, getModelColorFilter, getModelStyleFilter, "getModelStatus")
  
  React.useEffect(()=>{
    if(router.isReady) {
      if(getModelStatus === "idle") {
        dispatch(getAllModels(router.query.category))
      }
      if(getColorStatus === "idle") {
        dispatch(getAllColors());
      }
      if(StyleStatus === "idle"){
        dispatch(getAllStyles());
      }
    }
  }, [getModelStatus, dispatch, getColorStatus, StyleStatus, router])

  return (
    <>
      <Header />
      {/* <Navbar /> */}
      <section style={{ background:"#fafafa" }}>
        {/* <IconBreadcrumbs /> */}
        <HomePage />
      </section>
      <Footer />
    </>
  )
}

export default Home
