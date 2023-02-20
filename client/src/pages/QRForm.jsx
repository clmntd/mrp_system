import React from 'react';
import QRtest from "../components/QRtest";
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
    
    <div style={{overflow:'hidden', float:'none',  padding:'35px'}}>
      
    <QRtest/>
    </div>
    </div>
  )
}

export default Form;