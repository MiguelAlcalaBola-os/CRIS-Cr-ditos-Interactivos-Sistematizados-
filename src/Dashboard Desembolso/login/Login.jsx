import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Alert } from "../../components/alert"
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "../home/home.scss";


export function Login() {
  const { user } = useAuth()
  console.log(user)


  return (

    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="w-full vh-100 max-w-3xl m-auto d-flex flex-column align-items-center justify-content-center">
          <h1 className="text-center font-bold my-4 text-md flex justify-between px-3">Bienvenido a CRIS (Créditos Interactivos Sistematizados)</h1>

          {user.photoURL 
          ? <img src={user.photoURL} className="d-inline-block rounded-circle m-5 h-25" alt="img" />
          :  <div className="d-flex align-items-center justify-content-center text-light rounded-circle m-5 bg-warning h3" style={{width: "200px", height: "200px"}} >User</div>} 
          <h3>{user !== null ? user.displayName :""}</h3>

          <h3>{user !== null ? user.email:  ""}</h3>
        </div>
      </div>
    </div>
  );
}
export default Login;