import React, { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { SimpleCardsSkeleton } from '../Skeleton/FakeModels'
import { Grid } from '@mui/material'
import SimpleTypography from '../Typography'

const SimpleCard = dynamic(() => import('./index'), {
   loading: () => <div>...</div>,
   suspense: true,
 })

const GroupCard = () => {
  return (
   <Suspense fallback={<SimpleCardsSkeleton />}>
      <Grid xs={9} sx={{minHeight:"100vh"}}>
         <SimpleTypography text='Section name' className='section__title' />
         {/* ---- MODEL CARDS ---- */}
         
         <SimpleCard />

         {/* ---- MODEL CARDS ---- */}

      </Grid>
   </Suspense>
  )
}

export default GroupCard