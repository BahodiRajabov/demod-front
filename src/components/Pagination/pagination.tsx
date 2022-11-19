import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllModels } from '../../data/get_all_models';
import { styled, Pagination } from '@mui/material';
import { ThemeProps } from '../../types/ThemeTypes'
import { setPageFilter } from '../../data/handle_filters'
interface PaginationProps  {
  count ?:number,
  page ?:number,
  onChange?(name: string): number;
};

const SimplePagination = styled(Pagination)(
  ({ theme }: ThemeProps) => 
    ` 
    .Mui-disabled{
      background: ${theme.colors.gray[50]};
      border: 1.7px solid ${theme.colors.gray[100]};
      
      &.MuiPaginationItem-previousNext svg{
        fill:${theme.colors.gray[400]}
      }
    }

    .MuiPaginationItem-previousNext{
      border-radius:0;
      width:40px;
      height:40px;
      padding:0;
      margin:0;
      border: 1.7px solid transparent;
    }

    .MuiPaginationItem-previousNext svg{
      width:24px;
      height:24px;
    }

    .css-wjh20t-MuiPagination-ul li:last-child button{
      background:${theme.colors.primary[500]};
      border-color: ${theme.colors.primary[500]};

      &.MuiPaginationItem-previousNext svg{
        fill:#fff
      }

      &:hover{
        background:${theme.colors.primary[400]};
        border-color: ${theme.colors.primary[400]};
      }
    }

    .css-wjh20t-MuiPagination-ul li:last-child .Mui-disabled{
      background: ${theme.colors.gray[100]};
      border-color: ${theme.colors.gray[100]};
      opacity: 1 !important;

      &.MuiPaginationItem-previousNext svg{
        fill:${theme.colors.gray[500]};
      }
    }

    .css-wjh20t-MuiPagination-ul li:nth-of-type(1) button{
      background: transparent;
      border-color: ${theme.colors.gray[300]};

      &.MuiPaginationItem-previousNext svg{
        fill:${theme.colors.gray[700]};
      }
    }

    .css-wjh20t-MuiPagination-ul li{
      width:40px;
      height:40px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .MuiPaginationItem-page{
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
      color: ${theme.colors.gray[600]};
      border-bottom: 1.7px solid transparent;
    }

    .Mui-selected{
      border-bottom: 1.7px solid #141414;
      border-radius:0;
      color: #141414;
      font-weight: 500;
      font-size: 16px;
      line-height: 140%;
    }
    `
)

export default function BasicPagination(props: PaginationProps) {
  const dispatch = useDispatch<any>();

  // ---- filters selector ----- //
  const getModelCategoryFilter = useSelector((state: any)=> state?.handle_filters?.categories)
  const getModelColorFilter = useSelector((state: any)=> state?.handle_filters?.colors)
  const getModelStyleFilter = useSelector((state: any)=> state?.handle_filters?.styles)

    
  const handleChange = (e : any, page : any) => {
    console.log(e, page, "pagepage");
    dispatch(setPageFilter({page}));
    dispatch(getAllModels({ 
      category_id : getModelCategoryFilter, 
      color_id : getModelColorFilter, 
      style_id: getModelStyleFilter,
      page: page,
    }))
  }
  return (
    <SimplePagination 
      count={props?.count}
      page={props?.page}
      onChange={(e, page)=>{handleChange(e, page)}}
    />
  );
}

