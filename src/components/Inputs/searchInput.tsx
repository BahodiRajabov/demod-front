import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Image from 'next/image'
import { ThemeProps } from '../../types/ThemeTypes';
import {
  styled
} from '@mui/material';

type InputProps = {
  placeHolder: string,
  component?: any,
  className: string,
  startIcon: boolean,
};

const InputWrapper = styled(Paper)(
  ({ theme }: ThemeProps) => `
      max-width:360px !important;
      background: #FAFAFA;
      border: 1px solid #424242;
      border-radius: 4px;
      font-weight: 400;
      font-size: 16px;
      line-height: 22px;
      color: #848484;
      padding:9px 12px
`
);
 
 function SearchInput(props: InputProps) {
    
  return (
    <InputWrapper
      // component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 280 }}
    >
      <IconButton  aria-label="menu">
        <Image 
            src="/img/search-icon.svg" 
            alt='Search icon'
            width={21}
            height={21}
        ></Image>
      </IconButton>
      <InputBase 
        sx={{ ml: 1, flex: 1 }}
        placeholder={props?.placeHolder}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
      </IconButton>
    </InputWrapper>
  )
}

export default SearchInput
