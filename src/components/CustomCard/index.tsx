import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Box, styled, Paper } from '@mui/material';
import Image from 'next/image';
import SimpleTypography from '../Typography';
import Link from 'next/link';
import { ThemeProps } from '../../types/ThemeTypes';
import { LazyLoadImage } from "react-lazy-load-image-component";

type InputProps = {
  item?: object,
};
// display: flex;
// flex-direction: column;
// align-items: center;   
// width: 228px; 
// height: 234px;
// box-shadow: 0px 2px 4px #e9e9e9;
// border-radius: 4px;
// cursor: pointer;
// transition: box-shadow 0.25s;

// :hover {
//   box-shadow: 0px 10px 10px 10px #e9e9e9;
// }

// img {
//   margin: 0;
//   margin-bottom: 4px;
//   width: 162px;
//   height: 162px;
//   object-fit: contain;
// }
// `}
// const CustomBoxWrapper = styled(Box)(({ theme }: ThemeProps) => ({
//   maxWidth:"234px", 
//   border:"1px solid #e0e0e0",
//   background:"#fff", 
//   padding:"12px 12px 0 12px",
//   position:'relative'
// }));
const CustomBoxWrapper = styled(Box)(
  // border-bottom: 1px solid #e7e7e7;
  // transition: box-shadow 0.25s;
  ({ theme }) =>
    `
      
      
      img {
        margin: 0;
        padding: 12px;
        margin-bottom: 4px;
        objec-fit:cover;
      }
    `
);


function CustomCard({ model }: any) {

  const Label = styled(Paper)(({ theme }: ThemeProps) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0.5),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  }));

  const BoxStyle = {
    maxWidth:  "234px",
    height:"282px",
    border:" 1px solid #e0e0e0",
    background: "#fff",
    position: "relative",
    cursor: "pointer",
    transition: "all 0.4s ease",
    padding:"13px 13px 0 13px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  }

  return (
    <Link key={model?.id} href={`/products/${model?.id}`}>
      <a style={{ margin: '0 0 15px 0', textDecoration: "none" }}>
        <Box sx={BoxStyle}>
          {/* <SimpleTypography text='16%' className='card__sale' /> */}
          <LazyLoadImage
            src={`${model?.cover[0]?.image?.src}`}
            alt="Model"
            effect="blur"
            width={"100%"}
            placeholderSrc={"/img/card-loader.jpg"}
            height={"208px !important"}
            delayTime={500}
            style={{ objectFit: "cover" }}
          />

          <Label
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              padding: "16px 13px"
            }}
          >
            <SimpleTypography
              text={model?.title}
              className='card__title'
            />
            <SimpleTypography
              text={`${model?.cost}$`}
              className='card__title-dollar'
            />
          </Label>
        </Box>
      </a>
    </Link>
  )
}



export default CustomCard