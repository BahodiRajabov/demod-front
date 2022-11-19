import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginState, setSignupState, setVerifyState, setOpenModal } from '../../../data/modal_checker';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Link from 'next/link';
import SimpleTypography from '../../Typography';
import BasicModal from '../../Modals/LoginModal';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Buttons from '../../Buttons';
import { selectMyProfile } from '../../../data/me'
import { CircularProgress } from '@mui/material';
import { ThemeProps } from '../../../types/ThemeTypes';
import SearchInput from '../../Inputs/searchInput';
import Cookies from 'js-cookie'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const DropDown = styled(Menu)(
  ({ theme }: ThemeProps) => `

  .MuiList-root{
    width:120px;
    border: 1px solid #E0E0E0;
    border-radius: 2px;
    padding:10px 12px;
    
  }

  .MuiPaper-root{
    border-radius:0 !important;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.18);
  }
  `
);

const Header: React.FC = () => {

  const isAuthenticated = useSelector((state: any) => state?.auth_slicer?.authState)
  const userData = useSelector(selectMyProfile)
  const router = useRouter();
  //declare dispatcher
  const dispatch = useDispatch<any>();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    Cookies.remove('accessToken')
    Cookies.remove('refreshToken')
    router.reload();
    setAnchorEl(null);
  }
  return (
    <>
      <BasicModal />
      <Box sx={{ flexGrow: 1, maxHeight:"64px ",background: "#fff", borderBottom: "1px solid #e0e0e0", marginBottom: "32px" }}>
        <Grid container spacing={2} sx={{ maxWidth: "1200px", margin: "0 auto", alignItems: "center", position: "relative" }}>
          <DropDown
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >

            <MenuItem
              onClick={handleClose}
              sx={{ padding: "6px 0" }}
            >
              <Link href='/profile'>
                <a style={{ textDecoration: "none", display: "flex" }}>
                  <Image
                    src="/img/icon/user-icon.svg"
                    alt="user icon"
                    width="11px"
                    height="14px"
                  />
                  <SimpleTypography className='drow-down__text' text='My account' />
                </a>
              </Link>
            </MenuItem>

            <MenuItem sx={{ padding: "6px 0" }}>
              <Image
                src="/img/icon/heart-icon.svg"
                alt="heart icon"
                width="11px"
                height="14px"
              />
              <SimpleTypography className='drow-down__text' text='Option' />
            </MenuItem>

            <MenuItem sx={{ padding: "6px 0" }} onClick={handleLogout}>
              <Image
                src="/img/icon/logout-icon.svg"
                alt='logout icon'
                width="11px"
                height="14px"
              />
              <SimpleTypography className='drow-down__text' text='Logout' />
            </MenuItem>

          </DropDown>


          <Grid item xs={3} sx={{ padding: "12px 0 !important", display: "flex", }}>
            <Item sx={{ padding: "0", width: "280px" }}>
              <SearchInput placeHolder="Search..." className='' startIcon={true}></SearchInput>
            </Item>
          </Grid>

          <Grid item xs={6} sx={{ padding: "12px !important", display: "flex", justifyContent: "center" }}>
            <Item sx={{ padding: "0", height: "27px" }}>
              <Link href="/">
                <a>
                  <Image alt="logo" src="/img/demod.svg" width={110} height={24} />
                </a>
              </Link>
            </Item>

          </Grid>


          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              padding: "12px 0 !important",
              alignItems: "center",
              justifyContent: "flex-end"
            }}
          >
            {/* 
            <Item sx={{ padding: "0", marginRight: "39px" }}>
              <Link href="/">
                <a>
                  <SimpleTypography text="Page 1" />
                </a>
              </Link>
            </Item> */}

            <Item
              sx={{
                display: "flex",
                padding: "0",
                marginRight: "16px",
                width: "40px",
                height: "40px",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              {/* <Link style={{ display: 'flex',position:"relative" }} href="/">
                <a style={{ display: 'flex',position:"relative" }}>
                  <SimpleTypography className='header__bag--count' text='2'/>
                  <Image
                    alt="bag"
                    src="/icons/bag-icon.svg"
                    width={18}
                    height={20}
                  />
                </a>
              </Link> */}
            </Item>

            {
              isAuthenticated ?

                <Item sx={{ padding: "0", display: "flex" }}>
                  <Button
                    id="basic-menu"
                    aria-controls={'basic-menu'}
                    aria-haspopup="true"
                    aria-expanded={true}
                    onClick={handleClick}
                    sx={{ padding: "0", display: "flex" }}
                  >
                    <Box
                      sx={{ display: "flex", alignItems: "center" }}
                    >
                      <Image
                        width="28px"
                        height="28px"
                        alt='user icon'
                        src="/img/user.png"
                      />
                      <SimpleTypography
                        text={
                          userData?.full_name ?
                            userData?.full_name :
                            <CircularProgress size="1rem" />
                        }
                        className='user__name'
                      />
                      <Image
                        width="11px"
                        height="7px"
                        alt='user icon'
                        src="/icons/user-arrow.svg"
                      />
                    </Box>
                  </Button>

                </Item> :

                <Item sx={{ padding: "0", display: "flex" }}>
                  <Box sx={{ marginRight: "16px" }}>
                    <Buttons
                      name="Sign up"
                      onClick={() => {
                        dispatch(setSignupState(true))
                        dispatch(setOpenModal(true))
                      }}
                      className="bordered__btn"
                    />
                  </Box>
                  <Buttons
                    name="Log in"
                    onClick={() => {
                      dispatch(setLoginState(true));
                      dispatch(setOpenModal(true))
                    }}
                    className="login__btn"
                  />
                </Item>
            }
          </Grid>
        </Grid>
      </Box>
    </>
  )
}

export default Header
