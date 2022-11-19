import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Grid, Box } from '@mui/material'
import SimpleCard from '../../SimpleCard'
import SimpleTypography from '../../Typography'
import Pagination from '../../Pagination/pagination'
import Categories from '../../views/Categories'
import { selectAllModels } from '../../../data/get_all_models';
import { setPageFilter } from '../../../data/handle_filters'
import ColorsFilter from '../../views/Colors'
import Style from '../../views/ModelStyles'
import Filters from '../../views/Filters'


export default function HomePage() {
  const dispatch = useDispatch<any>();
  const all__models = useSelector(selectAllModels)
  
  
  return (
      <Box sx={{ width: '1200px', minHeight: 829, display: "block", margin: "0 auto" }}>
        <Grid spacing={2} container sx={{marginTop:"32px"}} >
          <Grid xs={2.2} sx={{paddingRight:"10px",borderRight: "1px solid #b3b3b3"}}>
            <Categories />
            <Grid xs={11}>
              <ColorsFilter />
            </Grid>
            <Style />
          </Grid>
          <Grid xs={9.5} style={{ paddingLeft:"16px"}} sx={{minHeight:"100vh"}}>
            <SimpleTypography text='Section name' className='section__title' />
            <Filters />
            {/* ---- MODEL CARDS ---- */}

              <SimpleCard />


            {/* ---- MODEL CARDS ---- */}
            
          </Grid>
        </Grid>
        <Grid spacing={2} container sx={{ margin: "0 auto", padding:"17px 0 32px 0" }}>
          <Grid 
            sx={{padding:"0 0 0 223px !important", display:"flex", alignItems:"baseline"}} 
            item 
            xs={6}
          >
            <SimpleTypography 
              text={`Showing ${all__models[0]?.pagination?.current + 1}–${all__models[0]?.pagination?.limit} of`} 
              className='pagenation__desc' 
            />

            <SimpleTypography 
              text={`${all__models[0]?.pagination?.pages*all__models[0]?.pagination?.limit} items`} 
              className='pagenation__desc--bold' />
          </Grid>
          <Grid 
            item 
            xs={6}
            sx={{padding:"0 !important", display:"flex", justifyContent:"flex-end"}} 
            >
              <Pagination  
                count={all__models[0]?.pagination?.pages}
                page={parseInt(all__models[0]?.pagination?.current) + 1}
                // page={page}
                // pageArray={pageArray}
                // pagesCount={pagesCount}
                // increment={(e, data) => {
                //   props.setPage(page + 1);
                // }}
                // changePage={(e, data) => {
                //   setPage(data);
                // }}
                // decrement={(e, data) => {
                //   setPage(page - 1);
                // }}
                // const handleChange = (event, value) => {
                //   props.changePage(event,value)
                // };
                // count={props.pagesCount} page={+props.page} onChange={handleChange}
              />
          </Grid>
        </Grid>
      </Box>
  )
}
