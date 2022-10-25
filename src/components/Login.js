import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./alert"
import { login, signup, logout, loginWithGoogle, resetPassword } from "../firebase"
import { useAuth } from '../context/AuthContext.js'


export function Login() {
  const { user } = useAuth()

  const [userLogin, setUser] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(userLogin.email, userLogin.password, navigate);
  };

  const handleChange = ({ target: { value, name } }) =>
    setUser({ ...userLogin, [name]: value });

  const handleGoogleSignin = () => {
    loginWithGoogle(navigate);
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!userLogin.email) return setError("Write an email to reset password");
    try {
      await resetPassword(userLogin.email);
      setError('CRIS te ha enviado un mensaje, por favor revise su correo seleccionado ')
    } catch (error) {
      setError(error.message);
    }
  };



  useEffect(() => {
    if(user) {navigate("/")}
  })

  return (

    <div className="bg-secondary vh-100 d-flex flex-column justify-content-center align-items-center">

      <div className="w-full max-w-3xl m-auto">
        <h1 className="text-center font-bold my-4 text-md flex justify-between px-3">Bienvenido a CRIS (Créditos Interactivos Sistematizados)</h1>
      </div>


      {error && <Alert message={error} />}


      <form onSubmit={handleSubmit} className="col-5 p-5  mb-5 rounded-1 bg-light">
        <fieldset disabled="">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email"
              name="email"
              id="email"
              onChange={handleChange}
              class="form-control"
              placeholder="tucorreo@company.com" />
          </div> <br />
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password"
              name="password"
              id="password"
              onChange={handleChange}
              class="form-control"
              placeholder="Ingrese su contraseña" />
          </div> <br />
          <div className="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary w-50 mr-5">Sign In</button>
            <button onClick={handleGoogleSignin} class="btn btn-success w-50 ml-2">Google login</button>
          </div>

          <div className="d-flex flex-column align-content-center w-100">

            <a
              className=" align-self-center"
              href="#!"
              onClick={handleResetPassword}
            >
              ¿Olvido su contraseña?
            </a>
            <p className="text-center">
            Don't have an account?
            <Link to="/Register" className="text-blue-700 hover:text-blue-900">
              Register
            </Link>
          </p>
          </div>

        </fieldset>
      </form>
    </div>
  );
}
export default Login;
