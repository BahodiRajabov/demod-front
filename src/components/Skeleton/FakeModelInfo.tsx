import {  Grid,Table,TableBody,TableCell,FormControl,FormControlLabel,Radio,RadioGroup,TableContainer,styled,Box,TableRow,Paper  } from '@mui/material';
import SimpleTypography from '../Typography';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneModel, selectOneModel } from '../../data/get_one_model';
import Link from 'next/link';
import Buttons from '../Buttons';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack'

const SimpleFormControlLabel = styled(FormControlLabel)(
  ({ theme }) => `
    padding:2px;
    border:1px solid transparent;

    .MuiTypography-body1{
      height: 36px;
    }

    &.MuiFormControlLabel-colors__label{
      padding:2px;
      border-radius:50%;
      border:1px solid transparent;
    }

    &.MuiFormControlLabel-colors__label .MuiFormControlLabel-colors__box{
        padding:2px !important;
        width:36px;
        height:36px;
        border-radius:50%;
    }
`
)


const ProductInfo = () => {
  const [inpchecked,setInpChecked] = useState(0)
  const [colorInpchecked,setColorInpInpChecked] = useState(0)

  const materials = [
    {
      id:1,
      img:'/img/material.jpg'
    },
    {
      id:2,
      img:'/img/material.jpg'
    },
    {
      id:3,
      img:'/img/material.jpg'
    },
    {
      id:4,
      img:'/img/material.jpg'
    },
    {
      id:5,
      img:'/img/material.jpg'
    },
  ]

  const colors = [
    {
      id:1,
      color:"#dcdad3"
    },
    {
      id:1,
      color:"#7e8184"
    },
    {
      id:2,
      color:"#5f423c"
    },
  ]
  const RadioStyle = {
    width: 0,
    height: 0,
    visibility: "hidden",
    position: "absolute",

  }
  const dispatch = useDispatch<any>();
  const simpleModel = useSelector(selectOneModel);
  console.log(simpleModel, "simpleModel")
  const simple_model_status = useSelector((state: any)=> state?.get_one_model?.status);

  return (
    <Grid item xs={6} sx={{marginTop:"20px",padding:"18px 0 0 44px !important"}}>
      
    <Stack spacing={1} sx={{mb: "28px"}}>
      <Skeleton variant="rectangular" animation="wave" width={210} height={36} />
      <Skeleton variant="rectangular" animation="wave" width={400} height={23} sx={{margin:"6px 0 0 0 !important"}} />
    </Stack>

      <TableContainer sx={{borderRadius:"0",marginBottom:"28px"}} component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableBody 
            sx={{ 
              borderTop:"1px solid #b3b3b3", 
              borderBottom:"1px solid #b3b3b3" 
            }}
            >
            {materials.map((row : any, index : number) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } ,background: "linear-gradient(to left, #fafafa 50%, #f5f5f5 50%)" }}
              >
                <TableCell sx={{borderColor:" #B3B3B3"}} component="th" scope="row">
                  <Skeleton variant="rectangular" animation="wave" width={210} height={22} />
                </TableCell>
                <TableCell sx={{borderColor:" #b3b3b3"}} align="right">
                  <Skeleton variant="rectangular" animation="wave" width={210} height={22} />
                </TableCell>
              </TableRow>
            ))} 
          </TableBody>
        </Table>
      </TableContainer>

 

      <Box sx={{display:"flex"}}>
        <Buttons 
          name="" 
          type="button"
          className="download__zip--file"
        >
          <Image
            width="24px"
            height="26.67px"
            alt="Models"
            src="/icons/zip-icon.svg"
          />
          <Box sx={{marginLeft:"12px"}}>
            <Skeleton variant="rectangular" width={210} height={37} />
          </Box>
        </Buttons>
        <Link href="/">
          <a style={{textDecoration:"none"}} download>
            <Buttons 
              name={`Buy 3D model — ****`} 
              type="button"
              className="buy__model"
            >
            </Buttons>
          </a>
        </Link>
      <Box />
      </Box> 

    </Grid>
  )
}
export default ProductInfo
