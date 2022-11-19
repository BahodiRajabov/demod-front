import React, { useState, useMemo } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Link from 'next/link';
import SimpleTypography from '../../Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ThemeProps } from '../../../types/ThemeTypes';
const index = () => {
  const Item = styled(Paper)(({ theme }: ThemeProps) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const footerList = [
    {
      text:"About us",
      url:"about-us"
    },
    {
      text:"Terms & Conditions",
      url:"terms-condications"
    },
    {
      text:"Company",
      url:"company"
    },
    {
      text:"Blog",
      url:"blog"
    },
    {
      text:"Community",
      url:"community"
    },
    {
      text:"Careers",
      url:"careers"
    },
  ]

  const socialMedia = [
    {
      icon:"/icons/instagram-icon.svg",
      url:"/",
      margin:true
    },
    {
      icon:"/icons/telegram-icon.svg",
      url:"/",
      margin:true
    },
    {
      icon:"/icons/facebook-icon.svg",
      url:"/",
      margin:true
    },
    {
      icon:"/icons/twitter-icon.svg",
      url:"/",
      margin:false
    }
  ]

  return (
    <footer>
      <Box sx={{ flexGrow: 1,borderBottom:"1px solid #e0e0e0",paddingTop:"48px",background:"#fff" }}>
        <Grid container spacing={2} sx={{maxWidth:"1200px",margin:"0 auto"}}>
          <Grid item xs={3} sx={{padding:"0 !important",display:"flex",justifyContent:"flex-start"}}>
            <Item sx={{padding:"0",display:"flex",flexDirection:"column",alignItems:"start"}}>
              <Link href="/">
                <a>
                  <Image
                    width="110"
                    height="24"
                    src="/img/demod.svg"
                  ></Image>
                </a>
              </Link>
            </Item>
          </Grid>
          <Grid item xs={3} sx={{padding:"0 !important",display:"flex",justifyContent:"center"}} >
            <Item sx={{padding:"0"}}>
              <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper',padding:"0" }}>
                {
                  footerList.slice(0,3).map((item,i) => (
                    <ListItem
                      key={i}
                      sx={{padding:"0"}}
                    >
                      <Link href={item.url}>
                        <a >
                          <SimpleTypography text={item.text} className='footer__link'></SimpleTypography>
                        </a>
                      </Link>
                    </ListItem>
                  ))
                }
              </List>
            </Item>
          </Grid>
          <Grid item xs={3} sx={{padding:"0 !important",display:"flex",justifyContent:"center"}} >
            <Item sx={{padding:"0"}}>
              <List sx={{ width: '100%', bgcolor: 'background.paper',padding:"0" }}>
                {
                  footerList.slice(3,6).map((item,i) => (
                    <ListItem
                      key={i}
                      sx={{padding:"0"}}
                    >
                      <Link href={item.url}>
                        <a >
                          <SimpleTypography text={item.text} className='footer__link'></SimpleTypography>
                        </a>
                      </Link>
                    </ListItem>
                  ))
                }
              </List>
            </Item>
          </Grid>
          <Grid item xs={3} sx={{padding:"0 !important",display:"flex",justifyContent:"flex-end"}} >
            <Item sx={{padding:"0"}}>
              <SimpleTypography text="Contact us" className='footer__title'></SimpleTypography>
              <List sx={{ width: '100%',display:"flex", bgcolor: 'background.paper',padding:"0" }}>
                {
                  socialMedia.map((item,i) => (
                    <ListItem
                      key={i}
                      sx={{padding:"0",marginRight:`${item.margin ? "36px" : "0"}`}}
                    >
                      <Link href={item.url}>
                        <a target="_blank">
                          <Image
                            width={20}
                            height={20}
                            src={item.icon} 
                          ></Image>
                        </a>
                      </Link>
                    </ListItem>
                  ))
                }
              </List>
            </Item>
          </Grid>
          <SimpleTypography text="© 2022 Tridmo Inc. Tashkent, Uzbekistan." className='footer__desc'></SimpleTypography>
        </Grid>
      </Box>
    </footer>
  )
}

export default index