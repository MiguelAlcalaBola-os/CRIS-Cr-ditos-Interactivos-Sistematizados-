import Sidebar from "../sidebar Dashboard Validacion/Sidebar"
import Navbar from "../navbar Dashboard Validacion/Navbar"
import "./home.scss";
import { Link, useNavigate  } from "react-router-dom";
import { useAuth } from '../../context/AuthContext.js'

import { useState, useEffect } from "react";

import CardsDashboardOficial from "../CardsDashboardValidacion";
const Dashboard = () => {

  

  const {user, userDB, setUserData, postsIMG, setUserPostsIMG, setUserSuccess, success } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (userDB && userDB.users && userDB.users[user.uid] && userDB.users[user.uid].rol && userDB.users[user.uid].rol !== 'validacion'){ navigate('/') }
}, [userDB]);
  return (
    <>
    {userDB && userDB.users && userDB.users[user.uid] && userDB.users[user.uid].rol && userDB.users[user.uid].rol === 'validacion' && <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="text-center">
          <br></br>
          <h3>Bienvenido a Cris USUARIO de VALIDACION (Créditos Interactivos Sistematizados)</h3>
          <p>Este es tu tablero de Oficial bancario, podras aceptar, rechazar o devolver las solicitudes de los clientes y darle su respectivo feedback</p>
        </div>
        <div className="widgets">
          <CardsDashboardOficial />
        </div>
        <div className="charts"></div>
        <div className="listContainer">
          <div className="listTitle">Ultimas efectuaciones</div>
        </div>
        <Link to="/DashboardValidacion" style={{ textDecoration: "none" }}>
      <button>Dashboard Validacion</button>
      </Link>
      </div>
    </div>}
    </>
  );
};

export default Dashboard;









