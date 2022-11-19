import * as React from 'react';
import {Box, Button, Typography, Modal, keyframes} from '@mui/material';
import Image from 'next/image'
import { Grid } from '@mui/material';
import { style } from './Modal'
import { SignUpContext, LoginContext, VerificationContext} from './Context'
import { useDispatch, useSelector } from '../../store';
import { setLoginState, setSignupState, setVerifyState, setOpenModal } from '../../data/modal_checker';
import AlertWrapper from '../Alert';
import LoadingBar from 'react-top-loading-bar';


export default function BasicModal() {
  const [userEmail, setUserEmail] = React.useState('');
  const [progress, setProgress] = React.useState(0);
     
  //open certain modal by its status
  const isLoginOpen = useSelector((state: any)=> state?.modal_checker?.isLogin);
  const isSignupOpen = useSelector((state: any)=> state?.modal_checker?.isSignup);
  const isVerifyOpen = useSelector((state: any)=> state?.modal_checker?.isVerify);
  const isModalOpen = useSelector((state: any)=> state?.modal_checker?.isModalOpen);

  //declare dispatcher
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setSignupState(false))
    dispatch(setLoginState(false))
    dispatch(setVerifyState(false))
    dispatch(setOpenModal(false))
  };
  const modalSlider = keyframes`
    from{
      transform:translateX(100%)
    }
    to{
      transform:translateX(0)
    }
  `

  const myModalStyle: React.CSSProperties = {
    animation: `${modalSlider}  0.7s linear forwards`
  }

  return (
    <div>
      <LoadingBar 
        color={"#ff0000"} 
        progress={progress}
      />
      <AlertWrapper position="top-right"/>
      <Modal
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          { isSignupOpen ? 
              <SignUpContext 
                setUserEmail={(email: any)=>{setUserEmail(email)}}
              /> : 
            isLoginOpen ?
              <LoginContext
                setUserEmail={(email: any)=>{setUserEmail(email)}}
              /> 
            :
            isVerifyOpen ?  
              <VerificationContext  
                userEmail={userEmail} 
                setProgress={(val: any)=>{setProgress(val)  }}
              />  
            : null  
          } 
        </Box>  
      </Modal>
    </div>
  );
}
