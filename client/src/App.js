import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import './App.css';
import PublicRoute from "./components/PublicRoute";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import AdminHome from "./pages/Admin/AdminHome";
import AdminBuses from "./pages/Admin/AdminBuses";
import AdminUsers from "./pages/Admin/AdminUsers";
import UserHome from "./pages/User/UserHome";
import UserBooking from "./pages/User/UserBooking";
import UserNotification from "./pages/User/UserNotification";
import BookNow from "./pages/BookNow";
import Wallet from "./pages/Wallet";
import Profile from "./pages/Profile";
import AddRoom from "./pages/landloards/AddRoom";
import Customers from "./pages/landloards/Customers";
import Paydonate from "./pages/Deposit/Paydonate";
import Thanks from "./pages/Deposit/Thanks";
import PaymentFailed from "./pages/Deposit/PaymentFailed.jsx";
import DepositDisplay from "./pages/DepositDisplay";
import BlockedHouse from "./pages/Admin/BlockedHouse";
import MyaddRoom from "./pages/landloards/MyaddRoom";

function App() {
  const {Loading} = useSelector(state=>state.alerts)
  return <div>
   {Loading && <Loader/>}
    <BrowserRouter >
  {/* <Header /> */}
  <Routes>
    <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
    {/* the tenants and the landloards are pay for the deposite  */}
    <Route path="/paynow" element={<ProtectedRoute><Paydonate/></ProtectedRoute>}/>
    <Route path="/thanks" element={<ProtectedRoute><Thanks/></ProtectedRoute>}/>
    <Route path="/payment-fail" element={<ProtectedRoute><PaymentFailed/></ProtectedRoute>}/>
    <Route path="/mydeposit" element={<ProtectedRoute><DepositDisplay/></ProtectedRoute>}/>




    {/* route for tenants */}
    <Route path="/user/home" element={<ProtectedRoute><UserHome/></ProtectedRoute>}/>
    <Route path="/user/Bookings" element={<ProtectedRoute><UserBooking/></ProtectedRoute>}/>
    <Route path="/user/Notification" element={<ProtectedRoute><UserNotification/></ProtectedRoute>}/>
    <Route path="/booking/:id" element={<ProtectedRoute><BookNow/></ProtectedRoute>}/>

{/* route for landloards */}
<Route path="/addroom" element={<ProtectedRoute><AddRoom/></ProtectedRoute>}/>
<Route path="/customers" element={<ProtectedRoute><Customers/></ProtectedRoute>}/>
<Route path="/myroomPosted" element={<ProtectedRoute><MyaddRoom/></ProtectedRoute>}/>



{/* route for admin */}
    <Route path="/admin/home" element={<ProtectedRoute><AdminHome/></ProtectedRoute>}/>
    <Route path="/admin/allusers" element={<ProtectedRoute><AdminUsers/></ProtectedRoute>}/>
    <Route path="/admin/blockedhouses" element={<ProtectedRoute><BlockedHouse/></ProtectedRoute>}/>
 
    {/* route all user  */}
    <Route path="/Register" element={<PublicRoute><Register/></PublicRoute>}/>
    <Route path="/Login" element={<PublicRoute><Login/></PublicRoute>}/>
    <Route path="/balance" element={<ProtectedRoute><Wallet/></ProtectedRoute>}/>
    <Route path="/Profile" element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
   
    
    </Routes>
    </BrowserRouter>
  </div>
}

export default App;
