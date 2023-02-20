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
import { styled } from "@mui/material/styles";
import moment from "moment";
import clsx from "clsx";

import { Redirect, Link, useNavigate } from "react-router-dom";

import React, { useState, useEffect } from "react";

const initialRows = [
  {
    id: 220203,
    total_qty: 1,
    raw_material_name: "Nusil Si Adhesive*",
    expiryDate: "26/01/2023",
    ds_part_no: "DS-34",
  },
  {
    id: 221002,
    total_qty: 3,
    raw_material_name: "Nusil Si Adhesive*",
    expiryDate: "06/10/2023",
    ds_part_no: "DS-7118",
  },
  {
    id: 221103,
    total_qty: 2,
    raw_material_name: "Nusil Si Adhesive*",
    expiryDate: "01/06/2023",

    ds_part_no: "DS-264",
  },
  {
    id: 211001,
    total_qty: 1,
    raw_material_name: "7mm ePTFE Graft 80cm roll",
    expiryDate: null,

    ds_part_no: "DS-98",
  },
  {
    id: 220709,
    total_qty: 1,
    raw_material_name: "7mm ePTFE Graft 80cm roll (sterilised)",
    expiryDate: null,
    ds_part_no: "DS-47",
  },
  {
    id: 22070402,
    total_qty: 0,
    raw_material_name: "Cut ePTFE Graft",
    expiryDate: null,
    ds_part_no: "DS-45",
  },
  {
    id: 210703,
    total_qty: 6,
    raw_material_name: "Polyester Felt",
    expiryDate: null,
    ds_part_no: "DS-708",
  },
  {
    id: 220705,
    total_qty: 10,
    stock_min_qty: 1,
    raw_material_name: "Polyester Felt",
    expiryDate: null,
    ds_part_no: "DS-178",
  },
  {
    id: 17032803,
    total_qty: 275,
    stock_min_qty: 300,
    raw_material_name: "Infection Cuff",
    expiryDate: null,
    ds_part_no: "DS-789",
  },
  {
    id: 220716,
    total_qty: 0,
    raw_material_name: "Liquid Si Elastomer",
    expiryDate: "15/07/2023",
    ds_part_no: "DS-782",
  },
  {
    id: 220802,
    total_qty: 2,
    raw_material_name: "Base Tube",
    expiryDate: null,
    ds_part_no: "DS-78",
  },
  {
    id: 220909,
    total_qty: 103,
    stock_min_qty: 103,
    raw_material_name: "Overlay",
    expiryDate: null,
    ds_part_no: "DS-12",
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
          Object.assign(obj, { ["id"]: i });
          data[i] = obj;
        }

        setTableData(data);
      });
  }, []);

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

  const [tableData2, setTableData2] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3002/rawmateriallot/view/")
      .then((data) => data.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          var obj = data[i];
          //  Object.assign(obj, { ["id"]: i });
          delete Object.assign(obj, { ["id"]: obj["notes"] })["notes"];
          delete Object.assign(obj, { ["id"]: obj["qr_code"] })["qr_code"];
          delete Object.assign(obj, { ["id"]: obj["status"] })["status"];
          data[i] = obj;
        }

        // let item1 = tableData2.filter((item) => item.product_id === "22217");
        // let total = 0;
        // for (let i = 0; i < item1.length; i++) {
        //   total += item1[i].qty;
        // }

        setTableData2(data);
      });
  }, []);

  useEffect(() => {
    console.log(tableData2);
  }, [tableData2]);

  function totalQty(params) {
    const currentDate = moment();
    let item1 = tableData2.filter(
      (item) => item.ds_part_no === params.row.ds_part_no
    );
    let item2 = item1.filter(
      (item) => item.id == "Inside clean room performed & approved"
    );
    let item3 = item2.filter((item) =>
      moment(item.expiry_date, "DD/MM/YYYY").isAfter(currentDate)
    );

    let total = 0;
    for (let i = 0; i < item3.length; i++) {
      total += item3[i].qty;
      //console.log(item3[i])
    }
    // console.log(item1);
    return total;
  }

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
              state: {
                raw_material_name: params.row.raw_material_name,
                ds_part_no: params.row.ds_part_no,
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

      valueGetter: (params) => {
        return totalQty(params);
      },
      cellClassName: (params) => {
        var qty = totalQty(params);
        if (params.row.stock_min_qty == null) {
          return "";
        }
        return clsx("super-app", {
          first: qty < params.row.stock_min_qty,
          // first: params.row.total_qty == "0",
          second: qty === params.row.stock_min_qty,
          third: qty > params.row.stock_min_qty,
        });
      },
    },
    {
      field: "stock_min_qty",
      headerName: "Min. Stock Required",
      description: "Minimum stock required",
      type: "number",
      width: 150,
      headerAlign: "center",
      align: "center",
      // cellClassName: (params) => {
      //   if (params.value == null) {
      //     return "";
      //   }
      //   return clsx("super-app", {
      //     first: params.row.total_qty < params.row.stock_min_qty,
      //     second: params.row.total_qty == params.row.stock_min_qty,
      //     third: params.row.total_qty > params.row.stock_min_qty,
      //   });
      // },
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

  let filteredItems = tableData.filter(function (item) {
    return item.total_qty > 0;
  });

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
            //red
            backgroundColor: "rgba(255, 51, 51, 0.49)",
          },
          "& .super-app.second": {
            //yellow
            backgroundColor: "rgba(255, 218, 68, 0.49)",
          },
          "& .super-app.third": {
            //green
            backgroundColor: "rgba(0, 204, 0, 0.49)",
          },
        }}
      >
        <DataGrid
          align="left"
          rowHeight={50}
          rows={tableData} // tableData or initialRows for testing
          columns={columns}
          // getCellClassName={(params) => {
          //   if (params.field === 'ds_part_no' || params.field === 'raw_material_name' || params.field === 'total_qty' ||params.field === 'notes' || params.field === 'actions'  || params.value == null) {
          //     return '';
          //   }
          //   return params.row.total_qty >= params.stock_min_qty ? 'hot' : 'cold';
          // }}
          pageSize={15}
          rowsPerPageOptions={[5]}
          components={{
            Toolbar: GridToolbar,
            NoRowsOverlay: CustomNoRowsOverlay,
          }}
        />
      </Box>
    </div>
  );
}
