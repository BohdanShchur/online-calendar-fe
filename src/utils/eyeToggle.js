import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import React from 'react';

export function toggleInputType(e, showPass, isVisible) {
  const input = e.currentTarget.parentElement.previousSibling;
  input.type = isVisible ? 'text' : 'password';
  showPass();
}

export function endAdornment(isVisible, setShowPass) {
  return {
    endAdornment: (
      <InputAdornment position='end'>
        <IconButton
          aria-label='toggle password visibility'
          onClick={(e) => toggleInputType(e, setShowPass, isVisible)}
        >
          {isVisible ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    )
  };
}
