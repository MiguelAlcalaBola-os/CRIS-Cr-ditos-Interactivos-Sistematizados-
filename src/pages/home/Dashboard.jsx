import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import { Link, useNavigate  } from "react-router-dom";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import Cards from "../../components/Cards";
import { useAuth } from '../../context/AuthContext.js'

import { useState, useEffect } from "react";

const Dashboard = () => {




  const {user, userDB, setUserData, postsIMG, setUserPostsIMG, setUserSuccess, success } = useAuth()

  const navigate = useNavigate()

  useEffect(() => {
    if (userDB && userDB.users && userDB.users[user.uid] && userDB.users[user.uid].rol && userDB.users[user.uid].rol === 'oficial'){ navigate('/dashboardoficial') }
    if (userDB && userDB.users && userDB.users[user.uid] && userDB.users[user.uid].rol && userDB.users[user.uid].rol === 'creditosDeVerificacion'){ navigate('/DashCreditoVerificacion') }
    if (userDB && userDB.users && userDB.users[user.uid] && userDB.users[user.uid].rol && userDB.users[user.uid].rol === 'creditoAnalisis'){ navigate('/DashCreditoAnalisis') }
    if (userDB && userDB.users && userDB.users[user.uid] && userDB.users[user.uid].rol && userDB.users[user.uid].rol === 'cartas'){ navigate('/DashCartas') }
    if (userDB && userDB.users && userDB.users[user.uid] && userDB.users[user.uid].rol && userDB.users[user.uid].rol === 'pipeline'){ navigate('/DashboardPipeline') }
}, [userDB]);


  return (

    <>
{ userDB && userDB.users && userDB.users[user.uid] && userDB.users[user.uid].rol && userDB.users[user.uid].rol === 'cliente' &&
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="text-center">
          <br></br>
          <h3>Bienvenido a Cris (Créditos Interactivos Sistematizados)</h3>
          <p>Podrás hacer todas tus diligencias de una manera rápida, eficaz y en tiempo real, sin necesidad de apoyarte en una entidad bancaria</p>
        </div>
        <div className="widgets">
          <Cards />
        </div>
        <div className="charts"></div>
        <div className="listContainer">
          <div className="listTitle">Ultimas efectuaciones</div>
        </div>
        {/* <Link  to="/dashboardoficial" style={{ textDecoration: "none" }}>
        <button>dashboard oficial</button>
        </Link> */}
      </div>
    </div>}
    </>
  );
};

export default Dashboard;
