import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar";
import Home from "./components/Home";
import Footer from "./components/Footer";

//Product component
import CreateProducts from "./components/CreateProducts";
import EditProducts from "./components/EditProducts";
import ProductDetails from "./components/ProductDetails";
import AdminDashboard from "./components/AdminDashboard";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
      </div>
      <Routes>
        {/* productList */}
        {/* <Route path="/" element={<ProductAddList />} /> */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/" element={<Home />} />
        <Route path="/save" element={<CreateProducts />} />
        <Route path="/update/:id" element={<EditProducts />} />
        <Route path="/display/:id" element={<ProductDetails />} />
      </Routes>
      <div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
