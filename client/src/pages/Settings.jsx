import React from 'react';
import Sidebar from "../components/sidebar";
import Header from "../components/header";

function Settings() {
  return (
    <><div>
      <Header />
      <Sidebar />
    </div><div className='products'>
        <h1>Settings</h1>
      </div></>
  );
}

export default Settings;
