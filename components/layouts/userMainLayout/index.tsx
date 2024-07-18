import * as React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import SelectDropDown from "../../formInputFields/selectDropDown";
import { PageTitleLbl } from "./styles";

interface MainLayoutProps {
  pageTitle: string;
  showDropdown1?: boolean;
  showDropdown2?: boolean;
  dropDownValues1?: any[];
  dropDownValues2?: any[];
  selectedDropdownValue1?: string;
  selectedDropdownValue2?: string;
  label1: string;
  label2: string;
  onChangeDropDown1?: (value: any) => void;
  onChangeDropDown2?: (value: any) => void;
  showButton?: boolean;
  btnTitle?: string;
  btnIcon1?: React.ReactNode;
  onClickBtn?: React.MouseEventHandler<HTMLButtonElement>;
  addButtonVariant?: "text" | "outlined" | "contained";
  addButtonColor?: "inherit" | "primary" | "secondary" | "default";
}

const UserMainLayout: React.FC<MainLayoutProps> = ({
  pageTitle,
  showDropdown1,
  showDropdown2,
  dropDownValues1 = [],
  dropDownValues2 = [],
  selectedDropdownValue1,
  selectedDropdownValue2,
  onChangeDropDown1,
  onChangeDropDown2,
  label1,
  label2,
  showButton,
  btnTitle,
  btnIcon1,
  onClickBtn,
  addButtonVariant = "contained",
  addButtonColor = "primary",
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 2, // Add gap between sections
        padding: 2, // Add padding to the entire component
        backgroundColor: "#ffff",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between", // Use justifyContent here
          alignItems: "center",
          padding: "8px", // Padding for the title and dropdown section
          //   backgroundColor: "#f0f0f0", // Example background color
          borderRadius: "4px", // Example border radius
        }}
      >
        {/* Left Side (Title) */}
        {/* <PageTitleLbl>{pageTitle}</PageTitleLbl> */}
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {pageTitle}
        </Typography>

        {/* Right Side (Dropdowns) */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* First Dropdown */}
          {showDropdown1 && (
            <SelectDropDown
              isError={false}
              disabled={false}
              options={dropDownValues1}
              id="dropdown1"
              width={150}
              height={35}
              value={selectedDropdownValue1}
              label={label1}
              onChange={(e) =>
                onChangeDropDown1 && onChangeDropDown1(e.target.value)
              }
            />
          )}

          {/* Second Dropdown */}
          {showDropdown2 && (
            <SelectDropDown
              isError={false}
              disabled={false}
              options={dropDownValues2}
              id="dropdown2"
              width={150}
              height={35}
              value={selectedDropdownValue2}
              label={label2}
              onChange={(e) =>
                onChangeDropDown2 && onChangeDropDown2(e.target.value)
              }
            />
          )}

          {showButton && (
            <Box mr={1}>
              {btnIcon1 ? (
                <IconButton
                  onClick={onClickBtn}
                  style={{
                    // backgroundColor: "black",
                    borderRadius: 5,
                    height: 35,
                    width: "100%",
                  }}
                >
                  {btnIcon1}
                </IconButton>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={onClickBtn}
                  style={{
                    borderRadius: 5,
                    height: 35,
                    width: "100%",
                  }}
                >
                  {btnTitle}
                </Button>
              )}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserMainLayout;
