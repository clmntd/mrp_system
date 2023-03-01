//import React from "react";
import PropTypes from "prop-types";
import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbar,
  GridRowModes,
  GridToolbarContainer,
  GridColumns,
} from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import moment from "moment";
import clsx from "clsx";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const initialRows = [
  {
    id: 220203,
    qty: 1,
    rawName: "Nusil Si Adhesive*",
    expiryDate: "26/01/2023",
  },
  {
    id: 221002,
    qty: 3,
    rawName: "Nusil Si Adhesive*",
    expiryDate: "06/10/2023",
  },
  {
    id: 221103,
    qty: 2,
    rawName: "Nusil Si Adhesive*",
    expiryDate: "01/06/2023",
  },
  {
    id: 211001,
    qty: 1,
    rawName: "7mm ePTFE Graft 80cm roll",
    expiryDate: null,
  },
  {
    id: 220709,
    qty: 1,
    rawName: "7mm ePTFE Graft 80cm roll (sterilised)",
    expiryDate: null,
  },
  {
    id: 22070402,
    qty: 0,
    rawName: "Cut ePTFE Graft",
    expiryDate: null,
  },
  {
    id: 210703,
    qty: 6,
    rawName: "Polyester Felt",
    expiryDate: null,
  },
  { id: 220705, qty: 10, rawName: "Polyester Felt", expiryDate: null },
  {
    id: 17032803,
    qty: 275,
    rawName: "Infection Cuff",
    expiryDate: null,
  },
  {
    id: 220716,
    qty: 0,
    rawName: "Liquid Si Elastomer",
    expiryDate: "15/07/2023",
  },
  {
    id: 220802,
    qty: 2,
    rawName: "Base Tube",
    expiryDate: null,
  },
  {
    id: 220909,
    qty: 103,
    rawName: "Overlay",
    expiryDate: null,
  },
];

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .ant-empty-img-1": {
    fill: theme.palette.mode === "light" ? "#aeb8c2" : "#262626",
  },
  "& .ant-empty-img-2": {
    fill: theme.palette.mode === "light" ? "#f5f5f7" : "#595959",
  },
  "& .ant-empty-img-3": {
    fill: theme.palette.mode === "light" ? "#dce0e6" : "#434343",
  },
  "& .ant-empty-img-4": {
    fill: theme.palette.mode === "light" ? "#fff" : "#1c1c1c",
  },
  "& .ant-empty-img-5": {
    fillOpacity: theme.palette.mode === "light" ? "0.8" : "0.08",
    fill: theme.palette.mode === "light" ? "#f5f5f5" : "#fff",
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        width="120"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = 0;
    setRows((oldRows) => [
      ...oldRows,
      { id, product_qty: "", product_name: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

EditToolbar.propTypes = {
  setRowModesModel: PropTypes.func.isRequired,
  setRows: PropTypes.func.isRequired,
};

export default function ColumnTypesGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3002/productlot/view/")
      .then((data) => data.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          var obj = data[i];
          Object.assign(obj, { ["id"]: obj["lot_no"] });
          data[i] = obj;
        }

        setTableData(data);
      });
  }, []);

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    console.log("edit");
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    console.log("save");
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    console.log("product lot is " + id);
    await fetch(`http://localhost:3002/productlot/delete/${id}`, {
      method: "DELETE",
    });
    fetch("http://localhost:3002/productlot/view/")
      .then((data) => data.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          var obj = data[i];
          Object.assign(obj, { ["id"]: obj["lot_no"] });
          data[i] = obj;
        }

        setTableData(data);
      });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const columns = [
    {
      headerAlign: "center",
      align: "center",
      field: "lot_no",
      headerName: "Lot No",
      width: 200,
      editable: true,
      renderCell: (params) => (
        <a
          style={{ color: "#0d6efd" }}
          onClick={(e) =>
            navigate(`/prodBatchForm/${params.value}`, {
              state: {
                product_name: params.row.product_name,
                product_id: params.row.product_id,
                product_qty: params.row.qty,
                status: params.row.status,
                expiry_date: params.row.expiry_date,
                lot_no: params.row.lot_no,
                notes: params.row.notes,
              },
            })
          }
        >
          {params.value}
        </a>
      ),
    },
    {
      headerAlign: "center",
      align: "center",
      field: "qty",
      headerName: "Quantity",
      type: "number",
      width: 80,
      editable: true,
    },
    {
      headerAlign: "center",
      align: "center",
      field: "status",
      headerName: "Status",
      width: 130,
      editable: true,
      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }

        return clsx("super-app", {
          first: params.value == "Pending Sterilisation",
          second: params.value == "Sterilised",
          third: params.value == "Final Release",
        });
      },
    },
    {
      headerAlign: "center",
      align: "center",
      field: "notes",
      headerName: "Notes",
      width: 200,
      editable: true,
    },
    {
      headerAlign: "center",
      align: "center",
      field: "qr_code",
      headerName: "QR",
      type: "number",
      width: 130,
      editable: true,
    },
    {
      headerAlign: "center",
      align: "center",
      field: "product_id",
      headerName: "Product Id",
      type: "number",
      width: 130,
      editable: true,
    },
    {
      field: "expiry_date",
      headerName: "Expiry Date",
      type: "date",
      width: 130,
      headerAlign: "center",
      align: "center",
      editable: true,
      description: "dd/mm/yyy",
    },
    {
      field: "expiryDays",
      headerName: "Days til Expiry",
      headerAlign: "center",
      align: "center",
      width: 130,
      valueGetter: (params) => {
        const eDays = moment(params.row.expiry_date, "DD/MM/YYYY").toDate();
        const currentDate = moment();
        if (currentDate.diff(eDays, "days", true) > 0) return "expired";
        return 1 - currentDate.diff(eDays, "days");
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          // <GridActionsCellItem
          //   icon={<EditIcon />}
          //   label="Edit"
          //   className="textPrimary"
          //   onClick={handleEditClick(id)}
          //   color="inherit"
          // />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  const currentUrl = window.location.href;
  const lastPart = currentUrl.split("/").slice(-1)[0];

  const filteredData = tableData.filter((item) => item.product_id === lastPart);

  return (
    <div
      style={{
        display: "flex",
        height: "65vh",
        width: "100%",
        align: "center",
        stickyHeader: "True",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          "& .super-app.first": {
            backgroundColor: "rgba(255, 51, 51, 0.49)",
          },
          "& .super-app.second": {
            backgroundColor: "rgba(255, 218, 68, 0.49)",
          },
          "& .super-app.third": {
            backgroundColor: "rgba(0, 204, 0, 0.49)",
          },
        }}
      >
        <DataGrid
          align="left"
          rowHeight={50}
          rows={filteredData}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5]}
          components={{
            Toolbar: GridToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
          initialState={{
            ...tableData.initialState,
            columns: {
              columnVisibilityModel: {
                qr_code: false,
                product_id: false,
              },
            },
          }}
        />
      </Box>
    </div>
  );
}
