import "./scss/app.scss";
import React from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Home } from "./pages/Home";
import { Cart } from "./pages/Cart";
import { NotFound } from "./pages/NotFound";
import { FullPizza } from "./pages/FullPizza";
import { MainLayout } from "./layouts/MainLayout";

function Parent() {
  return (
    <div>
      <h1>Заголовок</h1>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
