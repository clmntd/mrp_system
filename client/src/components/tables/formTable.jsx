// import React from "react";
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
} from "@mui/x-data-grid";

import { useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";

// const initialRows = [
//   {
//     id: 220203,
//     qty: 1,
//     rawName: "Nusil Si Adhesive*",
//     expiryDate: "26/01/2023",
//   },
//   {
//     id: 221002,
//     qty: 3,
//     rawName: "Nusil Si Adhesive*",
//     expiryDate: "06/10/2023",
//   },
//   {
//     id: 221103,
//     qty: 2,
//     rawName: "Nusil Si Adhesive*",
//     expiryDate: "01/06/2023",
//   },
//   {
//     id: 211001,
//     qty: 1,
//     rawName: "7mm ePTFE Graft 80cm roll",
//     expiryDate: null,
//   },
//   {
//     id: 220709,
//     qty: 1,
//     rawName: "7mm ePTFE Graft 80cm roll (sterilised)",
//     expiryDate: null,
//   },
//   {
//     id: 22070402,
//     qty: 0,
//     rawName: "Cut ePTFE Graft",
//     expiryDate: null,
//   },
//   {
//     id: 210703,
//     qty: 6,
//     rawName: "Polyester Felt",
//     expiryDate: null,
//   },
//   { id: 220705,
//     qty: 10,
//     rawName: "Polyester Felt",
//     expiryDate: null,
//   },
//   {
//     id: 17032803,
//     qty: 275,
//     rawName: "Infection Cuff",
//     expiryDate: null,
//   },
//   {
//     id: 220716,
//     qty: 0,
//     rawName: "Liquid Si Elastomer",
//     expiryDate: "15/07/2023",
//   },
//   {
//     id: 220802,
//     qty: 2,
//     rawName: "Base Tube",
//     expiryDate: null,
//   },
//   {
//     id: 220909,
//     qty: 103,
//     rawName: "Overlay",
//     expiryDate: null,
//   },
// ];
function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = 0;
    setRows((oldRows) => [
      ...oldRows,
      { id, total_qty: "", raw_material_name: "", isNew: true },
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
  const navigate = useNavigate();
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3002/rawmaterial/view")
      .then((data) => data.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          var obj = data[i];
          //delete Object.assign(obj, { ["id"] : obj["ds_part_no"]})["ds_part_no"]
          Object.assign(obj, { ["id"]: i });
          data[i] = obj;
        }

        setTableData(data);
      });
  });

  const [rows, setRows] = React.useState(tableData);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
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
      field: "ds_part_no",
      headerName: "DS No.",
      width: 150,
      headerAlign: "center",
      headerClass: "super-app-theme--header",
      description: "Delivery Specification Number",
      align: "center",
      // renderCell: (params) => (
      //   <Link to={`/rawmaterial/${params.value}`}>{params.value}</Link>
      // )
      renderCell: (params) => (
        <a
          style={{ color: "#0d6efd" }}
          onClick={(e) =>
            navigate(`/rawmaterial/${params.value}`, {
              state: { raw_material_name: params.row.raw_material_name },
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
      field: "raw_material_name",
      headerName: "Raw Material Name",
      width: 300,
      editable: true,
    },
    {
      field: "total_qty",
      headerName: "Quantity",
      type: "number",
      width: 130,
      headerAlign: "center",
      headerClass: "super-app-theme--header",
      align: "center",
      editable: true,
    },
    // {
    //   field: "expiryDays",
    //   headerName: "Days til Expiry",
    //   headerAlign: "center",
    //   align: "center",
    //   width: 130,
    //   valueGetter: (params) => {
    //     const eDays = moment(params.row.expiryDate, "DD/MM/YYYY").toDate();
    //     const currentDate = moment();
    //     if (currentDate.diff(eDays, "days", true) > 0) return "expired";
    //     return 1 - currentDate.diff(eDays, "days");
    //   },
    // },
    {
      field: "stock_min_qty",
      headerName: "Min. Stock Required",
      description: "Minimum stock required",
      type: "number",
      width: 150,
      headerAlign: "center",
      headerClass: "super-app-theme--header",
      align: "center",
    },
    {
      field: "notes",
      headerName: "Notes",
      sortable: false,
      width: 300,
      editable: true,
      headerClass: "super-app-theme--header",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      headerClass: "super-app-theme--header",
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
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
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

  return (
    <div
      style={{
        display: "flex",
        height: 400,
        width: "100%",
        align: "center",
        stickyHeader: "True",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: 300,
          textWeight: "bold",
          "& .super-app-theme--header": {
            backgroundColor: "AliceBlue",
          },
        }}
      >
        <DataGrid
          align="left"
          rowHeight={20}
          rows={tableData}
          columns={columns}
          pageSize={10}
          checkboxSelection
          rowsPerPageOptions={[5]}
          components={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
    </div>
  );
}
