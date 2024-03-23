import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import ProductCard from "../Pages/ProductPage";
// import Signup from "../Pages/SignupPage";
// import Login from "../Pages/LoginPage";
import CartPage from "../Pages/CartPage";
import MerchatSignpuPage from "../Admin/pages/MerchatSignpuPage";
import SignupDeliveyPage from "../Admin/pages/SignupDeliveyPage";
import AdminLogin from "../components/AdminLogin";
import MerchantorderList from "../Admin/pages/MerchantorderList";
import Fetchorderdetail from "../Admin/pages/Fetchorderdetail";
// import LoginDeliveyPerson from "../Admin/pages/LoginDeliveyPerson";
// import DiliveryOrder from "../Admin/pages/DiliveryOrder";
import Dashboard from "../Admin/Admin";
import UserProfile from "../Pages/UserProfile";
import Cart from "../Pages/Cart";
import PaymentSuccess from "../Pages/PaymentSuccess";
import TermsAndConditions from "../Pages/TermsAndConditions";
import UserRegistration from "../components/UserRegistration";
import RefundAndCancellation from "../Pages/RefundAndCancellation";
import ShippingPolicy from "../Pages/ShippingPolicy";
import PrivacyPolicy from "../Pages/PrivacyPolicy";
import ContactUs from "../Pages/ContactUs";

const Allroutes = () => {

  return (
    <Routes>
      
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/product" element={<ProductCard />}></Route>
      {/* <Route path="signup" element={<Signup />}></Route> */}
      {/* <Route path="login" element={<Login />}></Route> */}
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/cartpage/:orderId" element={<CartPage />}></Route>
      <Route path="/merchatSignup" element={<MerchatSignpuPage />}></Route>
      <Route path="/delivetboySignup" element={<SignupDeliveyPage />}></Route>
      <Route path="/paymentsuccess" element={<PaymentSuccess />}></Route>
      <Route path="/termsandconditions" element={<TermsAndConditions />}></Route>
      <Route path="/cart/termsandconditions" element={<TermsAndConditions />}></Route>
      <Route path="/userregister" element={<UserRegistration />}></Route>
      <Route path="/refundandcancellation" element={<RefundAndCancellation />}></Route>
      <Route path="/shippingpolicy" element={<ShippingPolicy />}></Route>
      <Route path="/privacypolicy" element={<PrivacyPolicy />}></Route>
      <Route path="/contactus" element={<ContactUs />}></Route>
      

      <Route path="/merchatLogin" element={<AdminLogin />}></Route>
      <Route path="/merchatDashboard" element={<MerchantorderList />}></Route>
      <Route path="/orderdetails" element={<Fetchorderdetail />}></Route>
      {/* <Route path="/deliveryLogin" element={<LoginDeliveyPerson />}></Route>
      <Route path="/deliveryDashboard" element={<DiliveryOrder />}></Route> */}

      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/userprofile" element={<UserProfile />}></Route>
    </Routes>
  );
};

export default Allroutes;
