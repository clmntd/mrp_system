import React from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { solid, regular, brands, icon } from '@fortawesome/fontawesome-svg-core/import.macro' 
// <-- import styles to be used



const Sidebar = () => {

  return (
    <div class="sticky-top" style={{height: '110vh', float: 'left', marginTop:'-74px'}}>
      <CDBSidebar textColor="#000" backgroundColor="#f8f9fa">
        <CDBSidebarHeader prefix={<i className="fa fa-bars"></i>}>
          <a href="/Dashboard" className="text-decoration-none" style={{ color: 'inherit'}}>
            MRP
          </a>
        </CDBSidebarHeader>
        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/dashboard" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="home">Dashboard</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/products" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="box">Products</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/rawmaterials" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="scroll">Raw Materials</CDBSidebarMenuItem>
            </NavLink>
            {/* <NavLink exact to="/settings" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="cog">Settings</CDBSidebarMenuItem>
              
            </NavLink> */}
          </CDBSidebarMenu>
        </CDBSidebarContent>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;