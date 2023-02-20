import React from "react";
import "./App.css";
import Dashboard from "./pages/dashboard";
import Products from "./pages/Products";
import Rawmaterials from "./pages/RawMaterials";
import Adduser from "./pages/AddUser";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import RmBatchForm from "./pages/rmbatchform";
import ProdBtachForm from "./pages/productbatchform";
import AddProduct from "./pages/AddProduct";
import QRForm from "./pages/QRForm";
import AddRawMaterial from "./pages/AddRawMaterial";
import Product from "./pages/Product";
import Rawmaterial from "./pages/RawMaterial";
import QuickProductFormFn from "./pages/QuickProductForm";
import AddBatchForm from "./pages/rmbatchquickform";
import { useSelector } from "react-redux";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);
  return <>{isAuth ? <Outlet /> : <Navigate to="/" />}</>;
};

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{!isAuth ? <Outlet /> : <Navigate to="/dashboard" />}</>;
};

function App() {
  return (
    <div className="App" float="flex">
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          <Route path="/adduser" element={<Adduser />} />

          <Route element={<RestrictedRoutes />}>
            <Route path="/" element={<Login />} />
          </Route>

          <Route path="/products" element={<Products />} />

          <Route path="/rawmaterials" element={<Rawmaterials />} />

          <Route path="/settings" element={<Settings />} />

          <Route path="/rmBatchForm" element={<RmBatchForm />} />
          <Route path="/rmBatchForm/:id" element={<RmBatchForm />} />
          <Route path="/BatchForm/:id" element={<QRForm />} />

          <Route path="/quickrm" element={<AddBatchForm />} />

          <Route path="/prodBatchForm/:id" element={<ProdBtachForm />} />
          <Route path="/prodBatchForm" element={<ProdBtachForm />} />

          <Route path="/addproduct" element={<AddProduct />} />

          <Route path="/addrawmaterial" element={<AddRawMaterial />} />

          <Route path="/product/:id" element={<Product />} />

          <Route path="/quickproductform" element={<QuickProductFormFn />} />

          <Route path="/rawmaterial/:id" element={<Rawmaterial />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
