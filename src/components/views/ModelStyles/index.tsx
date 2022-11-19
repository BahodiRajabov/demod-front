import { Box, FormControlLabel, Checkbox } from '@mui/material'
import { useEffect, useState } from 'react'
import Skeleton from '@mui/material/Skeleton';
import { selectAllColors } from '../../../data/get_all_colors'
import { getAllStyles, selectAllStyles } from '../../../data/get_all_styles'
import { useDispatch, useSelector } from 'react-redux';
import SimpleTypography from '../../Typography'
import SkeletonElement from '../../Skeleton/SkeletonElement';
import { getAllModels } from '../../../data/get_all_models';
import { useRouter } from 'next/router'
import { setStyleFilter } from '../../../data/handle_filters';

const SkletonData = ['', '', '', '', '', '']
interface stylesProps {
  id: string,
  created_at: string,
  name: string,
  updated_at: string,
}
function Style() {
  const StylesData = useSelector(selectAllStyles);
  const dispatch = useDispatch<any>();
  const [isAll__Chechbox__Selected, setIsAll__Chechbox__Selected] = useState(false)
  const StylesStatus = useSelector((state: any) => state?.get_all_styles?.status)
  const [custom__styles, setCustom__styles] = useState<any>([]);
  const router = useRouter();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  // ---- filters selector ----- //

  const getModelCategoryFilter = useSelector((state: any) => state?.handle_filters?.categories)
  const getModelCategoryNameFilter = useSelector((state: any) => state?.handle_filters?.category_name)
  const getModelColorFilter = useSelector((state: any) => state?.handle_filters?.colors)
  const getModelStyleFilter = useSelector((state: any) => state?.handle_filters?.styles)
  const getModelPageFilter = useSelector((state: any) => state?.handle_filters?.page)

  useEffect(() => {
    if (StylesStatus === "succeeded") {
      if (router.isReady) {
        let arr = new Array();
        StylesData?.data?.forEach((color: stylesProps) => {
          if (getModelStyleFilter?.includes((color.id).toString()) || getModelStyleFilter?.includes(color.id) || getModelStyleFilter == color?.id ) {
            arr.push({
              id: color?.id,
              created_at: color?.created_at,
              name: color?.name,
              updated_at: color?.updated_at,
              is__Selected: true,
            })
          } else {
            arr.push({
              id: color?.id,
              created_at: color?.created_at,
              name: color?.name,
              updated_at: color?.updated_at,
              is__Selected: false,
            })
          }
        })
        console.log(StylesData, arr, "arrr")
        setCustom__styles(arr);
        // setIsInitialized(true);
      }
    }
  }, [StylesData, StylesStatus, router, getModelStyleFilter]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
    let arr = [...custom__styles];
    let count = 0;
    let res = [];
    for (let i = 0; i < arr?.length; i++) {
      if (arr[i].id === id && event.target.checked) {
        arr[i].is__Selected = true;
      } else if (arr[i].id === id && !event.target.checked) {
        arr[i].is__Selected = false;
      }
    }
    for (let i = 0; i < arr?.length; i++) {
      if (arr[i].is__Selected) {
        res.push(arr[i]?.id)
      }
    }
    dispatch(setStyleFilter({ snex: res }))
    dispatch(getAllModels({
      category_id: getModelCategoryFilter,
      color_id: getModelColorFilter,
      style_id: res,
      page: getModelPageFilter,
    }))

    router.push({
      pathname: "/",
      query: {
        page: getModelPageFilter,
        colors: getModelColorFilter,
        styles: res,
        category_name: getModelCategoryNameFilter,
        // modelStatusCode: code,
        // searchByTags: searchByTags,
        // modelId: modelId,
        category: getModelCategoryFilter,
        // sortModelByCategoryObjName: sortModelByCategoryObjName,
        // sortModelByCategoryObjId: sortModelByCategoryObjId,
      },
    });

    for (let i = 0; i < arr?.length; i++) {
      if (arr[i].is__Selected) {
        count++;
      }
    }

    setCustom__styles(arr);
  };

  console.log(StylesStatus);
  if (StylesStatus === "succeeded") {
    return (
      <Box sx={{ padding: "0 18px" }}>
        <SimpleTypography text="Style" className="section__title" />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {
            custom__styles?.map((item: any, index: number) => (
              <FormControlLabel
                key={item.id}
                label={item?.name}
                control={
                  <Checkbox
                    onClick={(event: any) => { handleChange(event, item?.id) }}
                    checked={item?.is__Selected}
                    indeterminate={false}
                  />
                }
              />
            ))
          }

        </Box>
      </Box>
    )
  }
  else {
    return (
      <Box sx={{ padding: "0 18px" }}>
        <SimpleTypography text="Style" className="section__title" />
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {
            SkletonData.map((item, index): any => (
              <Skeleton
                key={index}
                variant="rectangular"
                width={193}
                height={24}
                style={{ margin: "10px 0" }}
              />
              // <SkeletonElement key={index} type="text" />
            ))
          }
        </Box>
      </Box>
    )
  }


}

export default Style
