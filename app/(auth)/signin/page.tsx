"use client";
import React, { Fragment, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  styled,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const StyledLoginPageWrapper = styled(Box)(({ theme }) => ({
  width: "100dvw",
  height: "100dvh",
  backgroundColor: theme.palette.grey[200],
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  "& .__login_wrapper__box": {
    width: 350,
    textAlign: "center",
  },
}));

const LoginPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      router.replace("/");
    }
  }, [session, status]);

  if (!session?.user && status === "unauthenticated") {
    return (
      <StyledLoginPageWrapper>
        <Box component="div" className="__login_wrapper__box">
          <Card>
            <CardContent>
              <Grid
                container
                direction="column"
                alignItems="center"
                justifyContent="center"
                spacing={3}
              >
                <Grid item>
                  <img width={200} alt="sglabs" src="/logos/sglabs.png" />
                </Grid>
                <Grid item>
                  <Typography variant="body2" textAlign="center">
                    Machine Vision-Based Data Capture and Barcode Scanning
                    Solutions for the Healthcare Industry
                  </Typography>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() => signIn("cognito")}
                    startIcon={
                      <img
                        style={{ marginRight: 10 }}
                        width={25}
                        alt="aws_cogninto"
                        src="/logos/cognito.png"
                      />
                    }
                    color="inherit"
                  >
                    Login with AWS Cognito
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      </StyledLoginPageWrapper>
    );
  }
  return <Fragment />;
};

export default LoginPage;
