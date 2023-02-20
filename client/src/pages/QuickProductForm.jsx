import React from 'react';
//import ProductForm from '../components/productform';
import Sidebar from "../components/sidebar";
import Header from "../components/header";
import QuickProduct from "../components/quickproduct"

// import QrCode from "../components/QrCode";

const QuickProductFormFn = () => {
  return (
    <div>
    <Header/>
    <Sidebar/>
    <div style={{overflow:'hidden', height:'100vh', padding:'35px'}}>
      
    <QuickProduct/>
    </div>
    </div>
  )
}

export default QuickProductFormFn;