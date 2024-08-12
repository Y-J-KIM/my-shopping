import { Route, Routes } from "react-router-dom";
import ProductPage from "../Product/ProductPage";
import ProductDetail from "../Product/ProductDetail";
import HomePage from "../Home/HomePage";
import Login from "../Member/Login";
import Register from "../Member/Register";
import BoardList from "../Board/boardList";
import BoardEditPage from "../Board/BoardEditPage";
import BoardDetailPage from "../Board/BoardDetailPage";
import BoardRegister from "../Board/BoardRegister";
import Cart from "../Cart/Cart";
import Order from "../Order/Order";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductPage />} />
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/board/list" element={<BoardList />} />
      <Route path="/board/register" element={<BoardRegister />} />
      <Route path="/board/read/:id" element={<BoardDetailPage />} />
      <Route path="/board/modify/:id" element={<BoardEditPage />} />
      <Route path="/member/join" element={<Register />} />
      <Route path="/member/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/myorders" element={<Order />} />
      {/* <Route path="/logout" element={<Logout />} /> */}
      {/* <Route element={<ProtectedRoute user={user} />}>
        
        
      </Route> */}
    </Routes>
  );
};

export default Routing;
