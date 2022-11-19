import React from 'react'
import {
  Typography,
  styled
} from '@mui/material';
import { ThemeProps } from '../../types/ThemeTypes'
type TypographyProps = {
   text: string,
   variant ?: any,
   className ?: string,
   children? : any
};
const TypographyWrapper = styled(Typography)(
  // text-transform: capitalize;
  ({ theme }: ThemeProps) => `
      color:  ${theme.colors.gray[600]};
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
      transition: all 0.4s ease;

      &.MuiTypography-modal__title {
        font-size: 30px;
        fontWeight: 500;
        margin-bottom:12px;
      }

      &.MuiTypography-card__title {
        font-weight: 400;
        font-size: 13px;
        color: ${theme.colors.gray[700]};
      }

      &.MuiTypography-modal__sub-title {
        font-weight: 400;
        font-size: 16px;
        line-height: 140%;
        color: ${theme.colors.gray[700]};
      }

      &.MuiTypography-card__title-dollar {
        font-weight:bold;
        font-size: 18px;
        line-height: 120%;
        letter-spacing: -0.01em;
        color: #141414;
      }

      &.MuiTypography-footer__desc{
        margin:14px 0 8px 0;
        font-weight: 400;
        font-size: 13px;
        color: ${theme.colors.gray[600]};
      }

      &.MuiTypography-footer__link{
        padding:9px;

        &:hover{
          background:  ${theme.colors.gray[50]};
          color: #141414;
        }
      }
      &.MuiTypography-footer__title{
        text-align:start;
        font-weight: 600;
        font-size: 18px;
        line-height: 120%;
        margin-bottom:18px;
        color: ${theme.colors.gray[700]};
      }

      &.MuiTypography-section__title{
        font-weight: 500;
        font-size: 22px;
        line-height: 120%;
        letter-spacing: -0.02em;
        color: #000;
        margin-bottom:12px;
      }

      &.MuiTypography-pagenation__desc{
        font-weight: 400;
        font-size: 14px;
        line-height: 140%;
        color: ${theme.colors.gray[600]};
      }

      &.MuiTypography-pagenation__desc--bold{
        font-weight: 600;
        margin-left: 5px;
      }

      &.MuiTypography-user__name{      
        color: ${theme.colors.gray[700]};
        margin-left: 6px;
        margin-right: 9px;
      }

      &.MuiTypography-card__sale{
        position:absolute;
        top: 5px;
        right: 5px;
        font-size: 12px;
        line-height: 120%;
        letter-spacing: 0.02em;
        color:#fff;
        background: ${theme.colors.danger[500]};
        padding: 2px 4px;
        z-index: 10;
      }
      
      &.MuiTypography-category__title{
        font-size: 18px;
        line-height: 22px;
        padding-top: 16px;
        padding-bottom: 16px;
      }

      &.MuiTypography-category__text{
        font-size: 14px;
        line-height: 17px;
        color: #303030;
      }

      &.MuiTypography-category__arrow-title{
        font-weight:400;
        font-size: 18px;
        line-height: 22px;
        padding-top: 16px;
        padding-bottom: 16px;
        margin-left:15px;
        cursor:pointer
      }
      &.MuiTypography-category__link{
        color: #1D5BF9;
        text-decoration: none;
        border-bottom: 2px solid #B7CBFD;
        &:hover{
          color: #5584FA;
        }
      }
      &.MuiTypography-category__name{
        font-weight: 500;
        font-size: 18px;
        line-height: 22px;
        padding 20px 0 16px 0;
      }

      &.MuiTypography-product__info--title{
        font-weight: 500;
        font-size: 30px;
        line-height: 36px;
        letter-spacing: -0.02em;
        color: #141414;
        margin-bottom: 6px;
      }

      &.MuiTypography-product__info--desc{
        max-width:507px;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        margin-bottom: 28px;
        color: #424242;
      }

      &.MuiTypography-table__text{
        font-weight: 400;
        font-size: 16px;
        line-height: 140%;
        text-align: start
      }

      &.MuiTypography-table__link{
        color: #1D5BF9;
        text-decoration: none;
        text-align: start;
        border-bottom: 2px solid #B7CBFD;
        width: fit-content;

        &:hover{
          color: #5584FA;
        }
      }

      &.MuiTypography-material__title{
        color: #424242;
        margin-right:3px;
        margin-bottom: 6px;
      }

      &.MuiTypography-material__text{
        color: #000
      }

      &.MuiTypography-download__button--text{
        font-weight: 400;
        font-size: 14px;
        color: #141414;
      }

      &.MuiTypography-download__button--mb{
        font-weight: 400;
        font-size: 13px;
        color: #424242;
        text-align:start
      }


      &.MuiTypography-account__title{
        font-size: 30px;
        line-height: 120%;
        letter-spacing: -0.02em;
        color: #000;
        margin-bottom: 16px;
      }

      &.MuiTypography-user__name{
        font-size: 20px;
        line-height: 120%;
        letter-spacing: -0.02em;
        color: #303030;
        margin-top:10px;
        margin-bottom:4px;
      }

      &.MuiTypography-user__email{
        font-weight: 400;
        font-size: 16px;
        color: #424242;
      }

      &.MuiTypography-billing__info--text{
        font-size: 14px;
        line-height: 120%;
        color: #141414;
      }

      &.MuiTypography-table__material--text{
        font-weight: 400;
        font-size: 16px;
        line-height: 140%;
        color: #141414;
        margin-right:3px
      }

      &.MuiTypography-not-found__title{
        font-size: 42px;
        line-height: 120%;
        letter-spacing: -0.02em;
        color: #303030;
        margin-bottom:16px;
      }

      &.MuiTypography-not-found__text{
        font-weight: 400;
        font-size: 16px;
        color: #686868;
        max-width:338px;
        margin-bottom:24px;
      }

      &.MuiTypography-modal__title{
        font-weight: bold;
        font-size: 30px;
        line-height: 120%;
        letter-spacing: -0.02em;
        color: #141414;
      }

      &.MuiTypography-buy__dollar{
        font-weight: bold;
        font-size: 17px;
        line-height: 140%;
        color: #fff;
        margin-left:3px;
      }

      &.MuiTypography-drow-down__text{
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        color: #303030;
        margin-left:8px;
      }

      &.MuiTypography-filters__title{
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #686868;
        margin-right: 12px;
      }

      &.MuiTypography-filters__item--text{
        font-weight: 400;
        font-size: 14px;
        line-height: 20px;
        margin-right: 2px;
        color: #303030;
      }

      &.MuiTypography-filters__clear--text{
        font-size: 12px;
        line-height: 14px;
        letter-spacing: 0.02em;
        color: #1D5BF9;
        margin-left:4px
      }

      &.MuiTypography-edit__account--text{
        font-size: 16px;
        line-height: 22px;
        color: #1D5BF9;
        border-bottom: 1.5px solid #B7CBFD;
      }
      
      &.MuiTypography-brand__name{
        text-align: start;
        font-weight: 400;
        font-size: 16px;
        line-height: 22px;
        color: #A6A6A6;
      }

      &.MuiTypography-brand__title{
        font-size: 18px;
        line-height: 22px;
        letter-spacing: -0.01em;
        color: #0432A6;
        border-bottom: 1.5px solid #B7CBFD;
        margin-bottom:16px;
        width: fit-content;

        &:hover{
          opacity:0.7
        }
      }

      &.MuiTypography-brand__box--text{
        text-align:start;
        font-size: 14px;
        line-height: 17px;
        color: #424242;
      }

      &.MuiTypography-back__text{
        font-size: 14px;
        line-height: 17px;
        color: #0646E6;
        border-bottom: 1.2px solid #B7CBFD;
        margin-left:8px
      }

      &.MuiTypography-breadcumb__text{
        font-size: 14px;
        line-height: 17px;
        margin-right:9px;
        color: #686868;
      }

      &.MuiTypography-header__bag--count{
        width:20px;
        height:17px;
        position: absolute; 
        right: -8px;
        top: -8px;
        font-size: 12px;
        line-height: 14px;
        display: flex;
        align-items: center;
        letter-spacing: 0.02em;
        color: #fff;
        z-index: 2;
        background: #141414;
        border: 1px solid #fff;
        border-radius: 10px;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
      }

      &.MuiTypography-singIn__text{
        font-size: 12px;
        line-height: 14px;
        letter-spacing: 0.02em;
        color: #424242;
      }

      &.MuiTypography-brand__name--text{
        font-weight: 400;
        font-size: 18px;
        line-height: 22px;
        letter-spacing: -0.01em;
        color: #A6A6A6;
      }

      &.MuiTypography-brand__name--title{
        font-weight: 600;
        font-size: 34px;
        line-height: 41px;
        letter-spacing: -0.02em;
        color: #141414;
        margin-bottom:40px
      }

      &.MuiTypography-brand__desc{
        font-weight: 400;
        font-size: 20px;
        line-height: 30px;  
        letter-spacing: -0.02em;
        color: #303030;
        margin:6px 0 40px 0;
      }
`
);

const SimpleTypography = (props: TypographyProps) => {
  return (
    // <Button className={`${classes.styles} MuiButton-text-${props.color} MuiButton-bg-${props.color}`}>{props?.name}</Button>
    <TypographyWrapper 
        className={`MuiTypography-${props?.className}`} 
        variant={props?.variant} 
      >
     {props?.text}
     {props?.children}
    </TypographyWrapper>
  )
}

export default SimpleTypography