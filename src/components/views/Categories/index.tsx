import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import SimpleTypography from '../../Typography'
import { Box, keyframes } from '@mui/system'
import { Checkbox, FormControlLabel } from '@mui/material';
import styled from '@emotion/styled';
import { getCategories, selectCategories } from '../../../data/categories'
import Skeleton from '@mui/material/Skeleton';
import { getAllModels } from '../../../data/get_all_models'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { setCategoryFilter, setCategoryNameFilter, setCategorySelectedChild } from '../../../data/handle_filters'

const CustomCategoryItem = styled(Accordion)(
  ({ theme }) =>
    `
    background:transparent;
    transition: all 0.4s ease;
    border-bottom: 1px solid #E0E0E0 !important;
    border-top-left-radius: 0 !important;
    border-top-right-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
    border-bottom-right-radius: 0 !important;

    &:hover{
      background: #F5F5F5;
    }

    .MuiCheckbox-colorPrimary{
      color:#7210BE !important
    }

    &.MuiPaper-accardion__active{
      background: #fff;
      margin:0
    }


  `
);
interface categoryProps {
  id?: any,
  created_at?: string,
  description?: string,
  name?: string,
  parent_id?: string,
}

const Categories = () => {

  const dispatch = useDispatch<any>()
  const categoryData = useSelector(selectCategories)
  const categoryStatus = useSelector((state: any) => state?.categories?.status)
  const [childrenCategoryData, setChildrenCategoryData] = useState<any[]>([])
  const [isInitialized, set_isInitialized] = useState(true);
  const router = useRouter();
  const [isAccardionOpen, setIsAccardionOpen] = useState(false);
  const [expanded, setExpanded] = React.useState<string | false | string[]>(false);
  const handleCloseAccordion = (item: any) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? item?.name : false);
    setIsAccardionOpen(!isAccardionOpen)
    if (isExpanded) {
      setChildrenCategoryData([])
      console.log(item, "this is also rendering")
      dispatch(setCategoryNameFilter({ knnex: item?.name }))
      router.push({
        pathname: "/",
        query: {
          page: getModelPageFilter,
          colors: getModelColorFilter,
          styles: getModelStyleFilter,
          category_name: item?.name,
          category: getModelCategoryFilter,
        },
      });

      let res;
      for (let i = 0; i < categoryData?.length; i++) {
        if (categoryData[i].name === item?.name) {
          res = categoryData[i];
        }
      }
      console.log(res, "lets check this")
      let arr = new Array();
      res?.children?.forEach((category: categoryProps) => {
        // if (router?.query?.category?.includes((category.id).toString())) {
        //   arr.push({
        //     id: category?.id,
        //     name: category?.name,
        //     parent_id: category?.parent_id,
        //     is__Selected: true,
        //   })
        // } else {
          arr.push({
            id: category?.id,
            name: category?.name,
            parent_id: category?.parent_id,
            is__Selected: false,
          })
        // }
      })
      setChildrenCategoryData(arr)
    }
    // if (!isExpanded) {
      // setChildrenCategoryData([])
      dispatch(setCategoryFilter({ knex: [] }))
      dispatch(setCategoryNameFilter({ knnex: null }))
      router.query.category = [];
      router.query.category_name = [];
      router.push({
        pathname: "/",
        query: {
          page: getModelPageFilter,
          colors: getModelColorFilter,
          styles: getModelStyleFilter,
        },
      });
    // }
  };

  useEffect(() => {
    if (categoryStatus == 'idle') {
      dispatch(getCategories())
    }
  }, [categoryData, categoryStatus, dispatch])

  const SkletonData = ['', '', '', '', '', '']

  const SliderBoxStyle = {
    padding: "0 18px 18px",
    overflow: "hidden",
  }

  useMemo(() => {
    const setChildrenData = () => {
      let res;
      for (let i = 0; i < categoryData?.length; i++) {
        if (categoryData[i].name === router.query.category_name) {
          res = categoryData[i];
        }
      }

      let arr = new Array();
      res?.children?.forEach((category: categoryProps) => {
        if (router?.query?.category?.includes((category.id).toString())) {
          arr.push({
            id: category?.id,
            name: category?.name,
            parent_id: category?.parent_id,
            is__Selected: true,
          })
        }
        else {
          arr.push({
            id: category?.id,
            name: category?.name,
            parent_id: category?.parent_id,
            is__Selected: false,
          })
        }
      })
      setChildrenCategoryData(arr)
      if (router.query.category_name) {
        setExpanded(router.query.category_name);
      }
    }
    if (router.isReady && router.query.category_name && categoryStatus === "succeeded") {
      setChildrenData();
      console.log("this is also rendering");
    }
  }, [router, categoryData, categoryStatus])

  const getModelCategoryFilter = useSelector((state: any) => state?.handle_filters?.categories)
  const getModelCategoryNameFilter = useSelector((state: any) => state?.handle_filters?.category_name)
  const getModelColorFilter = useSelector((state: any) => state?.handle_filters?.colors)
  const getModelStyleFilter = useSelector((state: any) => state?.handle_filters?.styles)
  const getModelPageFilter = useSelector((state: any) => state?.handle_filters?.page)
  console.log(getModelCategoryNameFilter, "109 line")


  // ---- filters selector ----- //

  // const CategoryItemHandler = (item: any, isAccardionOpened: boolean) => {
  //   setChildrenCategoryData([])
  //   console.log(item, "this is also rendering")
  //   dispatch(setCategoryNameFilter({ knnex: item?.name }))
  //   router.push({
  //     pathname: "/",
  //     query: {
  //       page: getModelPageFilter,
  //       colors: getModelColorFilter,
  //       styles: getModelStyleFilter,
  //       category_name: item?.name,
  //       category: getModelCategoryFilter,
  //     },
  //   });

  //   let res;
  //   for (let i = 0; i < categoryData?.length; i++) {
  //     if (categoryData[i].name === item?.name) {
  //       res = categoryData[i];
  //     }
  //   }
  //   console.log(res, "lets check this")
  //   let arr = new Array();
  //   res?.children?.forEach((category: categoryProps) => {
  //     if (router?.query?.category?.includes((category.id).toString())) {
  //       arr.push({
  //         id: category?.id,
  //         name: category?.name,
  //         parent_id: category?.parent_id,
  //         is__Selected: true,
  //       })
  //     } else {
  //       arr.push({
  //         id: category?.id,
  //         name: category?.name,
  //         parent_id: category?.parent_id,
  //         is__Selected: false,
  //       })
  //     }
  //   })
  //   setChildrenCategoryData(arr)
  // }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    let arr = childrenCategoryData;
    console.log(arr, id, "musttt");
    let res = [];
    for (let i = 0; i < arr?.length; i++) {
      if (arr[i].id === id && !arr[i].is__Selected) {
        arr[i].is__Selected = true;
      } else if (arr[i].id === id) {
        arr[i].is__Selected = false;
      }
    }
    // dispatch(setCategorySelectedChild( { selectedChilds : arr }))
    for (let i = 0; i < arr?.length; i++) {
      if (arr[i].is__Selected) {
        res.push(arr[i]?.id)
      }
    }
    dispatch(getAllModels({
      category_id: res,
      color_id: getModelColorFilter,
      style_id: getModelStyleFilter,
      page: getModelPageFilter,
    }))

    dispatch(setCategoryFilter({ knex: res }))
    console.log(getModelCategoryNameFilter, "!arr[i].is__Selected")
    router.push({
      pathname: "/",
      query: {
        page: getModelPageFilter,
        colors: getModelColorFilter,
        styles: getModelStyleFilter,
        category_name: getModelCategoryNameFilter,
        category: res,
      },
    });


    setChildrenCategoryData(arr);
  };

  if (categoryStatus === "succeeded") {
    return (

      <Box >
        <Box sx={{ paddingLeft: "18px" }}>
          <SimpleTypography className='section__title' text="Categories"></SimpleTypography>
        </Box>

        {
          categoryData?.map((item: any, index: any) => (
            <CustomCategoryItem
              expanded={expanded === item?.name}
              className={`${expanded === item?.name ? "MuiPaper-accardion__active" : ""}`}
              onChange={handleCloseAccordion(item)}
              key={index}
            >

              {/* ACCORDION TEXT */}

              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                // onClick={() => {
                //   CategoryItemHandler(item, isAccardionOpen)
                //   }
                // }
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <SimpleTypography
                  text={item?.name}
                  className="category__text"
                />
              </AccordionSummary>

              {/* ACCORDION TEXT */}
              {/* 
              { category_name === item?.name && !(sub_category_status === "loading" && sub_category_status !== "idle") ?  */}
              <AccordionDetails>
                {/* <FormControlLabel 
                  label="All"
                  control={
                    <Checkbox
                      checked={isAll__Chechbox__Selected}
                      indeterminate={false}
                      onClick={(e) => {handleSelectAll(isAll__Chechbox__Selected)}}
                    />
                  }
                /> */}
                {
                  childrenCategoryData?.map((child__Category: any, index: number) => (
                    <FormControlLabel
                      key={index}
                      sx={{ minWidth: "100%" }}
                      label={`${child__Category?.name}`}
                      control={
                        <Checkbox
                          checked={child__Category?.is__Selected}
                          onClick={(event: any) => {
                            handleChange(event, child__Category?.id)
                          }
                          }
                        />
                      }
                    />
                  ))}
              </AccordionDetails>
              {/* : 
                  [1, 2, 3, 4].map((child__Category : any, index: number) => (
                    <Skeleton 
                    key={index} 
                    variant="rectangular"
                    width={210} 
                    height={24} 
                    style={{margin:"10px 0 10px"}}
                    />
                    ))
                  } */}
            </CustomCategoryItem>
          ))
        }
      </Box>
    )
  }
  else {
    return (
      <Box>

        <Box sx={SliderBoxStyle}>
          <Box sx={{ borderBottom: "1px solid #E0E0E0" }}>
            {
              SkletonData.map((item, index): any => (
                <Skeleton
                  key={index}
                  variant="rectangular"
                  width={210}
                  height={24}
                  style={{ margin: "10px 0" }}
                />
                // <SkeletonElement type="text" key={index} />
                // <SkeletonProfile key={index} />
              ))
            }
          </Box>

        </Box>
      </Box>
    )
  }


}

export default Categories