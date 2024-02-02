import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Layouts/Home";
import CreatePlan from "./Modules/Pages/create-plan/CreatePlan";
import ViewAllPlans from "./Modules/Pages/View-Plan/ViewAllPlans";
import EditPlan from "./Modules//Pages/Edit-Plan/EditPlan";

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/createPlan"} element={<CreatePlan />} />
          <Route path={"/viewplan"} element={<ViewAllPlans />} />
          <Route path={"/update/:planId"} element={<EditPlan />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
