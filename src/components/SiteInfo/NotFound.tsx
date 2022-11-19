import { Box, Grid } from '@mui/material'
import Image from "next/image"
import Link from 'next/link'
import Buttons from '../Buttons'
import SimpleTypography from '../Typography'
import Header from '../views/Header'

function NotFound() {
  return (
    <Box>
      <Header />
      <Box sx={{ maxWidth: "1200px", margin:"0 auto" }}>
        <Grid sx={{marginTop:"32px",alignItems:"center"}} container spacing={2}>
          <Grid sx={{ display: "flex",justifyContent: "end"}} item xs={6}>
            <Image src="/img/notFound.svg" alt="404 not found" width={500} height={500}/>
          </Grid>
          <Grid sx={{paddingLeft:"56px !important"}} item xs={6}>
            <SimpleTypography className="not-found__title" text="Page not found"/>
            <SimpleTypography className="not-found__text" text="The page you are looking for no longer exists. You can return back to the site’s homepage and see if you can find what you are looking for."/>
            <Link href="/">
              <a>
                <Buttons className="not-found__btn" name="Home page">
                  <Image className='not-found__btn--arrow' alt="To home page" src="/icons/rotate-arrow.svg" width={11} height={11}/>
                </Buttons>
              </a>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}


export default NotFound
