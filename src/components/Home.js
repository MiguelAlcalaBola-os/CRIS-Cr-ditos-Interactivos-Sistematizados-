import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { HiMenuAlt3 } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { RiSettings4Line } from "react-icons/ri";
import { AiFillTag } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { IoMdNotifications} from "react-icons/io";
import { Link } from "react-router-dom";
import Cards from './Cards'


export function Home() {
  const menus = [
    { name: "Inicio", link: "/", icon: FaHome },
    { name: "user", link: "/User",  icon: FaUserAlt },
    { name: "Notificaciones", link: "/", icon: IoMdNotifications },
    { name: "Setting", link: "/", icon: AiFillTag },
    { name: "Setting", link: "/", icon: RiSettings4Line },
  ];
  const { logout, user } = useAuth();

  console.log(user);
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error.message);
    }
  };
  const [open, setOpen] = useState(true);
  return (
    
    <section className="flex gap-6">
      <div
        className={`bg-[#1e0e1e] min-h-screen ${
          open ? "w-60" : "w-16"
        } duration-500 text-gray-100 px-4`}
      >
        
        <div className="py-3 flex justify-end">
          <HiMenuAlt3
            size={26}
            className="cursor-pointer"
            onClick={() => setOpen(!open)}
          />
        </div>
        
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={` ${
                menu?.margin && "mt-5"
              } group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h6
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h6>
              
              <h5
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h5>
            </Link>
          ))}
        </div>
  


      </div>
      <div className="m-3 text-xl text-gray-900 font-semibold">
     <h1>CRIS</h1>
     <div className="w-full m-auto">
              <p className="text-xl mb-4 text-center">welcome {user.displayName || user.email}</p>
   
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
<br/>
        <Cards/>
     
      </div>
    </div>
      </div>
    </section>
    
  );
};

export default Home;
