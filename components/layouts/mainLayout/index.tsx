import * as React from "react";
import { Box } from "@mui/material";
import { SearchInput, SearchIconWrapper, AddButton } from "./styles";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import ImportExportIcon from "@mui/icons-material/ImportExport";

interface MainLayoutProps {
  children?: React.ReactNode;
  btnTitle2: string;
  btnTitle3: string;
  buttonClick2: () => void;
  buttonClick3: () => void;
  addButtonVariant?: "text" | "outlined" | "contained";
  addButtonColor?: "inherit" | "primary" | "secondary" | "default";
}

const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  btnTitle2,
  btnTitle3,
  addButtonVariant = "contained",
  buttonClick2,
  buttonClick3,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 2, // Add padding to create space above and below
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1, // Small gap between the buttons
        }}
      >
        <AddButton onClick={buttonClick2} variant={addButtonVariant}>
          <RefreshIcon />
          {btnTitle2}
        </AddButton>
        <AddButton onClick={buttonClick3} variant={addButtonVariant}>
          <ImportExportIcon />
          {btnTitle3}
        </AddButton>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <SearchInput
        placeholder="Search..."
        startAdornment={
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
        }
      />
      {children}
    </Box>
  );
};

export default MainLayout;
