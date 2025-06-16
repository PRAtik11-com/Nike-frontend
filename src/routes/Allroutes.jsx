import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import CheckEmail from "../pages/CheckEmail";
import LoginPassword from "../pages/LoginPassword";
import SignupForm from "../pages/SignupForm";
import ProductListPage from "../pages/ProductListPage";
import ProductDescription from "../pages/ProductDescription";
import CartPage from "../pages/CartPage";
import DashProfile from "../components/DashProfile";
import CheckoutPage from "../pages/CheckoutPage";
import OrderConfirmation from "../pages/OrderConfirmation";
import OrdersPage from "../pages/OrdersPage";


function Allroutes() {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/CheckEmail" element={<CheckEmail />} />
        <Route path="/login-password" element={<LoginPassword />} />
        <Route path="/signup-form" element={<SignupForm />} />
        <Route path="/ProductListpage" element={<ProductListPage />} />
        <Route path="/product/:productId" element={<ProductDescription />} />
        <Route path="/cartpage" element={<CartPage />} />
        <Route path="/DashProfile" element={<DashProfile />}/>
        <Route path="/checkout" element={<CheckoutPage/> } />
        <Route path="/order/:id" element={<OrderConfirmation />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
   
  );
}

export default Allroutes;
