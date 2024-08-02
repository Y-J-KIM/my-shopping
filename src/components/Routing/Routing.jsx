import { Navigate, Route, Routes } from "react-router-dom";
import ProductPage from "../Product/ProductPage";
import HomePage from "../Home/HomePage";

const Routing = ({ user }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductPage />} />
      {/* <Route path="/product/:id" element={<SingleProductPage />} /> */}
      {/* <Route
        path="/member/join"
        element={user ? <Navigate to="/" /> : <SignupPage />}
      />
      <Route
        path="/member/login"
        element={user ? <Navigate to="/" /> : <LoginPage />}
      /> */}
      {/* <Route element={<ProtectedRoute user={user} />}>
        <Route path="/logout" element={<Logout />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/myorders" element={<MyOrderPage />} />
      </Route> */}
    </Routes>
  );
};

export default Routing;
