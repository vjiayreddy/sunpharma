import React from 'react';
import { Select, MenuItem, InputBase, SelectChangeEvent, Box, Typography } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

interface SelectDropDownProps {
  id: string;
  value: string | number;
  onChange: (event: SelectChangeEvent<string | number>) => void;
  options: { value: string | number; name: string }[];
  label: string;
  width?: string | number;
  height?: string | number;
  disabled?: boolean;
  isError?: boolean;
}

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  height: 40,
  width: '100%',
  ...theme.typography.h3,
  borderRadius: 4,
  position: 'relative',
  border: `1px solid #D4D9E5`,
  backgroundColor: theme.palette.background.paper,
  fontSize: 14,
  fontWeight: 900,
  padding: '10px',
  [theme.breakpoints.only('xs')]: {
    padding: '5px',
  },
  '&:focus': {
    borderRadius: 2,
    borderColor: '#D4D9E5',
    backgroundColor: theme.palette.background.paper,
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  ...theme.typography.h3,
  fontSize: 14,
  fontWeight: 500,
  color: `#686868`,
  minHeight: 35,
}));

const SelectDropDown: React.FC<SelectDropDownProps> = ({
  id,
  value,
  onChange,
  options,
  label,
  width,
  height,
  disabled,
  isError,
}) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="body1">{label}</Typography>
      <Select
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        style={{
          border: isError ? '1px solid red' : '',
          width: width,
          height: height,
        }}
        MenuProps={{
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          transformOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
          PaperProps: {
            sx: {
              backgroundColor: theme => theme.palette.common.white,
              boxShadow: `0 9px 19px 0 rgba(84,103,166,0.23)`,
              borderRadius: `2px 2px 4px 4px`,
              border: `1px solid #D4D9E5`,
              marginTop: 1,
            },
          },
        }}
        input={<StyledInputBase />}
      >
        {options.map((item, index) => (
          <StyledMenuItem
            key={index}
            value={item.value}
            sx={{
              '&.Mui-selected': {
                backgroundColor: alpha('#91A1C6', 0.2),
              },
            }}
          >
            {item.name}
          </StyledMenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default SelectDropDown;
