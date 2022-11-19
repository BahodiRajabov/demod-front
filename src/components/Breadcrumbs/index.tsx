import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import GrainIcon from '@mui/icons-material/Grain';
import { Box, ListItem } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { List } from 'react-content-loader';
import SimpleTypography from '../Typography';
import Image from 'next/image';
import { useRouter } from 'next/router'
interface breadCrumbProps {
  style?: string | undefined,
  direction?: string,
  category?: string,
  model_name?: string,
  breadCrumbsData?: any
}
export default function IconBreadcrumbs(props: breadCrumbProps) {
  const router = useRouter()
  console.log(router, "hihihihihih")
  return (
    <Box
      sx={{
        maxWidth: "1200px",
        margin: "0 auto",
        alignItems: "center",
      }}
    >

      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ marginRight: "10px" }}>
          <Box sx={{ cursor: 'pointer' }} onClick={() => router.back()}>
            <a style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
              <Image alt="Go back" src="/icons/go-back.svg" width={5} height={9}></Image>
              <SimpleTypography className='back__text' text='Go back' />
            </a>
          </Box>
        </Box>

        <Box sx={{ marginRight: "10px" }}>
          <Box>
            <a style={{ display: "flex", textDecoration: "none" }}>
              <SimpleTypography
                className='breadcumb__text'
                text={props?.breadCrumbsData?.data?.category?.name} />
              <Image
                src="/icons/breadcrumb-arrow.svg"
                alt="Breadcrumd arrow"
                width={5}
                height={9}
              />
            </a>
          </Box>
        </Box>
        <Box sx={{ marginRight: "10px" }}>
          <Box>
            <a style={{ display: "flex", textDecoration: "none" }}>
              <SimpleTypography
                className='breadcumb__text'
                text={props?.breadCrumbsData?.data?.category?.parent_name} />
              <Image
                src="/icons/breadcrumb-arrow.svg"
                alt="Breadcrumd arrow"
                width={5}
                height={9}
              />
            </a>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
