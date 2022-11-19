import { useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SearchInput from '../../Inputs/searchInput';
import { ThemeProps } from '../../../types/ThemeTypes';
import DropwDown from '../../DrowDown';

const Navbar = () => {
  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)

  const Item = styled(Paper)(({ theme }: ThemeProps) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  return (
    <div>
      <Box sx={{ flexGrow: 1,boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)" }}>
          <Grid container spacing={2} sx={{maxWidth:"1200px",margin:"0 auto",alignItems:"center"}}>
            <Grid item xs={3} sx={{padding:"20px 0 !important",display:"flex",justifyContent:"flex-start"}}>
              <Item sx={{padding:"0"}}>
                <SearchInput placeHolder="Search..." className='' startIcon={true}></SearchInput>
              </Item>
            </Grid>
            <Grid item xs={9} sx={{padding:"20px 0 !important",display:"flex",justifyContent:"flex-end"}}>
              {/* <Item sx={{padding:"0",marginRight:"12px"}}>
                <DropwDown/>
              </Item>
              <Item sx={{padding:"0"}}>
                <DropwDown/>
              </Item> */}
            </Grid>
          </Grid>
      </Box>
    </div>
  )
}

export default Navbar
