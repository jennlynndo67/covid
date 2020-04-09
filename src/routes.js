import React from "react";
import Home from "./components/Home";
import CalculatorPage from "./components/CalculatorPage";


const routes = {
  "/": () => <Home />,
  "/covid-19-wage-subsidy-calculator": () => <CalculatorPage />,

};
export default routes;
