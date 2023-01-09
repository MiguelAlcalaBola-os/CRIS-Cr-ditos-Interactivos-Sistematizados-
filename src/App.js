import Dashboard from "./pages/home/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Details from "./components/Details";
import DashboardCartas from "../src/Dashboard Cartas/home/Dashboard"
import DashboardPipeline from "./Dashboard Pipeline/home/Dashboard"
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import Cotizar from "./components/cliente o promotor/Cotizar";
import Datos from "./components/datos inmueble/Datos";
import Solicitud from "./components/solicitud/Solicitud";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import UserData from "./components/UserData";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { PrivateRoute } from "./components/PrivateRoute";
import { useAuth } from "./context/AuthContext.js";
import Login2 from "./pages/login/Login";
import SolicitudesData from "./components/SolicitudesData";
import Pendientes from "./components/Pendientes";
import PendientesCV from "./components/PendientesCV";
import PendientesCA from "./components/PendientesCA";
import PendientesC from "./components/PendientesC";
import EntregasInmediatas from "./components/EntregasInmediatas";
import EntregasFuturas from "./components/EntregasFuturas";
import Verificadas from "./components/Verificadas";

import PendientesV from "./components/PendientesV";
import PendientesD from "./components/PendientesD";
import PendientesT from "./components/PendientesT";


import Aprobadas from "./components/Aprobadas";
import Rechazadas from "./components/Rechazadas";
import DashCreditoVerificacion from "../src/Dashboard Credito Verificacion/home/Dashboard"
import Datatable from "./components/datatable/Datatable";
import DashOficial from "../src/Dashboard Oficial/home/Dashboard"
import DashCreditoAnalisis from "../src/Dashboard Credito Analisis/home/Dashboard"
import DashTramite from "../src/Dashboard Tramite/home/Dashboard"
import DashValidacion from "../src/Dashboard Validacion/home/Dashboard"
import DashDesembolso from "../src/Dashboard Desembolso/home/Dashboard"

function App() {
  const { darkMode } = useContext(DarkModeContext);
  const { user } = useAuth();

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="Login2" element={<Login2 />} />
          <Route
            path="UserData"
            element={
              <PrivateRoute isAllowed={user}>
                <UserData />
              </PrivateRoute>
            }
          />
          {/* NUEVAS RUTAS */}


          <Route
            path="/dashboardoficial"
            element={
              <PrivateRoute isAllowed={user}>
                <DashOficial />
              </PrivateRoute>
            }
          />

          <Route
            path="/DashCreditoAnalisis"
            element={
              <PrivateRoute isAllowed={user}>
                <DashCreditoAnalisis />
              </PrivateRoute>
            }
          />

          <Route
            path="/DashboardPipeline"
            element={
              <PrivateRoute isAllowed={user}>
                <DashboardPipeline />
              </PrivateRoute>
            }
          />


          <Route
            path="/DashCartas"
            element={
              <PrivateRoute isAllowed={user}>
                <DashboardCartas />
              </PrivateRoute>
            }
          />
          {/* 
          <Route path="/DashboardTramite" element={<DashTramite />} />
          <Route path="/DashboardValidacion" element={<DashValidacion />} /> */}

          <Route
            path="/DashboardTramite"
            element={
              <PrivateRoute isAllowed={user}>
                <DashTramite />
              </PrivateRoute>
            }
          />

          <Route
            path="/DashboardValidacion"
            element={
              <PrivateRoute isAllowed={user}>
                <DashValidacion />
              </PrivateRoute>
            }
          />

          <Route
            path="/DashboardDesembolso"
            element={
              <PrivateRoute isAllowed={user}>
                <DashDesembolso />
              </PrivateRoute>
            }
          />

          {/* <Route path="/DashCreditoVerificacion" element={<DashCreditoVerificacion />}></Route> */}
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />

          {/* 
          <Route path="/DashboardPipeline" element={<DashboardPipeline />} />
          <Route path="/DashCartas" element={<DashboardCartas />} /> */}



          <Route element={<PrivateRoute isAllowed={user} redirectTo="/Login" />}>
            <Route index element={<Dashboard />} />
          </Route>
          <Route
            path="DashCreditoVerificacion"
            element={
              <PrivateRoute isAllowed={user}>
                <DashCreditoVerificacion />
              </PrivateRoute>
            }
          />
          <Route element={<PrivateRoute isAllowed={user} redirectTo="/Solicitud" />}>
            <Route path="/Solicitud" element={<Solicitud />} />
          </Route>

          <Route element={<PrivateRoute isAllowed={user} redirectTo="/Datos" />}>
            <Route path="/Datos" element={<Datos />} />
          </Route>

          <Route element={<PrivateRoute isAllowed={user} redirectTo="/Datatable" />}>
            <Route path="/Datatable" element={<Datatable />} />
          </Route>

          <Route element={<PrivateRoute isAllowed={user} redirectTo="/Cotizar" />}
          >
            <Route path="/Cotizar" element={<Cotizar />} />
          </Route>
          <Route
            path="SolicitudesData"
            element={
              <PrivateRoute isAllowed={user}>
                <SolicitudesData />
              </PrivateRoute>
            }
          />
          <Route
            path="Verificadas"
            element={
              <PrivateRoute isAllowed={user}>
                <Verificadas />
              </PrivateRoute>
            }
          />
          <Route
            path="Pendientes"
            element={
              <PrivateRoute isAllowed={user}>
                <Pendientes />
              </PrivateRoute>
            }
          />
          <Route
            path="PendientesCV"
            element={
              <PrivateRoute isAllowed={user}>
                <PendientesCV />
              </PrivateRoute>
            }
          />
          <Route
            path="PendientesCA"
            element={
              <PrivateRoute isAllowed={user}>
                <PendientesCA />
              </PrivateRoute>
            }
          />
          <Route
            path="PendientesC"
            element={
              <PrivateRoute isAllowed={user}>
                <PendientesC />
              </PrivateRoute>
            }
          />
          <Route
            path="EntregasInmediatas"
            element={
              <PrivateRoute isAllowed={user}>
                <EntregasInmediatas />
              </PrivateRoute>
            }
          />
          <Route
            path="EntregasFuturas"
            element={
              <PrivateRoute isAllowed={user}>
                <EntregasFuturas />
              </PrivateRoute>
            }
          />
          <Route
            path="Aprobadas"
            element={
              <PrivateRoute isAllowed={user}>
                <Aprobadas />
              </PrivateRoute>
            }
          />
          <Route
            path="Rechazadas"
            element={
              <PrivateRoute isAllowed={user}>
                <Rechazadas />
              </PrivateRoute>
            }
          />
 <Route
            path="PendientesV"
            element={
              <PrivateRoute isAllowed={user}>
                <PendientesV />
              </PrivateRoute>
            }
          />
           <Route
            path="PendientesT"
            element={
              <PrivateRoute isAllowed={user}>
                <PendientesT />
              </PrivateRoute>
            }
          />
           <Route
            path="PendientesD"
            element={
              <PrivateRoute isAllowed={user}>
                <PendientesD />
              </PrivateRoute>
            }
          />







          **<Route
            path="SolicitudesData/:item"
            element={
              <PrivateRoute isAllowed={user}>
                <Details />
              </PrivateRoute>}
          />**
          {/* <Route path="/">
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Registrar prospectos " />}
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
          </Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;