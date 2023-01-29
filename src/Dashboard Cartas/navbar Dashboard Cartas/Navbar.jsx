import "./navbar.scss";
import Notificaciones from "./Notificaciones";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.js";
import { useNavigate} from 'react-router-dom';

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);

  const { contadorNotificacionesCartas, contadorMensajes } = useAuth();

  const navigate = useNavigate();
  
  return (
    <div className="navbar  h-auto">
      <div className="wrapper">
        <div>
          
        </div>
        <div className="items">
         
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" 
              
            />
          </div>
          <div className="item submenu">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">{contadorNotificacionesCartas}</div>
            <div id='carrito'>
              <Notificaciones/>
            </div>
          </div>
          
          

          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" 
              onClick={ e => navigate('/mensajes') }
            />
            <div className="counter">{contadorMensajes}</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
