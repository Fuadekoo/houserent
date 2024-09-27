import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function DefaultLayout({ children }) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = React.useState(false);
  const user = useSelector((state) => state.users.user);

  const userMenu = [
    { name: "Home", path: "/", icon: "ri-home-line" },
    { name: "Booked", path: "/user/Bookings", icon: "ri-shopping-cart-line" },
    // { name: "view Booked", path: "/user/viewBooked", icon: "ri-file-list-line" },
    { name: "wallet", path: "/balance", icon: "ri-wallet-line" },
    { name: "Profile", path: "/profile", icon: "ri-user-line" },
    { name: "Logout", path: "/logout", icon: "ri-logout-box-line" }
  ];

  const landlordMenu = [
    { name: "Home", path: "/", icon: "ri-home-line" },
    { name: "PostHouses", path: "/addroom", icon: "ri-home-2-line" },
    { name: "myroom", path: "/myroomPosted", icon: "ri-home-4-line" },
    { name: "wallet", path: "/balance", icon: "ri-wallet-line" },
    { name: "Profile", path: "/profile", icon: "ri-user-line" },
    { name: "Logout", path: "/logout", icon: "ri-logout-box-line" }
  ];

  const adminMenu = [
    { name: "Home", path: "/admin/home", icon: "ri-home-line" },
    { name: "AllUsers",path:"/admin/allusers",icon:"ri-file-list-line"},
    { name: "BlockedHouses",path:"/admin/blockedhouses",icon:"ri-file-list-line"}, 
    { name: "wallet", path: "/balance", icon: "ri-wallet-line" },
    { name: "Profile", path: "/profile", icon: "ri-user-line" },
    { name: "Logout", path: "/logout", icon: "ri-logout-box-line" }
  ];

  let menuToBeRendered;
  if (user?.isAdmin) {
    menuToBeRendered = adminMenu;
  } else if (user?.role === 'landlord') {
    menuToBeRendered = landlordMenu;
  } else {
    menuToBeRendered = userMenu;
  }

  const activePath = window.location.pathname;

  return (
    <div className='flex h-screen bg-gray-200'>
      <div className={`bg-blue-500 transition-all duration-200 ease-in-out ${collapsed ? 'w-16' : 'w-64'} p-4 rounded`}>
        {/* Hamburger menu */}
        <div className="flex justify-end">
          <button className='flex flex-col w-10 h-10 justify-around mb-4 right-1' onClick={() => { setCollapsed(!collapsed) }}>
            {collapsed ? (<i className="ri-menu-2-fill text-2xl"></i>) : (<i className="ri-close-line text-2xl"></i>)}
          </button>
        </div>

        {/* User Role */}
        <div className='mb-4 text-xl font-bold text-white'>
          {user?.isAdmin ? 'Admin' : user?.role === 'landlord' ? 'Landlord' : 'Tenant'}
        </div>

        {/* Sidebar */}
        {menuToBeRendered.map((item, index) => {
          const isActive = activePath === item.path;
          return (
            <div key={index} className={`mb-3 flex items-center space-x-2 cursor-pointer p-2 rounded text-white w-full transition duration-200 ease-in-out transform hover:scale-105 ${isActive ? 'bg-green-600' : 'bg-blue-700 hover:bg-blue-600'}`} onClick={() => {
              if (item.path === "/logout") {
                console.log("logout successfully");
                localStorage.removeItem("token");
                navigate("/login");
              } else {
                navigate(item.path);
              }
            }}>
              <i className={`${item.icon} text-2xl`}></i>
              {!collapsed && <span>{item.name}</span>}
            </div>
          );
        })}
      </div>
      <div className='flex-1 p-4'>
        <div className='scroll-m-1'>
          {/* Header */}
          <div className='flex justify-between items-center bg-white rounded p-4'>
            <h1 className='text-2xl font-bold'>houserent system</h1>
            <Link to='/profile'>  
        {user ? (
          <img className='rounded-full h-10 w-10 object-cover' src={user.avatar} alt='profile'/>
        ):(
          <li className=' text-slate-700 hover:underline'>Sign in</li>
      )}     
       </Link>
            <h2 className='text-xl'>{user?.name}</h2>
          </div>
          {/* Body */}
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;