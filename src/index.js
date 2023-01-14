import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import { ProductsProvider } from "./context/products";
import configureProductsStore from "./hooks-store/products-store";

const root = ReactDOM.createRoot(document.getElementById("root"));

configureProductsStore(); // setup the products store

// we don't need a provider - since we're using a custom hook
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
