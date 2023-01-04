import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../firebase"
import { Alert } from "./alert"
import { useAuth } from '../context/AuthContext.js'
import Success from "./Success"
import Error from "./Error"

export function Register() {
  const { user, success, setUserSuccess  } = useAuth()

  const [userRegister, setUser] = useState({
    email: "",
    password: "",
  });

  const [rol, setRol] = useState('cliente');

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(userRegister.email, userRegister.password, navigate, setUserSuccess, rol)
  };
  const handleOnChange= (e) => {
    setRol(e.target.value)
  };

  console.log(rol)
  useEffect(() => {
    if(user) {navigate("/")}
  })
  return (
    <div className="bg-secondary vh-100 d-flex flex-column justify-content-center align-items-center">
      <div className="w-full max-w-3xl m-auto">
        <h1 className="text-center font-bold my-4 text-md flex justify-between px-3">Register</h1>
      </div>
      {success && <Success></Success>}
  {success == false && <Error>ERROR: verifique e intente nuevamente</Error>}
        <form onSubmit={handleSubmit} className="col-5 p-5  mb-5 rounded-1 bg-light">
        <fieldset disabled="">
          <div className="form-group">
            <label>Email</label>
            <input type="email"
              name="email"
              id="email"
              onChange={(e) => setUser({ ...userRegister, email: e.target.value })}
              className="form-control"
              placeholder="tucorreo@company.com" />
          </div> <br />
          <div class="form-group">
            <label>Password</label>
            <input type="password"
              name="password"
              id="password"
              onChange={(e) => setUser({ ...userRegister, password: e.target.value })}
              className="form-control"
              placeholder="Ingrese su contraseña" />
          </div> <br />
          <div class="form-group">
          <label>Rol</label> <br />
          
          <select id="rol" className="form-control" onChange={handleOnChange}>
               <option value="cliente">cliente</option>
            <option value="oficial">oficial</option>
            <option value="creditosDeVerificacion">Creditos de verificacion</option>
            <option value="creditoAnalisis">Creditos Analasis</option>
            <option value="cartas">Cartas</option>
            <option value="pipeline">Pipeline</option>
          </select>
          </div> <br />
          <div className="d-flex justify-content-center">
            <button type="submit" class="btn btn-primary w-50 mr-5">Sign In</button>
          </div> <br />
          <p className="text-center">
            Already have an Account?
            <Link to="/login" className="text-blue-700 hover:text-blue-900">
              Login
            </Link>
          </p>
        </fieldset>
      </form>

    </div>
  );
}
export default Register;