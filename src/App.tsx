import "./scss/app.scss";
import { Routes, Route } from "react-router-dom";
import NotFound from "./pages/NotFound";
import { MainLayout } from "./layouts/MainLayout";
import React, { Suspense } from "react";

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ "../src/pages/Cart"));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ "../src/pages/FullPizza"));
const Home = React.lazy(() => import(/* webpackChunkName: "Home" */ "../src/pages/Home"));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route
          path=""
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizza/:id"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
