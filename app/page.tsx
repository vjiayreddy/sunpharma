"use client";
import { useSession } from "next-auth/react";
import {
  Box,
  Toolbar,
  Container,
  Divider,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import DashboardLayout from "../components/layouts/dashboard/Dashboard";
import DataGridComponent from "../components/tables";
import MainLayout from "../components/layouts/mainLayout";
import UserMainLayout from "../components/layouts/userMainLayout";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

const LandingPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAddButtonClick = () => {
    console.log("Add button clicked!");
  };

  const handleRefreshButtonClick = () => {
    setLoading(true);
    setTimeout(() => {
      router.refresh();
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (!session?.user && status === "unauthenticated") {
      router.replace("/signin");
    }
  }, [session]);

  if (session?.user && status === "authenticated") {
    return (
      <DashboardLayout>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" disableGutters>
            <UserMainLayout
              pageTitle="Exceptions"
              label1="Business Unit"
              label2="Business Process"
              showDropdown1={false}
              showDropdown2={false}
              selectedDropdownValue1={undefined}
              selectedDropdownValue2={undefined}
              dropDownValues1={[
                {
                  name: "All",
                  value: true,
                },
              ]}
              showButton={false}
              btnTitle="Submit"
              onClickBtn={handleAddButtonClick}
            />
            <Divider />
            <MainLayout
              addButtonVariant="outlined"
              addButtonColor="primary"
              btnTitle2="Refresh"
              buttonClick2={handleRefreshButtonClick}
              btnTitle3="Export"
              buttonClick3={handleAddButtonClick}
            />
            <DataGridComponent />
          </Container>
        </Box>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      </DashboardLayout>
    );
  }
  return <Fragment />;
};

export default LandingPage;
