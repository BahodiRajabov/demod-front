import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { ThemeProps } from '../../types/ThemeTypes';
import styled from 'styled-components';
import { InputAdornment } from '@mui/material';
interface InputAdornmentsProps {
  error?: boolean;
  name?: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: unknown;
  label?: string,
  type?: string,
  autoComplete?: string,
  placeholder?: string;
  required?: boolean;
  helperText?: any;
  placeholderText: string,
}

const SimpleInputControl = styled(FormControl)(
  // text-transform: capitalize;
  ({ theme }: ThemeProps) => `
    margin: 0 !important;
    .MuiInputBase-formControl{
        background:#fafafa;
        padding-top: 5px ;
        padding-bottom: 5px ;
    }

    .Mui-focused::after{
        border-color:#7210BE;
    }


    .MuiInputLabel-root{
        font-size: 15px;
        line-height: 14px;
        letter-spacing: 0.02em;
        color: #424242;
        margin-bottom:6px
    }
  `
);


export default function SimpleInp(props: InputAdornmentsProps) {

  return (
    <SimpleInputControl sx={{ m: 1, width: '100%' }} variant="filled">

      <TextField
        id={props?.label}
        autoComplete={props?.autoComplete}
        error={props?.error}
        helperText={props?.helperText}
        onBlur={props?.onBlur}
        onChange={props?.onChange}
        label={props?.label}
        name={props?.name}
        placeholder={props?.placeholderText}
        type={props?.type}
        // autoComplete="current-password"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
    </SimpleInputControl>
  )
}