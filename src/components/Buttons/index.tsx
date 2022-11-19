import React, { Children } from 'react'
import {
  Button,
  Avatar,
  styled,
  CircularProgress
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ThemeProps } from '../../types/ThemeTypes';

type ButtonsProps = {
  name: string,
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"] | "button",
  className: string,
  children?: any,
  disabled?: boolean,
  startIcon?: boolean,
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  endIcon?: string,
  bgColor?: string,
};
const ButtonWrapper = styled(Button)(
  ({ theme }: ThemeProps) => `
      text-transform: inherit;
      width:auto;
      height:43px;
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
      color:  ${theme.colors.primary[100]};
      transition: all 0.4s ease;

      &.MuiButton-bordered__btn {
        height:40px;
        color:${theme.colors.gray[700]};
        background-color: white;
        padding:0 20px ;
        position:relative;
        border: 1.7px solid transparent;

        &::before{
          content:"";
          position:absolute;
          right:0;
          top:0;
          width:100%;
          height:105%;
          border: 1.7px solid ${theme.colors.gray[300]};
          transition: all 0.4s ease;
          border-radius: ${theme.shape.button.borderRadius}px !important;
        }
        
        &:hover::before{
          border: 2.5px solid ${theme.colors.gray[300]};  
        } 
      }

      &.MuiButton-login__btn {
        height:40px;
        border: 1.7px solid ${theme.colors.gray[900]};
        color:white;
        background-color: ${theme.colors.gray[900]};
        padding:0 20px ;
        border-radius:4px;
        
        &:hover{
          background-color:${theme.colors.gray[700]};
          border-color: ${theme.colors.gray[700]};
          
        }   
      } 
      &.MuiButton-underlined__btn {
        min-width:47px;
        padding:0;
        font-size: 16px;
        line-height: 22px;
        height:auto;
        color: #1D5BF9;
        border-bottom: 1.5px solid #B7CBFD;
        background:transparent;
        border-radius:0;
        margin-left:8px;

        &:hover{
          background-color:white;
          border-color: ${theme.colors.gray[700]};
        }  
      }

      &.MuiButton-signIn__btn{
        width:100%;
        background: #7210BE;
        color:#fff;
        margin-top: 24px;
        margin-bottom: 10px;
        border-radius:5px;

        &:hover{
          background: #9E35EE;  
        }

        &:disabled{
          background: #E0E0E0;
          color: #686868; 
        }
      }

      &.MuiButton-download__zip--file{
        padding: 4px 12px;
        border: 1px solid #e0e0e0;
        margin-right:10px;
        border-radius: 5px;
        cursor:text;
      }

      &.MuiButton-download__model{
        width: 258px;
        background: #7210BE;
        border-radius: 5px;
        font-size: 16px;
        line-height: 22px;
        text-align: center;
        color: #fff;

        &:hover{
          background: #9E35EE;
        }
        &--disabled{
          pointer-events: none;
          width: 258px;
          background: #7210BE;
          border-radius: 5px;
          font-size: 16px;
          line-height: 22px;
          text-align: center;
          color: #fff;
          }
      }

      &.MuiButton-slider__right--arrow{
        position: absolute;
        z-index: 10;
        top:50%;
        right:0;
        transform: translateY(-50%);
        min-width: 44px;  
        height:44px;
        padding:0;
        background: rgba(250, 250, 250, 0.6);
        border-radius: 4px;
      }
      
      &.MuiButton-slider__left--arrow{
        position: absolute;
        z-index: 10;
        top:50%;
        left:0;
        transform: translateY(-50%);
        min-width: 44px;
        height:44px;
        padding:0;
        border-radius: 4px;
        background: rgba(250, 250, 250, 0.6);
      }
      &.MuiButton-explore__btn{
        border: 1.7px solid #B3B3B3;
        padding: 9px 16px;
        color: #303030;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
      }

      &.MuiButton-colors__btn{
        width: 26px;
        height: 26px;
        border-radius:50%;
        min-width: 26px;
        margin-bottom:9px;
        position: relative;

        .btn__check{
          opacity:0
        }

        &:not(:last-child){
          margin-right:13px
        }

        &:hover::before {
          opacity:1;
        }

        &::before{
          content:"";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: 32px;
          height: 32px;
          border: 2px solid #cd96f6;
          border-radius:50%;
          opacity:0;
          transition: all 0.4s ease;
        }
      }

      &.colors__active--btn::before{
        opacity:1
      }

      &.colors__active--btn .btn__check{
        opacity: 1  
      }

      &.MuiButton-not-found__btn{
        padding:9px 20px;
        background: #141414;
        font-weight: 500;
        font-size: 16px;
        line-height: 140%;
        color: #fff;
        display:flex;
        align-items: center;
        cursor:pointer;

        span{
          margin-right:10px !important;
        }
        
      }

      &.MuiButton-upload__img--btn{
        border: 1.7px solid #b3b3b3;
        padding:9px 20px;
        font-weight: bold;
        font-size: 16px;
        line-height: 140%;
        color: #303030;
        display:flex;
        flex-direction: row-reverse;
        border-radius: 4px;

        img{
          margin-right:6px !important
        }

      }

      &.MuiButton-filters__item--close{
        min-width: 28px;
        width: 28px;
        height: 28px;
        padding:0;
        border-radius:50%;
        background: transparent;
        display: flex;
        align-items: center;
        justify-content: center;

        svg{
          color:#686868;
          transition: all 0.4s ease;
          font-size:15px;
        }

      }
      

      &.MuiButton-filters__clear--btn{
        padding:0;
        height:16px;
        margin-left:22px;
      }

      &.MuiButton-profile__done--btn{
        width:100%;
        background: #7210BE;
        border-radius: 4px;
        font-size: 16px;
        line-height: 22px;
        color: #FFFFFF;
      }

      &.MuiButton-edit__account--btn{
        position: absolute;
        right: 20px;
        top: 20px;
        padding:0;
        min-width:auto;
        height:auto
      }

      &.MuiButton-product__btn{
        border: 1px solid #E0E0E0;
        border-radius: 5px;
        padding:5px 20px;
        height:auto
      }

      &.MuiButton-brand__box{
        background: #fff;
        border: 1px solid #E0E0E0;
        border-radius: 5px;
        padding:8px 15px;
        width:282px;
        height:auto;
        margin-bottom:10px;
        display: flex;
        align-items: center;
        justify-content: start;

        &:hover{
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
          background: #FAFAFA;
        }
      }

`
);
const Buttons = (props: ButtonsProps) => {
  return (
    <ButtonWrapper
      onClick={props?.onClick}
      startIcon={props?.startIcon ? <CircularProgress size="1rem" /> : null}
      endIcon={props?.endIcon === "explore" ? <ArrowForwardIcon /> : null}
      disabled={props?.disabled}
      type={props?.type}
      className={`MuiButton-${props?.className}`}
      sx={{ background: props.bgColor, ":hover": { background: props.bgColor } }}
    >
      {props.name}
      {props.children}

    </ButtonWrapper>
  )
}

export default Buttons