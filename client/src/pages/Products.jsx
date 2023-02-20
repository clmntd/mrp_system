import React from "react";
import Button from "@mui/material/Button";
import Tabs from "../components/tabs";
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import RMNTable from "../components/tables/rmnTable";
import RMNListTable from "../components/tables/rmlistTable";
import ProductNameTable from "../components/tables/productnameTable";
import ProductListTable from "../components/tables/productlistTable";
import { blueGrey } from "@mui/material/colors";

const Layout = () => {
  return (
    <div>
      <Header />
      <Sidebar />
      <div style={{ overflow: "hidden", height: "100vh" }}>
        <h5 style={{ paddingTop: "30px" }}>Products List</h5>
        <div style={{ padding: "0px 35px" }}>
          <div style={{ display: "flex", justifyContent: "flex-end", paddingTop:'20px', paddingBottom:'20px' }}>
            <Button
              textAlign="right"
              size="small"
              variant="contained"
              href="/addproduct"
              sx={{ mt: 1, width: 220 }}
            >
              Add a New Product
            </Button>
          </div>
          <ProductListTable />
        </div>
      </div>
    </div>
  );
};

export default Layout;
