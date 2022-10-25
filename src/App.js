import Dashboard from "./pages/home/Dashboard";
import Login from "./components/Login"
import Register from "./components/Register"
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Cotizar from "./components/cliente o promotor/Cotizar"
import Datos from "./components/datos inmueble/Datos"
import Solicitud from "./components/solicitud/Solicitud"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { PrivateRoute } from "./components/PrivateRoute";
import { useAuth } from './context/AuthContext.js'



function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useAuth()

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route element={<PrivateRoute isAllowed={user} redirectTo = "/Login"/>}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route element={<PrivateRoute isAllowed={user} redirectTo = "/Solicitud"/>}>
            <Route path="/Solicitud" element={<Solicitud />} />
          </Route>
          <Route element={<PrivateRoute isAllowed={user} redirectTo = "/Datos"/>}>
            <Route path="/Datos" element={<Datos />} />
          </Route>
          <Route element={<PrivateRoute isAllowed={user} redirectTo = "/Cotizar"/>}>
            <Route path="/Cotizar" element={<Cotizar />} />
          </Route>



          <Route path="/">
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
