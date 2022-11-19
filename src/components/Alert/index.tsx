import { Button } from '@mui/material';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { styled } from '@mui/material';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';
interface AlertWrapperProps {
  position?: "top-right" | "top-center" | "top-left" | "bottom-right" | "bottom-center" | "bottom-left",
}

function AlertWrapper(props: AlertWrapperProps) {
  const StyledContainer = styled(ToastContainer)`
   &&&.Toastify__toast-container {}
   .Toastify__toast {
      border-radius: 0; 
   }
`;
  return (
    <div>
      {/* <Button>Notify !</Button> */}
      <StyledContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        //  bodyClassName={()=> ""}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
export default AlertWrapper;