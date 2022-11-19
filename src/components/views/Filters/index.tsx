import { Box, Grid, styled } from '@mui/material'
import { ThemeProps } from '../../../types/ThemeTypes';
import SimpleTypography from '../../Typography'
import List, { listClasses } from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Buttons from '../../Buttons';
import Image from "next/image";
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useEffect, useState } from 'react';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { selectCategories } from '../../../data/categories';
import { selectAllColors } from '../../../data/get_all_colors';
import { selectAllStyles } from '../../../data/get_all_styles';
import { flatten } from "lodash";
import { useDispatch } from 'react-redux';
import { setCategoryFilter, setColorFilter, setStyleFilter } from '../../../data/handle_filters'
import { getAllModels } from '../../../data/get_all_models';
const FiltersItem = styled(Box)(
  ({ theme }: ThemeProps) => `
        background: #FFFFFF;
        border: 1px solid #E0E0E0;
        border-radius: 21px;
        padding: 2px 2px 2px 8px;
        display:flex;
        align-items: center;
        cursor:pointer;
        transition: all 0.4s ease;

        &:not(:last-child){
            margin-right:8px
        }
        &:hover{
            button{
                background: #F5F5F5;

                svg{
                    color:#000;
                }
            }
        }
    
  `
);

function Filters() {
  const [value, setValue] = useState(0);
  const router = useRouter()
  // apply filters
  const [category_filter, setCategory_filter] = useState<any>([]);
  const [color_filter, setColor_filter] = useState<any>([]);
  const [styles_filter, setStyles_filter] = useState<any>([]);

  // filters data from redux store;
  const categoryData = useSelector(selectCategories);
  const allColors = useSelector(selectAllColors);
  const stylesData = useSelector(selectAllStyles);

  // the status of filters' datas
  const categoriesData__status = useSelector((state: any) => state?.categories.status);
  const colorsData__status = useSelector((state: any) => state?.get_all_colors.status);
  const stylesData__status = useSelector((state: any) => state?.get_all_styles.status);

  const getModelCategoryFilter = useSelector((state: any) => state?.handle_filters?.categories)
  const getModelCategoryNameFilter = useSelector((state: any) => state?.handle_filters?.category_name)
  const getModelColorFilter = useSelector((state: any) => state?.handle_filters?.colors)
  const getModelStyleFilter = useSelector((state: any) => state?.handle_filters?.styles)
  const getModelPageFilter = useSelector((state: any) => state?.handle_filters?.page)

  const [filters, setFilters] = useState([]);

  useEffect(() => {
    if (router.isReady) {
      console.log(categoryData, router.query, "filterData");
      let res = [];
      if (!router.query.category) {
        setCategory_filter([]);
      }
      if (!router.query.colors) {
        setColor_filter([]);
      }
      if (!router.query.styles) {
        setStyles_filter([]);
      }
      if (router.query.category && categoriesData__status === "succeeded") {
        let rtCt = router.query.category;
        let ctCollecter = [];
        for (let category of categoryData) {
          for (let chldCt of category?.children) {
            for (let rt of rtCt) {
              if (rt == chldCt.id) {
                ctCollecter.push(chldCt);
              }
            }
          }
        }
        setCategory_filter(ctCollecter);
      }

      if (getModelColorFilter && colorsData__status === "succeeded") {
        let rtCt = getModelColorFilter;
        console.log(rtCt, "category_filter");
        let ctCollecter = [];
        for (let color of allColors[0]?.data) {
          console.log(color, "category_filter");
          for (let rt of rtCt) {
            if (rt == color.id) {
              ctCollecter.push(color);
            }
          }
        }
        setColor_filter(ctCollecter);
      }

      if (getModelStyleFilter && stylesData__status === "succeeded") {
        let rtCt = getModelStyleFilter;
        let ctCollecter = [];
        for (let style of stylesData?.data) {
          console.log(stylesData?.data, "stylesData")
          for (let rt of rtCt) {
            if (rt == style.id) {
              ctCollecter.push(style);
            }
          }
        }
        setStyles_filter(ctCollecter);
      }
    }
  }, [router, categoryData, allColors, stylesData, categoriesData__status, colorsData__status, stylesData__status, getModelStyleFilter, getModelColorFilter])

  console.log(category_filter, color_filter, "category_filter")
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const filtersWrapStyle = {
    width: "100%",
    borderStyle: "solid",
    borderColor: "#E0E0E0",
    padding: "10px 8px",
    borderWidth: "1px 0",
    marginBottom: "20px"
  }

  const dispatch = useDispatch<any>()
  console.log(getModelCategoryFilter, getModelColorFilter, "getModelColorFilter")
  const CategoryFilter = (item: any) => {
    console.log(item, 'itemsss');
    let ctRt = router.query.category;
    let arr = [];
    if (ctRt) {
      for (let i = 0; i < ctRt.length; i++) {
        if (ctRt[i] != item.id) {
          arr.push(ctRt[i])
        }
      }
    }
    router.push({
      pathname: "/",
      query: {
        page: getModelPageFilter,
        colors: getModelColorFilter,
        styles: getModelStyleFilter,
        category: arr,
        category_name: getModelCategoryNameFilter,
      },
    });
    dispatch(getAllModels({
      category_id: arr,
      color_id: getModelColorFilter,
      style_id: getModelStyleFilter,
      page: getModelPageFilter,
    }))
    dispatch(setCategoryFilter({ knex: arr }))
  }

  const ColorFilter = (item: any) => {
    let ctRt = getModelColorFilter;
    let arr = [];
    if (ctRt) {
      for (let i = 0; i < ctRt.length; i++) {
        if (ctRt[i] != item.id) {
          arr.push(ctRt[i])
        }
      }
    }
    router.push({
      pathname: "/",
      query: {
        page: getModelPageFilter,
        colors: arr,
        styles: getModelStyleFilter,
        category: getModelCategoryFilter,
        category_name: getModelCategoryNameFilter,
      },
    });
    dispatch(getAllModels({
      category_id: getModelCategoryFilter,
      color_id: arr,
      style_id: getModelStyleFilter,
      page: getModelPageFilter,
    }))
    dispatch(setColorFilter({ cnex: arr }))
  }

  const StyleFilter = (item: any) => {
    let ctRt = getModelStyleFilter;
    let arr = [];
    if (ctRt) {
      for (let i = 0; i < ctRt.length; i++) {
        if (ctRt[i] != item.id) {
          arr.push(ctRt[i])
        }
      }
    }
    router.push({
      pathname: "/",
      query: {
        page: getModelPageFilter,
        colors: getModelColorFilter,
        styles: arr,
        category: getModelCategoryFilter,
        category_name: getModelCategoryNameFilter,
      },
    });
    dispatch(getAllModels({
      category_id: getModelCategoryFilter,
      color_id: getModelColorFilter,
      style_id: arr,
      page: getModelPageFilter,
    }))
    dispatch(setStyleFilter({ snex: arr }))

  }

  const ClearFilters = (item: any) => {
    router.push({
      pathname: "/",
      query: {
        page: getModelPageFilter,
        colors: [],
        styles: [],
        category: [],
        category_name: getModelCategoryNameFilter,
      },
    });
    dispatch(setStyleFilter({ snex: [] }))
    dispatch(setColorFilter({ cnex: [] }))
    dispatch(setCategoryFilter({ knex: [] }))
  }

  return (
    <Box sx={filtersWrapStyle}>
      <Grid spacing={2} container sx={{ margin: 0 }}>
        <Grid xs={10} sx={{ display: "flex", alignItems: 'center' }}>
          <SimpleTypography className='filters__title' text="Filters:" />
          <Box
            sx={{
              maxWidth: { xs: 320, sm: 540 },
              bgcolor: 'background.paper',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              sx={{
                [`& .${tabsClasses.indicator}`]: {
                  display: "none"
                },
                [`& .${tabsClasses.scrollButtons}`]: {
                  '&.Mui-disabled': { opacity: 0.3 },
                  width: "32px",
                  height: "32px",
                  boxShadow: "inset -12px 0px 4px #FAFAFA"
                },
                minHeight: "auto",
                background: "#fafafa"
              }}
            >
              {
                category_filter?.map((item: any, index: any) => (
                  <FiltersItem key={index}>
                    <SimpleTypography className='filters__item--text' text={item.name} />
                    <Buttons name="" onClick={() => CategoryFilter(item)} className="filters__item--close">
                      <CloseOutlinedIcon />
                    </Buttons>
                  </FiltersItem>
                ))
              }
              {
                color_filter?.map((item: any, index: any) => (
                  <FiltersItem key={index}>
                    {
                      <Box
                        sx={{
                          width: "18px",
                          height: "18px",
                          background: `${item?.hex_value}`,
                          borderRadius: "50%",
                          marginRight: "4px"
                        }}
                      />
                    }

                    <SimpleTypography className='filters__item--text' text={item.name} />
                    <Buttons name="" onClick={() => ColorFilter(item)} className="filters__item--close">
                      <CloseOutlinedIcon />
                    </Buttons>
                  </FiltersItem>
                ))
              }
              {
                styles_filter?.map((item: any, index: any) => (
                  <FiltersItem key={index}>
                    <SimpleTypography className='filters__item--text' text={item.name} />
                    <Buttons name="" onClick={() => StyleFilter(item)} className="filters__item--close">
                      <CloseOutlinedIcon />
                    </Buttons>
                  </FiltersItem>
                ))
              }
            </Tabs>
          </Box>
          {styles_filter?.length == 0 && color_filter?.length == 0 && category_filter?.length == 0 ?
            (
              <SimpleTypography
                className='filters__text--text'
                text="No filters"
              />
            )
            :
            (
              <Buttons
                className="filters__clear--btn"
                name=""
                onClick={ClearFilters}
              >
                <Image
                  src="/icons/clear-filters.svg"
                  alt="Clear filters"
                  width={12}
                  height={14}
                />
                <SimpleTypography
                  className='filters__clear--text'
                  text="Clear all"
                />
              </Buttons>
            )
          }
        </Grid>
        <Grid xs={2} >
        </Grid>
      </Grid>
    </Box>
  )
}

export default Filters


{/* <List sx={ListStyle}>
                    {
                        filtersFakeData.map((item,index) => (
                            <FiltersItem>
                                {
                                    index + 1 === 2 ? 
                                        <Box sx={{width:"18px",height:"18px",background:"#000",borderRadius:"50%",marginRight:"4px"}} /> 
                                    : null
                                }
                               
                                <SimpleTypography className='filters__item--text' text={item.text}/>
                                <Buttons name="" className="filters__item--close">
                                    <CloseOutlinedIcon  />
                                </Buttons>
                            </FiltersItem>
                        ))
                    }
               
                </List> */}