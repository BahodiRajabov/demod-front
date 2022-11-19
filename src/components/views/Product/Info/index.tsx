import { Grid, Table, TableBody, TableCell, FormControl, FormControlLabel, Radio, RadioGroup, TableContainer, styled, Box, TableRow, Paper } from '@mui/material';
import SimpleTypography from '../../../Typography';
import Image from 'next/image';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneModel, selectOneModel } from '../../../../data/get_one_model';
import Link from 'next/link';
import Buttons from '../../../Buttons';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import axios from '../../../../utils/axios';
// import axios from 'axios'


const ProductInfo = () => {

  const router = useRouter()

  const brandBox = {
    padding: "20px",
    background: "#fff",
    borderRadius: "4px",
    border: "1px solid #B3B3B3",
    marginBottom: "28px",
    display: "flex",
  }

  const dispatch = useDispatch<any>();
  const simpleModel = useSelector(selectOneModel);
  const downloadStatus = useSelector((state: any)=>state?.auth_slicer?.authState)
  console.log(downloadStatus, "simpleModel");
  const handleDownloadAfterRes = () => {
    axios.post(`downloads/`,
    {
      model_id: `9c78de6e-296a-4267-8672-8ad8dd94c8ef`
    }, 
    {
      headers: { 
        Authorization: `Bearer ${Cookies.get("accessToken")}`
      }
    },
    ).then((res: any)=>{
      var a = document.createElement('a');
      console.log(new Blob([res?.data?.data?.file]))
      var url = window.URL.createObjectURL(new Blob([res?.data?.data?.file]));
      a.href = url;
      a.download = 'myfile.pdf';
      document.body.append(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    }).catch((err: any)=>{
      console.error(err);
    })
  }
  return (
    <Grid item xs={6} sx={{ marginTop: "20px", padding: "18px 0 0 44px !important" }}>

      <SimpleTypography
        text={simpleModel?.data?.title}
        className="product__info--title"
      />

      <SimpleTypography
        text={simpleModel?.data?.description}
        className="product__info--desc"
      />

      <Box sx={brandBox}>
        <Image
          width={180}
          height={180}
          alt="Brand image"
          style={{ objectFit: "cover" }}
          src={`${simpleModel?.data?.brand[0]?.logo}`}
        />
        <Box sx={{ marginLeft: "24px" }}>
          <SimpleTypography className='brand__name' text="Brand name" />

          <Link href={`/brands/${simpleModel?.data?.brand[0]?.id}`}>
            <a style={{ textDecoration: "none" }}>
              <SimpleTypography className='brand__title' text={simpleModel?.data?.brand[0]?.name} />
            </a>
          </Link>

          <Link href={`https://www.google.com/maps/@${simpleModel?.data?.brand[0]?.location?.lat},${simpleModel?.data?.brand[0]?.location?.long},12z`} rel="noopener noreferrer">
            <a style={{ textDecoration: "none" }} target="_blank">
              <Buttons className='brand__box' name="">
                <Image
                  width={19}
                  height={23}
                  alt="Location"
                  src={"/icons/location.svg"}
                />
                <Box sx={{ marginLeft: "11px" }}>
                  <SimpleTypography
                    className='brand__name'
                    text="Location"
                  />
                  <SimpleTypography
                    className='brand__box--text'
                    text={`${simpleModel?.data?.brand[0]?.location?.name
                      }`}
                  />
                </Box>
              </Buttons>
            </a>
          </Link>
          <Link href={`tel:${simpleModel?.data?.brand[0]?.phone_number}`}>
            <a style={{ textDecoration: "none" }}>
              <Buttons className='brand__box' name="">
                <Image
                  width={19}
                  height={23}
                  alt="Phone number"
                  src={"/icons/phone.svg"}
                />
                <Box sx={{ marginLeft: "11px" }}>
                  <SimpleTypography className='brand__name' text="Telephone number" />
                  <SimpleTypography className='brand__box--text' text={`${simpleModel?.data?.brand[0]?.phone_number}`} />
                </Box>
              </Buttons>
            </a>
          </Link>
        </Box>

        {/* <Box sx={{ marginLeft: "24px" }}>
          <SimpleTypography className='brand__name' text="Brand name" />
          <Link href={`/brands/${simpleModel?.data?.brand[0]?.brand_id}`}>
            <a style={{ textDecoration: "none" }}>
              <SimpleTypography className='brand__title' text={simpleModel?.data?.brand[0]?.name} />
            </a>
          </Link>
          <Link href={"/"}>
              <a style={{ textDecoration: "none" }}>
                <Buttons className='brand__box' name="">
                  <Image
                    width={19}
                    height={23}
                    alt="Location"
                    src={"/icons/location.svg"}
                  />
                  <Box sx={{ marginLeft: "11px" }}>
                    <SimpleTypography className='brand__name' text="Location" />
                    <SimpleTypography className='brand__box--text' text="Beruniy 32, Toshkent" />
                  </Box>
                </Buttons>
              </a>
            </Link> 
          <Link href={`tel:${simpleModel?.data?.brand[0]?.phone_number}`}>
            <a style={{ textDecoration: "none" }}>
              <Buttons className='brand__box' name="">
                <Image width={19} height={23} src={"/icons/phone.svg"} />
                <Box sx={{ marginLeft: "11px" }}>
                  <SimpleTypography className='brand__name' text="Telephone number" />
                  <SimpleTypography className='brand__box--text' text={simpleModel?.data?.brand[0]?.phone_number} />
                  <Image
                    width={19}
                    height={23}
                    alt="Phone number"
                    src={"/icons/phone.svg"}
                  />
                </Box>
                <Box sx={{ marginLeft: "11px" }}>
                  <SimpleTypography className='brand__name' text="Telephone number" />
                  <SimpleTypography className='brand__box--text' text={`${simpleModel?.data?.brand[0]?.phone_number}`} />
                </Box> 
        </Buttons>
      </a>
    </Link> 
        </Box > */}
        {/* </Box> */}
      </Box >



      <TableContainer sx={{ borderRadius: "0", marginBottom: "28px" }} component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableBody
            sx={{
              borderTop: "1px solid #b3b3b3",
              borderBottom: "1px solid #b3b3b3"
            }}
          >
            {/* {rows.map((row, index) => ( */}
            <TableRow
              // key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: "linear-gradient(to left, #fafafa 50%, #f5f5f5 50%)" }}
            >
              <TableCell sx={{ borderColor: " #B3B3B3" }} component="th" scope="row">
                <SimpleTypography
                  text={"Style"}
                  className="table__text"
                />
              </TableCell>
              <TableCell sx={{ borderColor: "#b3b3b3" }} align="right">
                <SimpleTypography
                  text={simpleModel?.data?.style?.name}
                  className="table__text"
                />
              </TableCell>
            </TableRow>

            <TableRow
              // key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: "linear-gradient(to left, #fafafa 50%, #f5f5f5 50%)" }}
            >
              <TableCell sx={{ borderColor: " #B3B3B3" }} component="th" scope="row">
                <SimpleTypography
                  text={"Publishing date"}
                  className="table__text"
                />
              </TableCell>
              <TableCell sx={{ borderColor: " #b3b3b3" }} align="right">
                <SimpleTypography
                  text={"Colors"}
                  className="table__text"
                />
              </TableCell>
            </TableRow>

            <TableRow
              // key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 }, background: "linear-gradient(to left, #fafafa 50%, #f5f5f5 50%)" }}
            >
              <TableCell sx={{ borderColor: " #B3B3B3" }} component="th" scope="row">
                <SimpleTypography
                  text={"Colors"}
                  className="table__text"
                />
              </TableCell>
              <TableCell sx={{ borderColor: " #b3b3b3" }} align="right">
                <Box sx={{ display: "flex" }}>
                  {
                    simpleModel?.data?.colors?.map((color: any, index: number) => (
                      <Box
                        key={index}
                        sx={{
                          width: "16px",
                          height: "16px",
                          borderRadius: "50%",
                          background: color?.color?.hex_value,
                          marginRight: "4px"
                        }}
                      />
                    ))
                  }
                </Box>

              </TableCell>
            </TableRow>

            <TableRow
              // key={index}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                background: "linear-gradient(to left, #fafafa 50%, #f5f5f5 50%)"
              }}
            >
              <TableCell sx={{ borderColor: " #B3B3B3" }} component="th" scope="row">
                <SimpleTypography
                  text={"Materials"}
                  className="table__text"
                />
              </TableCell>
              <TableCell sx={{ borderColor: " #b3b3b3", display: "flex" }}>
                {simpleModel?.data?.materials?.map((material: any, index: number) => (
                  <SimpleTypography
                    key={index}
                    text={`${material?.material?.name}${index + 1 !== simpleModel?.data?.materials.length ? "," : ""}`}
                    className="table__material--text"
                  />
                ))
                }
              </TableCell>
            </TableRow>
            {/* ))} */}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: "flex" }}>
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
          <Box sx={{ marginLeft: "12px" }}>
            <SimpleTypography className="download__button--text" text="3ds Max 2019 + Corona | OBJ, FBX" />
            <SimpleTypography className="download__button--mb" text={`${(Number(simpleModel?.data?.file?.size) / (8 * 1000000)).toFixed(2)}`} />
          </Box>

        </Buttons>
        {/* <Link href="/"> */}
          <a style={{ textDecoration: "none" }} onClick={()=>{if(downloadStatus) {
            handleDownloadAfterRes()
          }}}>
            <Buttons
              name={`Download`}
              type="button"
              disabled={!downloadStatus}
              className={downloadStatus ? "download__model" : "download__model--disabled"}
              />
          </a>
        {/* </Link> */}
        <Box />
      </Box>

    </Grid >
  )
}
export default ProductInfo
