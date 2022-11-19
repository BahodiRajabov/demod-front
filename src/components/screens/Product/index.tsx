import * as React from 'react'
import { Box, Grid } from '@mui/material';
import ProductSlider from '../../views/Product/Slider'
import ProductInfo from '../../views/Product/Info'
import ProductModal from '../../views/Product/ProductModal';
import SimpleTypography from '../../Typography';
import CustomCard from '../../CustomCard';
import Masonry from '@mui/lab/Masonry';
import Buttons from '../../Buttons';
import Link from 'next/link';
import axios from '../../../utils/axios';

const OneProduct: React.FC = () => {
  const [data, setData] = React.useState()

  React.useEffect(() => {
    axios.get(`views/recent`)
      .then((res) => {
        if (res.data.data.length > 0) {
          setData(res.data.data)
          console.log(res.data.data, "Res");
        }
      })
  }, [])

  const model = {
    id: 1,
    cover: [
      {
        image: {
          src: "57fbff5f-b38a-4017-8ee4-3bbfcaf44b50.png"
        }
      }
    ],
    title: "salom",
    cost: "500"
  }

  return (
    <>
      <Box sx={{ background: "#fafafa" }}>
        <Box sx={{ maxWidth: "1200px", margin: "0 auto", alignItems: "center" }}>
          <Grid container spacing={2} sx={{ borderBottom: "1px solid #b3b3b3", paddingBottom: "18px", marginBottom: "37px" }} >
            <ProductModal />
            <ProductSlider name="slider" />
            <ProductInfo />
          </Grid>
          {/* <Box sx={{display:"flex",alignItems: "center",justifyContent:" space-between"}}>
          <SimpleTypography text="Similar models" className='section__title'/>
          <Buttons className='explore__btn'  name="Explore more" endIcon='explore'/>
        </Box> */}
          {/* <Masonry columns={5} sx={{width: "100%", margin:"0 0 20px 0"}} spacing={1.5}> 
          <CustomCard model={model}/>
          <CustomCard model={model}/>
          <CustomCard model={model}/>
          <CustomCard model={model}/>
          <CustomCard model={model}/>
        </Masonry> */}
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: " space-between" }}>
            <SimpleTypography text="Recently viewed models" className='section__title' />
            {/* <Buttons className='explore__btn' name="Show all" endIcon='explore' /> */}
          </Box>
          <Masonry columns={5} sx={{ width: "100%", margin: "0 0 20px 0" }} spacing={1.5}>
            {/* {
              data?.map((item:any) => (
                <CustomCard key={item} model={item} />
              ))
            } */}

          </Masonry>
        </Box>
      </Box>

      {/* <OneProductPage /> */}

    </>
  )
}

export default OneProduct
