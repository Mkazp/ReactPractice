import { Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage/HomePage";
import { CreatePage } from "../pages/CreatePage/CreatePage";
import { CartPage } from "../pages/CartPage/CartPage";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/createItems" element={<CreatePage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
};

export default Router;
