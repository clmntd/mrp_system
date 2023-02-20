import React from "react";
import Button from "@mui/material/Button";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import RMNTable from "../components/tables/rmnTable";

import { useLocation, useNavigate } from "react-router-dom";

const RawMaterial = () => {
  const location = useLocation();
  let title = location.state;
  const navigate = useNavigate();
  return (
    <div>
      <Header />
      <Sidebar />
      <div style={{ overflow: "hidden", height: "100vh" }}>
        <h5 style={{ paddingTop: "30px" }}>{title.raw_material_name}</h5>
        <div style={{ padding: "0px 35px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <Button
              textAlign="right"
              size="small"
              variant="contained"
              onClick={() =>
                navigate("/rmBatchForm", { state: location.state })
              }
              sx={{ mt: 1, width: 220 }}
            >
              Add a New RMN
            </Button>
          </div>

          <RMNTable />
        </div>
      </div>
    </div>
  );
};

export default RawMaterial;
