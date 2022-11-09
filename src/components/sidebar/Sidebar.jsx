import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { useAuth } from "../../context/AuthContext.js";
import { logout } from "../../firebase";
import "./style.css";
import { display } from "@mui/system";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { setUser, saveCotizacion } = useAuth();
  const [mode, setMode] = useState(false);

  const handleLogout = (setUser) => {
    logout(setUser);
  };

  const handleMode = () => {
    saveCotizacion == true ? handleLogout(setUser) : setMode(!mode);
  };
  return (
    <div className="sidebar">
      {mode === true && (
        <div className="modal">
          <div className=" bg-danger p-2 w-25">
            <p className="text-light text-center">
              No guardaste tu cotizacion <br /> Estas seguro de Salir
            </p>
            <div className="d-flex">
              <button
                type="button"
                class="btn btn-success btn-sm w-100 m-1"
                onClick={handleMode}
              >
                Cancelar
              </button>
              <button
                type="button"
                class="btn btn-primary btn-sm w-100 m-1"
                onClick={() => handleLogout(setUser)}
              >
                Salir
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <AccountBalanceIcon className="" />
          </li>
          <span className="">CRIS</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Link to="/" style={{ textDecoration: "none" }}>
            <p className="title">CRIS | PANEL</p>
          </Link>
          <li>
            <Link to="/" style={{ textDecoration: "none" }}>
              <DashboardIcon className="icon" />
              <span>Panel</span>
            </Link>
          </li>
          <li>
            <Link to="/Solicitud" style={{ textDecoration: "none" }}>
              <Diversity3Icon className="icon" />
              <span>Solicitar crédito</span>
            </Link>
          </li>
          <li>
            <Link to="/Cotizar" style={{ textDecoration: "none" }}>
              <RequestQuoteIcon className="icon" />
              <span>Cotizaciones automáticas</span>
            </Link>
          </li>
          <li>
            <Link to="/Datos" style={{ textDecoration: "none" }}>
              <MapsHomeWorkIcon className="icon" />
              <span>Ver viviendas o locales</span>
            </Link>
          </li>
         
          <p className="title">Listas</p>
          <Link to="/SolicitudesData" style={{ textDecoration: "none" }}>
            <li>
              <FormatAlignLeftIcon className="icon" />
              <span>Historial de solicitudes</span>
            </li>
          </Link>
          <Link to="/UserData" style={{ textDecoration: "none" }}>
            <li>
              <BookmarksIcon className="icon" />
              <span>Cotizaciones Guardadas</span>
            </li>
        
          </Link>
          <Link to="/Datatable" style={{ textDecoration: "none" }}>
           
            <li>
              <GroupAddIcon className="icon" />
              <span>Prospectos Registrados</span>
            </li>

            <li>
              <GroupAddIcon className="icon" />
              <span>Solicitudes imcompletas</span>
            </li>
          </Link>

          <p className="title">Utilidades</p>

          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <li>
            <ChatBubbleOutlineIcon className="icon" />
            <span>Mensajes</span>
          </li>
          <p className="title">SERVICE</p>

          <li>
            <PsychologyOutlinedIcon className="icon" />
            <span>Historial de acceso</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Ajustes</span>
          </li>
          <p className="title">Mi cuenta</p>

          <Link to="/login2" style={{ textDecoration: "none" }}>
            <li>
              <AccountCircleOutlinedIcon className="icon" />
              <span>Perfil</span>
            </li>
          </Link>
          <li onClick={handleMode}>
            <ExitToAppIcon className="icon" />
            <span>Salir</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
