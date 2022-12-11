import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { useAuth } from "../../context/AuthContext.js";
import { logout } from "../../firebase";
import "./style.css";
import RecommendIcon from '@mui/icons-material/Recommend';
import DoNotDisturbOffIcon from '@mui/icons-material/DoNotDisturbOff';
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
              <PendingActionsIcon className="icon" />
              <span>Pendientes</span>
            </Link>
          </li>
          <li>
            <Link to="/Cotizar" style={{ textDecoration: "none" }}>
              <RecommendIcon className="icon" />
              <span>Aprobadas</span>
            </Link>
          </li>
          <li>
            <Link to="/Cotizar" style={{ textDecoration: "none" }}>
              <DoNotDisturbOffIcon className="icon" />
              <span>Rechazadas</span>
            </Link>
          </li>

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
