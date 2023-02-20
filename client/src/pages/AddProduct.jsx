import React from 'react';
import ProductForm from '../components/productform';
import Sidebar from "../components/sidebar";
import Header from "../components/header";

// import QrCode from "../components/QrCode";

const Form = () => {
  return (
    <div>
    <Header/>
    <Sidebar/>
    {/* <QrCode/> */}
    <div style={{overflow:'hidden', height:'100vh', padding:'35px'}}>
      
    <ProductForm/>
    </div>
    </div>
  )
}

export default Form;