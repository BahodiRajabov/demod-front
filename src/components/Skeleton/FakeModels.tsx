import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Box, Grid, Paper, styled } from '@mui/material';
import Masonry from '@mui/lab/Masonry';
import Image from 'next/image';
import { ThemeProps } from '../../types/ThemeTypes';
import SimpleTypography from '../Typography';
import Link from 'next/link';
import { selectAllModels } from '../../data/get_all_models';
import MyLoader from '../Skeleton/Skeleton'
type InputProps = {
  item?: object,
};
  const fakeModels = [1,2,3,4,5,6,7,8];
  const heights = [208, 208, 208, 208,  208,  208,  208, 208, 208, 208,  208,  208, 208, 208,  208];
  const Label = styled(Paper)(({ theme }: ThemeProps) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  }));

  
export const SimpleCardsSkeleton: React.FC = () => {
   return (
     <>
      <Grid container spacing={2} >
       {fakeModels?.map((model: any, index: any) => (
         <Grid item xs={3} key={index}>
           <a style={{margin:'0 0 15px 0'}}>
             <Box  sx={{border:"1px solid #e0e0e0",background:"#fff", padding:"12px 12px 0 12px",position:'relative'}}>
               {/* <SimpleTypography text='16%' className='card__sale' /> */}
               <Image
                 src={"/img/card-loader.jpg"}
                 // srcSet={`${process.env.NEXT_PUBLIC_BASE_IMG_URL}/${model?.model_images[0]?.image[0]?.src}`}
                 // layout='fill'
                 width="282px"
                 height="282px"
                 alt={model?.title}
                 loading="lazy"
                 style={{
                   borderBottomLeftRadius: 4,
                   borderBottomRightRadius: 4,
                   objectFit: 'cover',
                   display: 'block',
                   width: '100%',
                 }}
               />
               <Label 
                 sx={{ width:"100%", display:"flex", justifyContent:"space-between", padding:"16px 0" }}
                 >
                   <MyLoader width=''>
                     <rect x="10" y="20" rx="30" ry="3" width="600" height="80" /> 
                     
                   </MyLoader>
                   <MyLoader>
                     <rect x="80" y="20" rx="3" ry="3" width="300" height="80" /> 
                   </MyLoader>
                   <SimpleTypography text={model?.title} className='card__title'></SimpleTypography> 
                   {/* <SimpleTypography text='$123' className='card__title-dollar'></SimpleTypography> */}
               </Label>
             </Box>
           </a>
         </Grid>
       ))}
      </Grid>
     </>
   )
 }