import { Route, Routes } from "react-router-dom";
import ProductPage from "../Product/ProductPage";
import ProductDetail from "../Product/ProductDetail";
import HomePage from "../Home/HomePage";
import Login from "../Member/Login";
import Register from "../Member/Register";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/products/:id" element={<ProductDetail />} />{" "}
      {/* 디테일 페이지 라우트 */}
      <Route path="/member/join" element={<Register />} />
      <Route path="/member/login" element={<Login />} />
      {/* <Route element={<ProtectedRoute user={user} />}>
        <Route path="/logout" element={<Logout />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/myorders" element={<MyOrderPage />} />
      </Route> */}
    </Routes>
  );
};

export default Routing;
