import { styled } from "@mui/material/styles";
import { Button, InputBase } from "@mui/material";

export const SearchInput = styled(InputBase)(({ theme }) => ({
  marginRight: 10,
  height: 35,
  borderRadius: 5,
  border: `1px solid gainsboro`,
  paddingLeft: 10,
  paddingRight: 5,
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  backgroundColor: "#ffff",
  "& .MuiInputBase-input": {
    paddingRight: 0,
  },
  "& .MuiInputBase-startAdornment": {
    marginRight: 0,
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const AddButton = styled(Button)(({ theme }) => ({
  borderRadius: 5,
  height:35,
  padding: theme.spacing(0, 2), // Adjust padding to allow button size to adapt to the content
  gap: theme.spacing(1), // Adjust gap as needed
  whiteSpace: 'nowrap', // Prevent text from wrapping
  minWidth: 'fit-content', // Ensure the button fits its content
  [theme.breakpoints.between("xs", "sm")]: {
    fontSize: 12,
  },
}));
