import React from 'react';
import AddNewProductBatchForm from '../components/addnewproductbatch';
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

const Form = () => {

  const location = useLocation();
  let title = location.state;
  const navigate = useNavigate();

  return (
    <div>
    <Header/>
    <Sidebar/>
    
    <div style={{overflow:'hidden', float:'none', padding:'35px'}}>
      
    <AddNewProductBatchForm/>
    </div>
    </div>
  )
}

export default Form;