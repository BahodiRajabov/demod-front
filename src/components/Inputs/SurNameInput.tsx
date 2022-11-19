import * as React from 'react';
import Box from '@mui/material/Box';
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
  label?:string,
  type?: string,
  autoComplete?: string,
  placeholder?: string;
  required?: boolean;
  helperText?: React.ReactNode;
  placeholderText: string,
}

const FirstNameInp = styled(FormControl)(
    // text-transform: capitalize;
    ({ theme }: ThemeProps) => `
   
    .MuiInputBase-formControl{
        background:#fafafa;
        padding-top: 5px ;
        padding-bottom: 5px ;
    }
  `
);


export default function InputAdornments(props: InputAdornmentsProps) {

 return (
   <FirstNameInp sx={{ m: 1, width: '100%' }} variant="filled">
        
        <TextField
            id="filled-firstName-input"
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
 </FirstNameInp>
 )
}