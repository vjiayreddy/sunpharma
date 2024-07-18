import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Typography from "@mui/material/Typography";
import axios from "axios";

// Styled for Data Grid Component
const CustomDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .MuiDataGrid-root .MuiDataGrid-header": {
    backgroundColor: "#2196f3",
    color: "white",
  },
  "& .custom-header": {
    fontWeight: "bold",
  },
  "& .MuiDataGrid-root .MuiDataGrid-row:nth-of-type(odd)": {
    backgroundColor: "#ffffff",
  },
  "& .MuiDataGrid-root .MuiDataGrid-row:nth-of-type(even)": {
    backgroundColor: "#e0e0e0",
  },
}));

const columns: GridColDef[] = [
  { field: "pId", headerName: "PID", width: 90 },
  { field: "site", headerName: "Site", width: 150 },
  { field: "warehouse", headerName: "Warehouse", width: 150 },
  { field: "scanSolution", headerName: "Scan Solution", width: 150 },
  { field: "deviceId", headerName: "Device ID", width: 150 },
  { field: "gtin", headerName: "GTIN", width: 150 },
  { field: "lot", headerName: "Lot", width: 150 },
  { field: "expiry", headerName: "Expiry", width: 150 },
  { field: "serial", headerName: "Serial No.", width: 150 },
  { field: "qty", headerName: "QTY", width: 150 },
  { field: "scanDateTime", headerName: "Scan DateTime", width: 150 },
  { field: "sessionId", headerName: "Session ID", width: 150 },
  {
    field: "issueType",
    headerName: "Issue Type",
    width: 150,
    renderCell: (params) => {
      const issueData = params.row.otherData;
      if (issueData && issueData.length > 0) {
        return issueData.map((issue, index) => (
          <Typography key={index} variant="body2">
            {issue.value}
          </Typography>
        ));
      }
      return <Typography variant="body2">-</Typography>; // Placeholder when no issue type
    },
  },
];

export default function DataGridComponent() {
  const [rows, setRows] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any | null>(null);

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://103.131.196.202:3000/barcode/get-by-filter"
        );
        const responseData = response.data;
        if (responseData.status === "success") {
          const dataArray = responseData.data;

          const formattedData = dataArray.map((item: any) => ({
            id: item.id,
            sessionId: item.sessionId,
            pId: item.pId,
            site: item.site,
            warehouse: item.warehouse,
            scanSolution: item.scanSolution,
            deviceId: item.deviceId,
            gtin: item.gs1Data?.gtin || "",
            lot: item.gs1Data?.lot || "",
            expiry: item.gs1Data?.expiry || "",
            serial: item.gs1Data?.serial || "",
            qty: item.gs1Data?.qty || "",
            scanDateTime: item.scanDateTime,
            images: item.images || [],
            otherData: item.otherData || [],
          }));

          setRows(formattedData);
          console.log("Formatted Data:", formattedData);
        } else {
          console.error(
            "Error fetching data - status not success:",
            responseData
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRowClick = async (params: any) => {
    const rowData = rows.find((row) => row.id === params.id);
    setSelectedData(rowData);

    try {
      const response = await axios.get(
        `http://103.131.196.202:3000/barcode/get-by-id/${rowData.id}`
      );
      const responseData = response.data;

      console.log("Image Data from API:", responseData);

      if (responseData.status === "success") {
        const updatedSelectedData = {
          ...selectedData,
          images: responseData.data.images || [],
          otherData: responseData.data.otherData || [], // Assuming otherData is retrieved from the second endpoint
        };

        setSelectedData(updatedSelectedData);
      } else {
        console.error("Error fetching data:", responseData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedData(null);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <CustomDataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        autoHeight
        onRowClick={handleRowClick}
      />
      {selectedData && (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                Details
              </Typography>
              <IconButton onClick={handleClose}>
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{ display: "flex", alignItems: "center", flexWrap: "wrap" }}
            >
              {selectedData.otherData &&
                selectedData.otherData.map((issue: any, index: number) => (
                  <Typography key={index} variant="body2" sx={{ mr: 1 }}>
                    <span style={{ fontWeight: "bold" }}>Issue Type:</span>{" "}
                    {issue.value}
                  </Typography>
                ))}
            </Box>
            <ImageList variant="masonry" cols={4} gap={8}>
              {selectedData.images &&
                selectedData.images.map((image: any, index: number) => (
                  <ImageListItem key={index}>
                    <img src={image.value} alt={image.tag} loading="lazy" />
                    <Typography variant="caption" align="center">
                      {image.tag}
                    </Typography>
                  </ImageListItem>
                ))}
            </ImageList>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
}
