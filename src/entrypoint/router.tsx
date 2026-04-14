import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage/HomePage";
import { CreatePage } from "../pages/CreatePage/CreatePage";
import { CartPage } from "../pages/CartPage/CartPage";
import { ProductPage } from "../pages/ProductPage/ProductPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/createItems" element={<CreatePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/product/:id" element={<ProductPage />} />
    </Routes>
  );
};

export default Router;
