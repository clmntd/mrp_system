import React from 'react';
import AddQuickRM from '../components/quickrmform';
import Sidebar from "../components/sidebar";
import Header from "../components/header";

const AddQuickFormRM = () => {
  return (
    <div>
    <Header/>
    <Sidebar/>
    
    <div style={{overflow:'hidden', height:'110vh', padding:'35px'}}>
      
    <AddQuickRM/>
    </div>
    </div>
  )
}

export default AddQuickFormRM;