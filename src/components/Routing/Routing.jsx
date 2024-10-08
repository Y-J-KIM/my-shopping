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
import AdminProductList from "../Admin/AdminProductList";
import ProductModal from "../Admin/ProductModal";
import ModifyModal from "../Admin/ModifyModal";
import MyPage from "../Member/Mypage";
import EditUser from "../Member/EditUser";
import Order from "../Order/UserOrder"

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
      <Route path="/users/register" element={<Register />} />
      <Route path="/users/login" element={<Login />} />
      <Route path="/cart" element={<Cart />} />
      {/* <Route path="/cart/{userId}/items" element={<Cart />} /> */}
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/edit-user/:id" element={<EditUser />} />
      <Route path="/myorders" element={<Order />} />
      <Route path="/admin/product" element={<AdminProductList />} />
      <Route path="/admin/product/new/pro" element={<ProductModal />} />
      <Route path="/admin/product/modify/{id}" element={<ModifyModal />} />
      {/* <Route path="/member/logout" element={<Logout />} /> */}
      {/* <Route element={<ProtectedRoute user={user} />}>
        
        
      </Route> */}
    </Routes>
  );
};

export default Routing;
