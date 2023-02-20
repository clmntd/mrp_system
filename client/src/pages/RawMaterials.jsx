import React from 'react';
import Button from '@mui/material/Button';
import Tabs from '../components/tabs';
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import RMNListTable from '../components/tables/rmlistTable';


const RawMaterials = () => {
  return (
    <div>
      <Header/>
      <Sidebar/>
    <div style={{overflow:'hidden', height:'100vh'}}>
      <h5 style={{paddingTop:'30px'}}>Raw Materials List</h5>
      <div style={{padding:'0px 35px'}}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop:'20px', paddingBottom:'20px'}}>
            <Button textAlign="right" size="small" variant="contained" href="/addrawmaterial" sx={{mt:1, width: 220}}>
              Add a New Raw Material
            </Button>
        </div>
        <RMNListTable/>
      </div>
    </div>
    </div>
  )
}

export default RawMaterials;
