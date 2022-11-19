import { Box, Grid } from '@mui/material'
import Image from "next/image"
import Link from 'next/link'
import Buttons from '../Buttons'
import SimpleTypography from '../Typography'
import Header from '../views/Header'

function ConnectionError() {
  return (
    <Box>
      <Box sx={{ maxWidth: "1200px", margin:"0 auto" }}>
        <Grid sx={{marginTop:"32px",alignItems:"center"}} container spacing={2}>
          <Grid sx={{ display: "flex",justifyContent: "end"}} item xs={6}>
            <Image src="/img/connection-error.svg" alt="Connection error" width={500} height={500}/>
          </Grid>
          <Grid sx={{paddingLeft:"56px !important"}} item xs={6}>
            <SimpleTypography className="not-found__title" text="Something went wrong..."/>
            <SimpleTypography className="not-found__text" text="Make sure your connection is good and try refreshing this page."/>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}


export default ConnectionError;
