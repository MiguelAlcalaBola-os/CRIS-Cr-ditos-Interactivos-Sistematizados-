import Sidebar from "../sidebar Ofical/Sidebar"
import Navbar from "../navbar Oficial/Navbar"
import "./home.scss";
import { Link, useNavigate  } from "react-router-dom";
import { useAuth } from '../../context/AuthContext.js'

import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import { useState, useEffect } from "react";

import CardsDashboardOficial from "../../Dashboard Oficial/CardsDashboardOficial";
const Dashboard = () => {

  

  const {user, userDB, setUserData, postsIMG, setUserPostsIMG, setUserSuccess, success } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (userDB && userDB.users && userDB.users[user.uid] && userDB.users[user.uid].rol && userDB.users[user.uid].rol === 'cliente'){ navigate('/') }
}, [userDB]);
  return (
    <>
    {userDB && userDB.users && userDB.users[user.uid] && userDB.users[user.uid].rol && userDB.users[user.uid].rol === 'oficial' && <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="text-center">
          <br></br>
          <h3>Bienvenido a Cris USUARIO TIPO OFICIAL (Créditos Interactivos Sistematizados)</h3>
          <p>Este es tu tablero de Oficial bancario, podras aceptar, rechazar o devolver las solicitudes de los clientes y darle su respectivo feedback</p>
        </div>
        <div className="widgets">
          <CardsDashboardOficial />
        </div>
        <div className="charts"></div>
        <div className="listContainer">
          <div className="listTitle">Ultimas efectuaciones</div>
        </div>
      </div>
    </div>}
    </>
  );
};

export default Dashboard;
