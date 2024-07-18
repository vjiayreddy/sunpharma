import { styled } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

// Styled Data Grid Component
export const CustomDataGrid = styled(DataGrid)({
  '& .MuiDataGrid-root .MuiDataGrid-header': {
    backgroundColor: '#2196f3', 
    color: 'white', 
  },
  '& .custom-header': {
    fontWeight: 'bold', 
  },
  '& .MuiDataGrid-root .MuiDataGrid-row:nth-of-type(odd)': {
    backgroundColor: '#ffffff', 
  },
  '& .MuiDataGrid-root .MuiDataGrid-row:nth-of-type(even)': {
    backgroundColor: '#e0e0e0',
  },
});
