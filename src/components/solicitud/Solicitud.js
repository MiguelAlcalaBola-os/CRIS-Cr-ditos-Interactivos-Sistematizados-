import "./style/Solicitud.css";
import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { writeUserData, removeData } from "../../firebase";
import { uploadIMG } from "../../storageFB";
import Success from "../Success";
import Error from "../Error";
import "../../../src/pages/home/home.scss";
import { useAuth } from "../../context/AuthContext.js";
import { StoreMallDirectoryTwoTone } from "@mui/icons-material";
import Solicitudimg1 from "../../assets/solicitudimg1.png";
import Solicitudimg2 from "../../assets/solicitudimg2.png";
import Solicitudimg3 from "../../assets/solicitudimg3.png";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
export function Cotizar() {
  const { userDB, setUserSuccess, success, postsIMG, setUserPostsIMG } =
    useAuth();
  const [selectedDate, setselectedDate] = useState(null);
  const [solicitudenviada, setSolicitudEnviada] = useState(false);
  const [solicitudData, setSolicitudData] = useState({});
  const [solicitudData2, setSolicitudData2] = useState({});
  const [preAprobacion, setPreAprobacion] = useState(false);
  const [datosComplementarios, setDatosComplementarios] = useState(false);
  const [cargarDocumentos, setCargarDocumentos] = useState(false);
  const [check, setCheck] = useState(false);
  const [photos, setPhotos] = useState({});
  const [checkNewSolicitud, setCheckNewSolicitud] = useState("false");
  const [formSolicitud, setFormSolicitud] = useState("form1");
  const [getPorcentajeFijo, SetgetPorcentajeFijo] = useState({
    tasaDeinteresAnual: 5.09,
  });
  const [interesMensual, setInteresMensual] = useState("");
  const [cotaMensual, setCotaMensual] = useState("");

  function handlerUploadFile(e) {
    console.log(e)
    const fileName = e.target.name;
    const file = e.target.files[0];
    file !== undefined && setPhotos({ ...photos, [fileName]: file });
    uploadIMG(
      file,
      `${solicitudData.Cedula}${fileName}`,
      setUserSuccess,
      postsIMG,
      setUserPostsIMG
    );
  }
  console.log(solicitudData);
  console.log(selectedDate);
  const handlerEventChange = (e) => {
    SetgetPorcentajeFijo({
      ...getPorcentajeFijo,
      [e.target.name]: e.target.value,
    });
    setSolicitudData({ ...solicitudData, [e.target.name]: e.target.value });
  };
  const handlerEventChange2 = (e) => {
    SetgetPorcentajeFijo({
      ...getPorcentajeFijo,
      [e.target.name]: e.target.value,
    });
    setSolicitudData2({ ...solicitudData2, [e.target.name]: e.target.value });
  };
  const handlerEventChangeCheck = (e) => {
    setCheck(!check);
  };
  const handleCheckSolicitud = (e) => {
    const data = e.target.value;
    setCheckNewSolicitud(data);
    data == "false" && setFormSolicitud("form1");
  };
  const handleFormSolicitud = (e) => {
    const data = e.target.value;
    setFormSolicitud(data);
  };


  const saveSolicitud = (e, letter) => {
    e.preventDefault();
    const soli = Object.keys(solicitudData);

    if (letter === "solicitud") {
      soli.length > 14 && check === true
        ? setPreAprobacion(true)
        : setUserSuccess("Complete");
    }
    if (letter == "preAprobacion") {
      setDatosComplementarios(true);
    }
    if (letter == "datosComplementarios") {
      solicitudData["Direccion Actual"] &&
        solicitudData[check === true && "Numero de Celular REF1"] &&
        solicitudData["Numero de Celular REF2"] &&
        solicitudData["Numero de Celular REF3"] &&
        solicitudData["Nombre Completo REF1"] &&
        solicitudData["Nombre Completo REF2"] &&
        solicitudData["Nombre Completo REF3"]
        ? setCargarDocumentos(true)
        : setUserSuccess("Complete");
    }
    if (letter == "SaveAll") {
      soli.length > 16 &&
        solicitudData["Numero de Celular REF1"] &&
        solicitudData["Numero de Celular REF2"] &&
        solicitudData["Numero de Celular REF3"] &&
        solicitudData["Nombre Completo REF1"] &&
        solicitudData["Nombre Completo REF2"] &&
        solicitudData["Nombre Completo REF3"] &&
        check === true &&
        Object.keys(photos).length > 6
        ? setSolicitudEnviada(true)
        : setUserSuccess("Complete");

      if (soli.length > 16 &&
        solicitudData["Numero de Celular REF1"] &&
        solicitudData["Numero de Celular REF2"] &&
        solicitudData["Numero de Celular REF3"] &&
        solicitudData["Nombre Completo REF1"] &&
        solicitudData["Nombre Completo REF2"] &&
        solicitudData["Nombre Completo REF3"] &&
        check === true) {
        writeUserData("/solicitudes/", solicitudData.Cedula, solicitudData);
      }

    }
    calculoDeCotaMensual();
  };
  const handlerEventeChange = (e) => {
    setSolicitudData({ ...solicitudData, [e.target.name]: e.target.value });
  };


function handlerPicker (date) {
  setSolicitudData({ ...solicitudData, fechaDeNacimiento: `${date.getDay()}-${date.getMonth()}-${date.getFullYear()}` });
  setselectedDate(date)
}

  const calculoDeCotaMensual = () => {
    const p = solicitudData["Monto de prestamo"]; // montoDePrestamo
    const n = solicitudData["Plazo anual"] * 12; // plazoEnMeses
    const tasaDeinteresAnual00 = solicitudData["Tasa de interes anual"]; //
    const i = tasaDeinteresAnual00 / 100 / ((360 * 12) / 365);
    const cotaMes = p / ((1 - Math.pow(1 + i, -n)) / i);
    console.log(cotaMes);

    setInteresMensual(i);
    setCotaMensual(cotaMes);
    
    console.log(i)
    setSolicitudData({ ...solicitudData, tasaCalc : Math.round(interesMensual * 100000) / 100000 });
    //  setSaveCotizacion(false);
  };


  const remove = (e) => {
    e.preventDefault();
    removeData();
  };
  const redirect = (rute) => {
    console.log('redirect')
    window.open(rute, '_blank')
  };
  console.log(checkNewSolicitud);
  return (
    <div className="home">
      {success == "Complete" && (
        <Error>Complete el Formulario correctamente</Error>
      )}

      <Sidebar />
      {success == "Cargando" && <Success> Cargando</Success>}
      {success == "Save" && <Success> Guardado Exitosamente</Success>}

      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <div className="container w-100%">
            <div className="col-12 m-3 text-xl text-gray-900 font-semibold">
              <div className="col-12">
                <div className="col-md-16 col-12">
                  <h2 className="text-center mb-4">Solicitud</h2>
                  <hr />
                  <br />
                  <br />

                  <p className="text-center mb-4">
                    ingresa tus datos para completar tu solicitud.
                  </p>

                  <div className="card border-0">
                    <form className="m-1">
                      <div className="card card-body shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <br />
                        <div className="text-center">
                          <label for="cars">Cantidad de solicitantes</label>
                          <br />
                          <form className="d-flex justify-content-center">
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="radio"
                                onChange={handleCheckSolicitud}
                                name="inlineRadioOptions"
                                id="inlineRadio1"
                                value="false"
                              />
                              <label
                                class="form-check-label"
                                for="inlineRadio1"
                              >
                                1
                              </label>
                            </div>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input"
                                type="radio"
                                onChange={handleCheckSolicitud}
                                name="inlineRadioOptions"
                                id="inlineRadio2"
                                value="true"
                              />
                              <label
                                class="form-check-label"
                                for="inlineRadio2"
                              >
                                2
                              </label>
                            </div>
                          </form>
                        </div>
                        <br />

                        {checkNewSolicitud == "true" && (
                          <div
                            class="btn-group"
                            role="group"
                            aria-label="Basic example"
                          >
                            <button
                              type="button"
                              class="btn btn-secondary"
                              onClick={handleFormSolicitud}
                              name="inlineRadioOptions"
                              value="form1"
                            >
                              Solicitud Nº1
                            </button>
                            <button
                              type="button"
                              class="btn btn-secondary"
                              onClick={handleFormSolicitud}
                              name="inlineRadioOptions"
                              value="form2"
                            >
                              solicitud Nº2
                            </button>
                          </div>
                        )}

                        {formSolicitud == "form1" && (
                          <div className="my-flex-solicitud p-5 form-group">
                            <br />
                            <label>FORMULARIO DEL SOLICITANTE Nº1</label>
                            <br />
                            <div></div>

                            <div className="d-flex flex-column mb-3">
                              <input
                                type="text"
                                name="Nombres"
                                className="border-secondary form-control text-center"
                                placeholder="Nombres"
                                defaultValue={solicitudData.Nombres}
                                onChange={handlerEventChange}
                              ></input>
                              <p
                                className={
                                  solicitudData.Nombres
                                    ? "text-success w-100 text-center"
                                    : "text-danger w-100 text-center"
                                }
                              >
                                {solicitudData.Nombres &&
                                  solicitudData.Nombres.length
                                  ? "✔"
                                  : "*"}
                              </p>
                            </div>

                            <div className="d-flex flex-column mb-3">
                              <input
                                type="text"
                                name="Apellidos"
                                className="border-secondary form-control text-center"
                                placeholder="Apellidos"
                                defaultValue={
                                  solicitudData.Apellidos &&
                                  solicitudData.Apellidos
                                }
                                onChange={handlerEventChange}
                              ></input>
                              <p
                                className={
                                  solicitudData.Apellidos
                                    ? "text-success w-100 text-center"
                                    : "text-danger w-100 text-center"
                                }
                              >
                                {solicitudData.Apellidos &&
                                  solicitudData.Apellidos.length
                                  ? "✔"
                                  : "*"}
                              </p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">
                              <select
                                onChange={handlerEventChange}
                                className="border-secondary rounded-1 p-2 text-center w-100"
                                id="cars"
                                defaultValue={
                                  solicitudData.sexo && solicitudData.sexo
                                }
                                name="sexo"
                              >
                                <option value="">Sexo</option>
                                <option value="Masculino">Masculino</option>
                                <option value="Femenino">Femenino</option>
                                <option value="Indefinido">Indefinido</option>
                              </select>
                              <p
                                className={
                                  solicitudData.sexo
                                    ? "text-success w-100 text-center"
                                    : "text-danger w-100 text-center"
                                }
                              >
                                {solicitudData.sexo ? "✔" : "*"}
                              </p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">
                              <input
                                type="text"
                                name="Cedula"
                                className="d-block border-secondary form-control text-center w-100"
                                placeholder="Cedula"
                                defaultValue={
                                  solicitudData.Cedula && solicitudData.Cedula
                                }
                                onChange={handlerEventChange}
                              ></input>
                              <p
                                className={
                                  solicitudData.Cedula
                                    ? "text-success w-100 text-center"
                                    : "text-danger w-100 text-center"
                                }
                              >
                                {solicitudData.Cedula &&
                                  solicitudData.Cedula.length
                                  ? "✔"
                                  : "*"}
                              </p>
                            </div>
                            <div className="d-flex flex-wrap mb-3">
                              <DatePicker
                                className="d-block border-secondary form-control text-center w-100"
                                name="Fecha de nacimiento"
                                selected={selectedDate}
                                isClearable
                                showYearDropdown
                                scrollableMonthYearDropdown
                                placeholderText={"Escoger fecha"}
                                onChange={(date) => handlerPicker(date)}
                                />
                              <p
                                className={
                                  solicitudData["fechaDeNacimiento"]
                                    ? "text-success w-100 text-center"
                                    : "text-danger w-100 text-center"
                                }
                              >
                                {solicitudData["fechaDeNacimiento"] &&
                                  solicitudData["fechaDeNacimiento"].length
                                  ? "✔"
                                  : "*"}
                              </p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">
                              <select
                                onChange={handlerEventChange}
                                className="text-center border-secondary rounded-1 p-2 w-100"
                                id="cars"
                                defaultValue={
                                  solicitudData["Estado Migratorio"] &&
                                  solicitudData["Estado Migratorio"]
                                }
                                name="Estado Migratorio"
                              >
                                <option value="">Estado migratorio</option>
                                <option value="Panameño">Panameño</option>
                                <option value="Extranjero - Residente Permanente">
                                  Extranjero - Residente Permanente
                                </option>
                                <option value="Extranjero - Residente Temporal">
                                  Extranjero - Residente Temporal
                                </option>
                                <option value="Extranjero - No Residente">
                                  Extranjero - No Residente
                                </option>
                              </select>
                              <br />
                              <p
                                className={
                                  solicitudData["Estado Migratorio"]
                                    ? "text-success w-100 text-center"
                                    : "text-danger w-100 text-center"
                                }
                              >
                                {solicitudData["Estado Migratorio"] ? "✔" : "*"}
                              </p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">
                              <select
                                onChange={handlerEventChange}
                                className="text-center border-secondary rounded-1 p-2 w-100"
                                id="cars"
                                defaultValue={
                                  solicitudData["Estado Civil"] &&
                                  solicitudData["Estado Civil"]
                                }
                                name="Estado Civil"
                              >
                                <option value="">Estado civil</option>
                                <option value="Soltero">Soltero</option>
                                <option value="Casado">Casado</option>
                                <option value="Unión Libre">Unión Libre</option>
                              </select>
                              <br />
                              <p
                                className={
                                  solicitudData["Estado Civil"]
                                    ? "text-success w-100 text-center"
                                    : "text-danger w-100 text-center"
                                }
                              >
                                {solicitudData["Estado Civil"] ? "✔" : "*"}
                              </p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">
                              <select
                                onChange={handlerEventChange}
                                className="text-center border-secondary rounded-1 p-2 w-100"
                                id="cars"
                                defaultValue={
                                  solicitudData["Tipo de ingresos"] &&
                                  solicitudData["Tipo de ingresos"]
                                }
                                name="Tipo de ingresos"
                              >
                                <option value="">Tipo de ingresos</option>
                                <option value="Asalariado">Asalariado</option>
                                <option value="Independiente">
                                  Independiente
                                </option>
                              </select>
                              <p
                                className={
                                  solicitudData["Tipo de ingresos"]
                                    ? "text-success w-100 text-center"
                                    : "text-danger w-100 text-center"
                                }
                              >
                                {solicitudData["Tipo de ingresos"] ? "✔" : "*"}
                              </p>
                            </div>

                            <div className="d-flex flex-column mb-2">
                              <input
                                type="number"
                                name="Tiempo de servicios"
                                className="border-secondary form-control text-center"
                                placeholder="Tiempo de servicios"
                                defaultValue={
                                  solicitudData["Tiempo de servicios"] &&
                                  solicitudData["Tiempo de servicios"]
                                }
                                onChange={handlerEventChange}
                              ></input>
                              <p
                                className={
                                  solicitudData["Tiempo de servicios"]
                                    ? "text-success w-100 text-center"
                                    : "text-danger w-100 text-center"
                                }
                              >
                                {solicitudData["Tiempo de servicios"] &&
                                  solicitudData["Tiempo de servicios"].length
                                  ? "✔"
                                  : "*"}
                              </p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">
                              <select
                                onChange={handlerEventChange}
                                className="text-center rounded-1 p-2 w-100"
                                id="cars"
                                defaultValue={
                                  solicitudData["Tipo de propiedad"] &&
                                  solicitudData["Tipo de propiedad"]
                                }
                                name="Tipo de propiedad"
                              >
                                <option value="">Tipo de propiedad</option>
                                <option value="Nueva Interés Regular (+180,000)">
                                  Nueva Interés Regular (+180,000)
                                </option>
                                <option value="Vivienda Nueva Interés Preferencial (hasta 180,000)">
                                  Vivienda Nueva Interés Preferencial (hasta
                                  180,000)
                                </option>
                                <option value="Segundo Uso">Segundo Uso</option>
                              </select>
                              <br />
                              <p
                                className={
                                  solicitudData["Tipo de propiedad"]
                                    ? "text-success w-100 text-center"
                                    : "text-danger w-100 text-center"
                                }
                              >
                                {solicitudData["Tipo de propiedad"] ? "✔" : "*"}
                              </p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">
                              <select
                                onChange={handlerEventChange}
                                className="text-center rounded-1 p-2 w-100"
                                id="cars"
                                defaultValue={
                                  solicitudData["Proposito de compra"] &&
                                  solicitudData["Proposito de compra"]
                                }
                                name="Proposito de compra"
                              >
                                <option value="">Proposito de compra</option>
                                <option value="Vivienda Principal">
                                  Vivienda Principal
                                </option>
                                <option value="Veraneo/Vacacional">
                                  Veraneo/Vacacional
                                </option>
                                <option value="Inversión">Inversión</option>
                                <option value="Traslado y Préstamo con Garantía Hipotecaria">
                                  Traslado y Préstamo con Garantía Hipotecaria
                                </option>
                              </select>
                              <p
                                className={
                                  solicitudData["Proposito de compra"]
                                    ? "text-success w-100 text-center"
                                    : "text-danger w-100 text-center"
                                }
                              >
                                {solicitudData["Proposito de compra"]
                                  ? "✔"
                                  : "*"}
                              </p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">
                              <div class="d-flex justify-content-center align-items-center mb-0 w-100">
                                <span
                                  class="w-25 input-group-text m-0 p-2 d-flex justify-content-center"
                                  id="inputGroup-sizing-sm"
                                >
                                  %
                                </span>
                                <input
                                  type="number"
                                  name="Tasa de interes anual"
                                  className="w-100 border-secondary form-control  text-center p-2 m-0"
                                  placeholder="Tasa de interes anual"
                                  // defaultValue={
                                  //   12
                                  // }
                                  // value={getPorcentajeFijo.tasaDeinteresAnual}
                                  onChange={handlerEventChange}
                                />
                              </div>
                              <br />
                            </div>

                            <div className="d-flex flex-wrap mb-3">
                              <div class="d-flex justify-content-center align-items-center mb-0 w-100">
                                <span
                                  class="w-25 input-group-text m-0 p-2 d-flex justify-content-center"
                                  id="inputGroup-sizing-sm"
                                >
                                  $
                                </span>
                                <input
                                  type="number"
                                  name="Precio de ventas"
                                  className="w-100 border-secondary form-control  text-center p-2 m-0"
                                  placeholder="Precio de ventas"
                                  defaultValue={
                                    solicitudData["Precio de ventas"] &&
                                    solicitudData["Precio de ventas"]
                                  }
                                  onChange={handlerEventChange}
                                />
                              </div>
                              <p
                                className={
                                  solicitudData["Precio de ventas"]
                                    ? "text-success w-100 text-center"
                                    : "text-danger w-100 text-center"
                                }
                              >
                                {solicitudData["Precio de ventas"] &&
                                  solicitudData["Precio de ventas"].length
                                  ? "✔"
                                  : "*"}
                              </p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">
                              <div class="d-flex justify-content-center align-items-center mb-0 w-100">
                                <span
                                  class="w-25 input-group-text m-0 p-2 d-flex justify-content-center"
                                  id="inputGroup-sizing-sm"
                                >
                                  $
                                </span>
                                <input
                                  type="number"
                                  name="Abono inicial sugerido"
                                  className="w-100 border-secondary form-control  text-center p-2 m-0"
                                  placeholder="Abono inicial sujerido"
                                  defaultValue={
                                    solicitudData["Abono inicial sugerido"] &&
                                    solicitudData["Abono inicial sugerido"]
                                  }
                                  onChange={handlerEventChange}
                                />
                              </div>
                              <p
                                className={
                                  solicitudData["Abono inicial sugerido"]
                                    ? "text-success w-100 text-center"
                                    : "text-danger w-100 text-center"
                                }
                              >
                                {solicitudData["Abono inicial sugerido"] &&
                                  solicitudData["Abono inicial sugerido"].length
                                  ? "✔"
                                  : "*"}
                              </p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">
                              <div class="d-flex justify-content-center align-items-center mb-0 w-100">
                                <span
                                  class="w-25 input-group-text m-0 p-2 d-flex justify-content-center"
                                  id="inputGroup-sizing-sm"
                                >
                                  $
                                </span>
                                <input
                                  type="number"
                                  name="Monto de prestamo"
                                  className="w-100 border-secondary form-control  text-center p-2 m-0"
                                  placeholder="Monto de prestamo"
                                  defaultValue={
                                    solicitudData["Monto de prestamo"] &&
                                    solicitudData["Monto de prestamo"]
                                  }
                                  onChange={handlerEventChange}
                                />
                              </div>
                              <p
                                className={
                                  solicitudData["Monto de prestamo"]
                                    ? "text-success w-100 text-center"
                                    : "text-danger w-100 text-center"
                                }
                              >
                                {solicitudData["Monto de prestamo"] &&
                                  solicitudData["Monto de prestamo"].length
                                  ? "✔"
                                  : "*"}
                              </p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">
                              <div class="d-flex justify-content-center align-items-center mb-0 w-100">
                                <span
                                  class="w-25 input-group-text m-0 p-2 d-flex justify-content-center"
                                  id="inputGroup-sizing-sm"
                                >
                                  $
                                </span>
                                <input
                                  type="number"
                                  name="Plazo anual"
                                  className="w-100 border-secondary form-control  text-center p-2 m-0"
                                  placeholder="Plazo anual"
                                  defaultValue={
                                    solicitudData["Plazo anual"] &&
                                    solicitudData["Plazo anual"]
                                  }
                                  onChange={handlerEventChange}
                                />
                              </div>
                              <p
                                className={
                                  solicitudData["Plazo anual"]
                                    ? "text-success w-100 text-center"
                                    : "text-danger w-100 text-center"
                                }
                              >
                                {solicitudData["Plazo anual"] &&
                                  solicitudData["Plazo anual"].length
                                  ? "✔"
                                  : "*"}
                              </p>
                            </div>

                            <div className="d-flex flex-wrap mb-3">
                              <div class="d-flex justify-content-center align-items-center mb-0 w-100">
                                <span
                                  class="w-25 input-group-text m-0 p-2 d-flex justify-content-center"
                                  id="inputGroup-sizing-sm"
                                >
                                  $
                                </span>
                                <input
                                  type="number"
                                  name="Salario"
                                  className="w-100 border-secondary form-control  text-center p-2 m-0"
                                  placeholder="Salario"
                                  defaultValue={
                                    solicitudData["Salario"] &&
                                    solicitudData["Salario"]
                                  }
                                  onChange={handlerEventChange}
                                />
                              </div>
                              <p
                                className={
                                  solicitudData["Salario"]
                                    ? "text-success w-100 text-center"
                                    : "text-danger w-100 text-center"
                                }
                              >
                                {solicitudData["Salario"] &&
                                  solicitudData["Salario"].length
                                  ? "✔"
                                  : "*"}
                              </p>
                            </div>

                            <br />
                          </div>
                        )}

                        {checkNewSolicitud == "true" &&
                          formSolicitud == "form2" && (
                            <div className="my-flex-solicitud p-5 form-group">
                              <br />
                              <label>FORMULARIO DEL SOLICITANTE Nº2</label>
                              <br />
                              <div></div>

                              <div className="d-flex flex-column mb-3">
                                <input
                                  type="text"
                                  name="Nombres"
                                  className="border-secondary form-control text-center"
                                  placeholder="Nombres"
                                  defaultValue={
                                    solicitudData2.Nombres &&
                                    solicitudData2.Nombres
                                  }
                                  onChange={handlerEventChange2}
                                ></input>
                                <p
                                  className={
                                    solicitudData2.Nombres
                                      ? "text-success w-100 text-center"
                                      : "text-danger w-100 text-center"
                                  }
                                >
                                  {solicitudData2.Nombres &&
                                    solicitudData2.Nombres.length
                                    ? "✔"
                                    : "*"}
                                </p>
                              </div>

                              <div className="d-flex flex-column mb-3">
                                <input
                                  type="text"
                                  name="Apellidos"
                                  className="border-secondary form-control text-center"
                                  placeholder="Apellidos"
                                  defaultValue={
                                    solicitudData2.Apellidos &&
                                    solicitudData2.Apellidos
                                  }
                                  onChange={handlerEventChange2}
                                ></input>
                                <p
                                  className={
                                    solicitudData2.Apellidos
                                      ? "text-success w-100 text-center"
                                      : "text-danger w-100 text-center"
                                  }
                                >
                                  {solicitudData2.Apellidos &&
                                    solicitudData2.Apellidos.length
                                    ? "✔"
                                    : "*"}
                                </p>
                              </div>

                              <div className="d-flex flex-wrap mb-3">
                                <select
                                  onChange={handlerEventChange2}
                                  className="border-secondary rounded-1 p-2 text-center w-100"
                                  id="cars"
                                  defaultValue={
                                    solicitudData2.sexo && solicitudData2.sexo
                                  }
                                  name="sexo"
                                >
                                  <option value="">Sexo</option>
                                  <option value="Masculino">Masculino</option>
                                  <option value="Femenino">Femenino</option>
                                  <option value="Indefinido">Indefinido</option>
                                </select>
                                <p
                                  className={
                                    solicitudData2.sexo
                                      ? "text-success w-100 text-center"
                                      : "text-danger w-100 text-center"
                                  }
                                >
                                  {solicitudData2.sexo ? "✔" : "*"}
                                </p>
                              </div>

                              <div className="d-flex flex-wrap mb-3">
                                <input
                                  type="text"
                                  name="Cedula"
                                  className="d-block border-secondary form-control text-center w-100"
                                  placeholder="Cedula"
                                  defaultValue={
                                    solicitudData2.Cedula &&
                                    solicitudData2.Cedula
                                  }
                                  onChange={handlerEventChange2}
                                ></input>
                                <p
                                  className={
                                    solicitudData2.Cedula
                                      ? "text-success w-100 text-center"
                                      : "text-danger w-100 text-center"
                                  }
                                >
                                  {solicitudData2.Cedula &&
                                    solicitudData2.Cedula.length
                                    ? "✔"
                                    : "*"}
                                </p>
                              </div>

                              <div className="d-flex flex-wrap mb-3">
                                <DatePicker
                                  className="d-block border-secondary form-control text-center w-100"
                                  name="Fecha de nacimiento"
                                  selected={selectedDate}
                                  isClearable
                                  showYearDropdown
                                  scrollableMonthYearDropdown
                                  placeholderText={"Escoger fecha"}
                                  onChange={(date) => setselectedDate(date)}
                                />
                                <p
                                  className={
                                    solicitudData["Fecha de nacimiento"]
                                      ? "text-success w-100 text-center"
                                      : "text-danger w-100 text-center"
                                  }
                                >
                                  {solicitudData["Fecha de nacimiento"] &&
                                    solicitudData["Fecha de nacimiento"].length
                                    ? "✔"
                                    : "*"}
                                </p>
                              </div>

                              <div className="d-flex flex-wrap mb-3">
                                <select
                                  onChange={handlerEventChange2}
                                  className="text-center border-secondary rounded-1 p-2 w-100"
                                  id="cars"
                                  defaultValue={
                                    solicitudData2["Estado Migratorio"] &&
                                    solicitudData2["Estado Migratorio"]
                                  }
                                  name="Estado Migratorio"
                                >
                                  <option value="">Estado migratorio</option>
                                  <option value="Panameño">Panameño</option>
                                  <option value="Extranjero - Residente Permanente">
                                    Extranjero - Residente Permanente
                                  </option>
                                  <option value="Extranjero - Residente Temporal">
                                    Extranjero - Residente Temporal
                                  </option>
                                  <option value="Extranjero - No Residente">
                                    Extranjero - No Residente
                                  </option>
                                </select>
                                <br />
                                <p
                                  className={
                                    solicitudData2["Estado Migratorio"]
                                      ? "text-success w-100 text-center"
                                      : "text-danger w-100 text-center"
                                  }
                                >
                                  {solicitudData2["Estado Migratorio"]
                                    ? "✔"
                                    : "*"}
                                </p>
                              </div>

                              <div className="d-flex flex-wrap mb-3">
                                <select
                                  onChange={handlerEventChange2}
                                  className="text-center border-secondary rounded-1 p-2 w-100"
                                  id="cars"
                                  defaultValue={
                                    solicitudData2["Estado Civil"] &&
                                    solicitudData2["Estado Civil"]
                                  }
                                  name="Estado Civil"
                                >
                                  <option value="">Estado civil</option>
                                  <option value="Soltero">Soltero</option>
                                  <option value="Casado">Casado</option>
                                  <option value="Unión Libre">
                                    Unión Libre
                                  </option>
                                </select>
                                <br />
                                <p
                                  className={
                                    solicitudData2["Estado Civil"]
                                      ? "text-success w-100 text-center"
                                      : "text-danger w-100 text-center"
                                  }
                                >
                                  {solicitudData2["Estado Civil"] ? "✔" : "*"}
                                </p>
                              </div>

                              <div className="d-flex flex-wrap mb-3">
                                <select
                                  onChange={handlerEventChange2}
                                  className="text-center border-secondary rounded-1 p-2 w-100"
                                  id="cars"
                                  defaultValue={
                                    solicitudData2["Tipo de ingresos"] &&
                                    solicitudData2["Tipo de ingresos"]
                                  }
                                  name="Tipo de ingresos"
                                >
                                  <option value="">Tipo de ingresos</option>
                                  <option value="Asalariado">Asalariado</option>
                                  <option value="Independiente">
                                    Independiente
                                  </option>
                                </select>
                                <p
                                  className={
                                    solicitudData2["Tipo de ingresos"]
                                      ? "text-success w-100 text-center"
                                      : "text-danger w-100 text-center"
                                  }
                                >
                                  {solicitudData2["Tipo de ingresos"]
                                    ? "✔"
                                    : "*"}
                                </p>
                              </div>

                              <div className="d-flex flex-column mb-2">
                                <input
                                  type="text"
                                  name="Tiempo de servicios"
                                  className="border-secondary form-control text-center"
                                  placeholder="Tiempo de servicios"
                                  defaultValue={
                                    solicitudData2["Tiempo de servicios"] &&
                                    solicitudData2["Tiempo de servicios"]
                                  }
                                  onChange={handlerEventChange2}
                                ></input>
                                <p
                                  className={
                                    solicitudData2["Tiempo de servicios"]
                                      ? "text-success w-100 text-center"
                                      : "text-danger w-100 text-center"
                                  }
                                >
                                  {solicitudData2["Tiempo de servicios"] &&
                                    solicitudData2["Tiempo de servicios"].length
                                    ? "✔"
                                    : "*"}
                                </p>
                              </div>

                              <div className="d-flex flex-wrap mb-3">
                                <select
                                  onChange={handlerEventChange2}
                                  className="text-center rounded-1 p-2 w-100"
                                  id="cars"
                                  defaultValue={
                                    solicitudData2["Tipo de propiedad"] &&
                                    solicitudData2["Tipo de propiedad"]
                                  }
                                  name="Tipo de propiedad"
                                >
                                  <option value="">Tipo de propiedad</option>
                                  <option value="Nueva Interés Regular (+180,000)">
                                    Nueva Interés Regular (+180,000)
                                  </option>
                                  <option value="Vivienda Nueva Interés Preferencial (hasta 180,000)">
                                    Vivienda Nueva Interés Preferencial (hasta
                                    180,000)
                                  </option>
                                  <option value="Segundo Uso">
                                    Segundo Uso
                                  </option>
                                </select>
                                <br />
                                <p
                                  className={
                                    solicitudData2["Tipo de propiedad"]
                                      ? "text-success w-100 text-center"
                                      : "text-danger w-100 text-center"
                                  }
                                >
                                  {solicitudData2["Tipo de propiedad"]
                                    ? "✔"
                                    : "*"}
                                </p>
                              </div>

                              <div className="d-flex flex-wrap mb-3">
                                <select
                                  onChange={handlerEventChange2}
                                  className="text-center rounded-1 p-2 w-100"
                                  id="cars"
                                  defaultValue={
                                    solicitudData2["Proposito de compra"] &&
                                    solicitudData2["Proposito de compra"]
                                  }
                                  name="Proposito de compra"
                                >
                                  <option value="">Proposito de compra</option>
                                  <option value="Vivienda Principal">
                                    Vivienda Principal
                                  </option>
                                  <option value="Veraneo/Vacacional">
                                    Veraneo/Vacacional
                                  </option>
                                  <option value="Inversión">Inversión</option>
                                  <option value="Traslado y Préstamo con Garantía Hipotecaria">
                                    Traslado y Préstamo con Garantía Hipotecaria
                                  </option>
                                </select>
                                <p
                                  className={
                                    solicitudData2["Proposito de compra"]
                                      ? "text-success w-100 text-center"
                                      : "text-danger w-100 text-center"
                                  }
                                >
                                  {solicitudData2["Proposito de compra"]
                                    ? "✔"
                                    : "*"}
                                </p>
                              </div>

                              <div className="d-flex flex-wrap mb-3">
                                <div class="d-flex justify-content-center align-items-center mb-0 w-100">
                                  <span
                                    class="w-25 input-group-text m-0 p-2 d-flex justify-content-center"
                                    id="inputGroup-sizing-sm"
                                  >
                                    %
                                  </span>
                                  <input
                                    type="number"
                                    name="Tasa de interes anual"
                                    className="w-100 border-secondary form-control  text-center p-2 m-0"
                                    placeholder="Tasa de interes anual"
                                    defaultValue={
                                      solicitudData2["Tasa de interes anual"] &&
                                      solicitudData2["Tasa de interes anual"]
                                    }
                                    value={getPorcentajeFijo.tasaDeinteresAnual}
                                    onChange={handlerEventChange2}
                                  />
                                </div>
                                <br />
                              </div>

                              <div className="d-flex flex-wrap mb-3">
                                <div class="d-flex justify-content-center align-items-center mb-0 w-100">
                                  <span
                                    class="w-25 input-group-text m-0 p-2 d-flex justify-content-center"
                                    id="inputGroup-sizing-sm"
                                  >
                                    $
                                  </span>
                                  <input
                                    type="number"
                                    name="Precio de ventas"
                                    className="w-100 border-secondary form-control  text-center p-2 m-0"
                                    placeholder="Precio de ventas"
                                    defaultValue={
                                      solicitudData2["Precio de ventas"] &&
                                      solicitudData2["Precio de ventas"]
                                    }
                                    onChange={handlerEventChange2}
                                  />
                                </div>
                                <p
                                  className={
                                    solicitudData2["Precio de ventas"]
                                      ? "text-success w-100 text-center"
                                      : "text-danger w-100 text-center"
                                  }
                                >
                                  {solicitudData2["Precio de ventas"] &&
                                    solicitudData2["Precio de ventas"].length
                                    ? "✔"
                                    : "*"}
                                </p>
                              </div>

                              <div className="d-flex flex-wrap mb-3">
                                <div class="d-flex justify-content-center align-items-center mb-0 w-100">
                                  <span
                                    class="w-25 input-group-text m-0 p-2 d-flex justify-content-center"
                                    id="inputGroup-sizing-sm"
                                  >
                                    $
                                  </span>
                                  <input
                                    type="number"
                                    name="Abono inicial sugerido"
                                    className="w-100 border-secondary form-control  text-center p-2 m-0"
                                    placeholder="Abono inicial sujerido"
                                    defaultValue={
                                      solicitudData2[
                                      "Abono inicial sugerido"
                                      ] &&
                                      solicitudData2["Abono inicial sugerido"]
                                    }
                                    onChange={handlerEventChange2}
                                  />
                                </div>
                                <p
                                  className={
                                    solicitudData2["Abono inicial sugerido"]
                                      ? "text-success w-100 text-center"
                                      : "text-danger w-100 text-center"
                                  }
                                >
                                  {solicitudData2["Abono inicial sugerido"] &&
                                    solicitudData2["Abono inicial sugerido"]
                                      .length
                                    ? "✔"
                                    : "*"}
                                </p>
                              </div>

                              <div className="d-flex flex-wrap mb-3">
                                <div class="d-flex justify-content-center align-items-center mb-0 w-100">
                                  <span
                                    class="w-25 input-group-text m-0 p-2 d-flex justify-content-center"
                                    id="inputGroup-sizing-sm"
                                  >
                                    $
                                  </span>
                                  <input
                                    type="number"
                                    name="Monto de prestamo"
                                    className="w-100 border-secondary form-control  text-center p-2 m-0"
                                    placeholder="Monto de prestamo"
                                    defaultValue={
                                      solicitudData2["Monto de prestamo"] &&
                                      solicitudData2["Monto de prestamo"]
                                    }
                                    onChange={handlerEventChange2}
                                  />
                                </div>
                                <p
                                  className={
                                    solicitudData2["Monto de prestamo"]
                                      ? "text-success w-100 text-center"
                                      : "text-danger w-100 text-center"
                                  }
                                >
                                  {solicitudData2["Monto de prestamo"] &&
                                    solicitudData2["Monto de prestamo"].length
                                    ? "✔"
                                    : "*"}
                                </p>
                              </div>

                              <div className="d-flex flex-wrap mb-3">
                                <div class="d-flex justify-content-center align-items-center mb-0 w-100">
                                  <span
                                    class="w-25 input-group-text m-0 p-2 d-flex justify-content-center"
                                    id="inputGroup-sizing-sm"
                                  >
                                    $
                                  </span>
                                  <input
                                    type="number"
                                    name="Plazo anual"
                                    className="w-100 border-secondary form-control  text-center p-2 m-0"
                                    placeholder="Plazo anual"
                                    defaultValue={
                                      solicitudData2["Plazo anual"] &&
                                      solicitudData2["Plazo anual"]
                                    }
                                    onChange={handlerEventChange2}
                                  />
                                </div>
                                <p
                                  className={
                                    solicitudData2["Plazo anual"]
                                      ? "text-success w-100 text-center"
                                      : "text-danger w-100 text-center"
                                  }
                                >
                                  {solicitudData2["Plazo anual"] &&
                                    solicitudData2["Plazo anual"].length
                                    ? "✔"
                                    : "*"}
                                </p>
                              </div>

                              <div className="d-flex flex-wrap mb-3">
                                <div class="d-flex justify-content-center align-items-center mb-0 w-100">
                                  <span
                                    class="w-25 input-group-text m-0 p-2 d-flex justify-content-center"
                                    id="inputGroup-sizing-sm"
                                  >
                                    $
                                  </span>
                                  <input
                                    type="number"
                                    name="Salario"
                                    className="w-100 border-secondary form-control  text-center p-2 m-0"
                                    placeholder="Salario"
                                    defaultValue={
                                      solicitudData2["Salario"] &&
                                      solicitudData2["Salario"]
                                    }
                                    onChange={handlerEventChange2}
                                  />
                                </div>
                                <p
                                  className={
                                    solicitudData2["Salario"]
                                      ? "text-success w-100 text-center"
                                      : "text-danger w-100 text-center"
                                  }
                                >
                                  {solicitudData2["Salario"] &&
                                    solicitudData2["Salario"].length
                                    ? "✔"
                                    : "*"}
                                </p>
                              </div>

                              <br />
                            </div>
                          )}
                        <br />
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                            name="check"
                            onChange={handlerEventChangeCheck}
                          />
                          <label
                            class="form-check-label"
                            for="flexCheckDefault"
                          >
                            Acepto que se verifique mis referencias de credito
                            al completar esta solicitud.
                          </label>
                        </div>
                        <br />
                        <button
                          onClick={(e) => saveSolicitud(e, "solicitud")}
                          className="btn-Cotizador col-6 btn btn-primary rounded-5 mb-5"
                        >
                          Continuar
                        </button>
                      </div>
                    </form>

                    {preAprobacion == true && (
                      <div className={"container card card-body shadow p-5"}>
                        <div className="rowclass">
                          <div className="Col1">
                            <img
                              src={Solicitudimg1}
                              className="solicitudimg1"
                            ></img>
                          </div>

                          <div className="Col2">
                            <h3 className="text-center">¡Todo listo!</h3>
                            <h4 className="text-center">
                              Estos son los resultados de tu cotización{" "}
                            </h4>
                            <span>Meses de financiamiento: </span> <br />
                            <span>{solicitudData["Plazo anual"] * 12}</span>
                            <hr />
                            <span>Tasa de interes mensual: </span> <br />
                            <span>
                              {Math.round(interesMensual * 100000) / 100000}{" "}
                            </span>
                            <hr />
                            <span>Pago mensual: </span> <br />
                            <span>{Math.round(cotaMensual * 100) / 100} </span>
                            <hr />
                            <span>Abono inicial Sugerido: </span> <br />
                            <span>
                              {checkNewSolicitud == "true" &&
                                solicitudData2["Abono inicial sugerido"]
                                ? parseInt(
                                  solicitudData["Abono inicial sugerido"]
                                ) +
                                parseInt(
                                  solicitudData2["Abono inicial sugerido"]
                                )
                                : solicitudData["Abono inicial sugerido"]}
                            </span>
                            <hr />
                            <form
                              action=""
                              className="w-100 h5 btn-Cotizador text-light p-3 round-3"
                            >
                              <p className="text-center">
                                ¿Deseas solicitar una pre-aprobación de tu
                                hipoteca?
                              </p>
                              <div className="text-center">
                                <button
                                  className="w-25 btn btn-outline-info m-4"
                                  onClick={(e) =>
                                    saveSolicitud(e, "preAprobacion")
                                  }
                                >
                                  Si
                                </button>
                                <button
                                  className="w-25 btn btn-outline-info m-4"
                                  onClick={(e) =>
                                    saveSolicitud(e, "preAprobacion")
                                  }
                                >
                                  No
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}

                    {datosComplementarios == true && (
                      <div className={"container card card-body shadow p-5"}>
                        <form action="">
                          <h3>Datos complementarios</h3>
                          <div className="">
                            <input
                              onChange={handlerEventChange}
                              type="text"
                              name="Direccion Actual"
                              className=" w-100 border-secondary form-control mb-0 text-center"
                              placeholder="Direccion Actual"
                            ></input>
                            <p
                              className={
                                solicitudData["Direccion Actual"]
                                  ? "text-success m-0 w-100 text-center"
                                  : "text-danger w-100 text-center"
                              }
                            >
                              {solicitudData["Direccion Actual"] ? "✔" : "*"}
                            </p>
                          </div>

                          <div className="">
                            <label htmlFor="">REFERENCIA PERSONAL #1</label>
                            <div className="d-flex w-100 p-0">
                              <div className="d-flex flex-wrap mb-0 p-0 w-100">
                                <input
                                  onChange={handlerEventChange}
                                  type="text"
                                  name="Nombre Completo REF1"
                                  className=" w-100 border-secondary form-control mb-0 mr-1 text-center"
                                  placeholder="Nombre completo"
                                ></input>
                                <p
                                  className={
                                    solicitudData["Nombre Completo REF1"]
                                      ? "text-success m-0 w-100 text-center"
                                      : "text-danger w-100 text-center"
                                  }
                                >
                                  {solicitudData["Nombre Completo REF1"]
                                    ? "✔"
                                    : "*"}
                                </p>
                              </div>

                              <div className="text-light">_</div>

                              <div className="d-flex flex-wrap mb-0 p-0 w-100">
                                <div class="w-100 d-flex justify-content-center align-items-center mb-0 ml-1">
                                  <span
                                    class="w-25 input-group-text m-0 p-2 d-flex justify-content-center"
                                    id="inputGroup-sizing-sm"
                                  >
                                    +507
                                  </span>
                                  <input
                                    onChange={handlerEventChange}
                                    type="number"
                                    name="Numero de Celular REF1"
                                    className="w-100 border-secondary form-control  text-center p-2 m-0"
                                    placeholder="Numero de Celuluar"
                                  />
                                </div>
                                <p
                                  className={
                                    solicitudData["Numero de Celular REF1"]
                                      ? "text-success w-100 text-center m-0"
                                      : "text-danger w-100 text-center m-0"
                                  }
                                >
                                  {solicitudData["Numero de Celular REF1"] &&
                                    solicitudData["Numero de Celular REF1"].length
                                    ? "Correcto"
                                    : "*Debe rellenar el formulario"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <label htmlFor="">REFERENCIA PERSONAL #2</label>
                            <div className="d-flex">
                              <div className="d-flex flex-wrap mb-0 p-0 w-100">
                                <input
                                  onChange={handlerEventChange}
                                  type="text"
                                  name="Nombre Completo REF2"
                                  className=" w-100 border-secondary form-control mb-0 mr-1 text-center"
                                  placeholder="Nombre Completo"
                                ></input>
                                <p
                                  className={
                                    solicitudData["Nombre Completo REF2"]
                                      ? "text-success m-0 w-100 text-center"
                                      : "text-danger w-100 text-center"
                                  }
                                >
                                  {solicitudData["Nombre Completo REF2"]
                                    ? "✔"
                                    : "*"}
                                </p>
                              </div>
                              <div className="text-light">_</div>
                              <div className="text-light">_</div>

                              <div className="d-flex flex-wrap mb-0 p-0 w-100">
                                <div class="w-100 d-flex justify-content-center align-items-center mb-0 ml-1">
                                  <span
                                    class="w-25 input-group-text m-0 p-2 d-flex justify-content-center"
                                    id="inputGroup-sizing-sm"
                                  >
                                    +507
                                  </span>
                                  <input
                                    type="number"
                                    name="Numero de Celular REF2"
                                    className="w-100 border-secondary form-control  text-center p-2 m-0"
                                    placeholder="Numero de Celular"
                                    onChange={handlerEventeChange}
                                  />
                                </div>
                                <p
                                  className={
                                    solicitudData["Numero de Celular REF2"]
                                      ? "text-success w-100 text-center m-0"
                                      : "text-danger w-100 text-center m-0"
                                  }
                                >
                                  {solicitudData["Numero de Celular REF2"] &&
                                    solicitudData["Numero de Celular REF2"].length
                                    ? "Correcto"
                                    : "*Debe rellenar el formulario"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="">
                            <label htmlFor="">REFERENCIA PERSONAL #3</label>
                            <div className="d-flex">
                              <div className="d-flex flex-wrap mb-0 p-0 w-100">
                                <input
                                  onChange={handlerEventChange}
                                  type="text"
                                  name="Nombre Completo REF3"
                                  className=" w-100 border-secondary form-control mb-0 mr-1 text-center"
                                  placeholder="Nombre Completo"
                                ></input>
                                <p
                                  className={
                                    solicitudData["Nombre Completo REF3"]
                                      ? "text-success w-100 text-center m-0"
                                      : "text-danger w-100 text-center m-0"
                                  }
                                >
                                  {solicitudData["Nombre Completo REF3"] &&
                                    solicitudData["Nombre Completo REF3"].length
                                    ? "Correcto"
                                    : "*Debe rellenar el formulario"}
                                </p>
                              </div>

                              <div className="text-light">_</div>

                              <div className="d-flex flex-wrap mb-0 p-0 w-100">
                                <div class="w-100 d-flex justify-content-center align-items-center mb-0 ml-1">
                                  <span
                                    class="w-25 input-group-text m-0 p-2 d-flex justify-content-center"
                                    id="inputGroup-sizing-sm"
                                  >
                                    +507
                                  </span>
                                  <input
                                    onChange={handlerEventChange}
                                    type="number"
                                    name="Numero de Celular REF3"
                                    className="w-100 border-secondary form-control  text-center p-2 m-0"
                                    placeholder="Numero de Celular"
                                  />
                                </div>
                                <p
                                  className={
                                    solicitudData["Numero de Celular REF3"]
                                      ? "text-success w-100 text-center m-0"
                                      : "text-danger w-100 text-center m-0"
                                  }
                                >
                                  {solicitudData["Numero de Celular REF3"] &&
                                    solicitudData["Numero de Celular REF3"].length
                                    ? "Correcto"
                                    : "*Debe rellenar el formulario"}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="w-100 text-center">
                            <button
                              className="btn-Cotizador col-6 btn btn-primary rounded-5 mb-5"
                              onClick={(e) =>
                                saveSolicitud(e, "datosComplementarios")
                              }
                            >
                              {" "}
                              Guardar{" "}
                            </button>
                          </div>
                        </form>
                      </div>
                    )}

                    {cargarDocumentos == true && (
                      <div className={"container card card-body shadow p-5"}>
                        <form action="" className=" w-100 d-flex flex-wrap">
                          <h3 className=" w-100">Cargar Documentos</h3>

                          <div className="w-50 text-center">
                            <label
                              htmlFor="IdentificacionUno"
                              className="w-75 btn btn-Cotizador btn-l mb-3 text-light"
                            >
                              Subir identificacion 1{" "}
                            </label>
                            <input
                              type="file"
                              id="IdentificacionUno"
                              name="Identificacion 1"
                              style={{ display: "none" }}
                              onChange={handlerUploadFile}
                              accept=".jpg, .png"
                            />
                            <img
                              src={
                                postsIMG[
                                `${solicitudData.Cedula}Identificacion 1`
                                ]
                              }
                              style={{
                                width: "30%",
                                height: "250px",
                                objectFit: "cover",
                                marginBottom: "15px",
                              }}
                              alt=""
                            />
                          </div>
                          <div className="w-50 text-center">
                            <label
                              htmlFor="Identificacion2"
                              className="w-75 btn btn-Cotizador btn-l mb-3 text-light"
                            >
                              Subir identificacion 2{" "}
                            </label>
                            <input
                              type="file"
                              id="Identificacion2"
                              name="Identificacion 2"
                              style={{ display: "none" }}
                              onChange={handlerUploadFile}
                              accept=".jpg, .png"
                            />
                            <img
                              src={
                                postsIMG[
                                `${solicitudData.Cedula}Identificacion 2`
                                ]
                              }
                              style={{
                                width: "30%",
                                height: "250px",
                                objectFit: "cover",
                                marginBottom: "15px",
                              }}
                              alt=""
                            />
                          </div>
                          <div className="w-50 text-center">
                            <label
                              htmlFor="CartaDeTrabajo"
                              className="w-75 btn btn-Cotizador btn-l mb-3 text-light"
                            >
                              Subir carta de trabajo{" "}
                            </label>
                            <input
                              type="file"
                              id="CartaDeTrabajo"
                              name="Carta de trabajo"
                              style={{ display: "none" }}
                              onChange={handlerUploadFile}
                              accept=".pdf"
                            />
                            <img
                              src={
                                postsIMG[
                                `${solicitudData.Cedula}Carta de trabajo`
                                ] && "./adobe.png"
                              }
                              style={{
                                width: "30%",
                                height: "250px",
                                objectFit: "contain",
                                objectPosition: "center",
                                marginBottom: "15px",
                              }}
                              onClick={()=>redirect(postsIMG[
                                `${solicitudData.Cedula}Carta de trabajo`
                                ])}
                              alt=""
                            />
                          </div>
                          <div className="w-50 text-center">
                            <label
                              htmlFor="FichaCSS"
                              className="w-75 btn btn-Cotizador btn-l mb-3 text-light"
                            >
                              Subir ficha de C.S.S{" "}
                            </label>
                            <input
                              type="file"
                              id="FichaCSS"
                              name="FichaCSS"
                              style={{ display: "none" }}
                              onChange={handlerUploadFile}
                              accept=".pdf"
                            />
                            <img
                              src={postsIMG[`${solicitudData.Cedula}FichaCSS`] && "./adobe.png"}
                              style={{
                                width: "30%",
                                height: "250px",
                                objectFit: "contain",
                                objectPosition: "center",
                                marginBottom: "15px",
                              }}
                              onClick={()=>redirect(postsIMG[`${solicitudData.Cedula}FichaCSS`])}
                              alt=""
                            />
                          </div>
                          <div className="w-50 text-center">
                            <label
                              htmlFor="Talonario1"
                              className="w-75 btn btn-Cotizador btn-l mb-3 text-light"
                            >
                              Talonario 1{" "}
                            </label>
                            <input
                              type="file"
                              id="Talonario1"
                              name="Talonario 1"
                              style={{ display: "none" }}
                              onChange={handlerUploadFile}
                              accept=".pdf"
                            />
                            <img
                              src={
                                postsIMG[`${solicitudData.Cedula}Talonario 1`] && "./adobe.png"
                              }
                              style={{
                                width: "30%",
                                height: "250px",
                                objectFit: "contain",
                                objectPosition: "center",
                                marginBottom: "15px",
                              }}
                              onClick={()=>redirect(postsIMG[`${solicitudData.Cedula}Talonario 1`])}

                              alt=""
                            />
                          </div>
                          <div className="w-50 text-center">
                            <label
                              htmlFor="Talonario2"
                              className="w-75 btn btn-Cotizador btn-l mb-3 text-light"
                            >
                              Talonario 2{" "}
                            </label>
                            <input
                              type="file"
                              id="Talonario2"
                              name="Talonario 2"
                              style={{ display: "none" }}
                              onChange={handlerUploadFile}
                              accept=".pdf"
                            />
                            <img
                              src={
                                postsIMG[`${solicitudData.Cedula}Talonario 2`] && "./adobe.png"
                              }
                              style={{
                                width: "30%",
                                height: "250px",
                                objectFit: "contain",
                                objectPosition: "center",
                                marginBottom: "15px",
                              }}
                              onClick={()=>redirect(postsIMG[`${solicitudData.Cedula}Talonario 2`])}
                              alt=""
                            />
                          </div>
                          <div className="w-50 text-center">
                            <label
                              htmlFor="Contrato"
                              className="w-75 btn btn-Cotizador btn-l mb-3 text-light"
                            >
                              Subir contrato o proforma
                            </label>
                            <input
                              type="file"
                              id="Contrato"
                              name="Contrato"
                              style={{ display: "none" }}
                              onChange={handlerUploadFile}
                              accept=".pdf"
                            />
                            
                            <img
                              src={postsIMG[`${solicitudData.Cedula}Contrato`] && "./adobe.png"}
                              style={{
                                width: "30%",
                                height: "250px",
                                objectFit: "contain",
                                objectPosition: "center",
                                marginBottom: "15px",
                              }}
                              onClick={()=>redirect(postsIMG[`${solicitudData.Cedula}Contrato`])}
                              alt=""
                            />
                          </div>
                          <div className="w-100 text-center">
                            <button
                              className="btn-Cotizador col-6 btn btn-primary rounded-5 mb-5"
                              onClick={(e) => saveSolicitud(e, "SaveAll")}
                            >
                              Enviar solicitud
                            </button>
                          </div>
                        </form>
                      </div>
                    )}
                    {solicitudenviada == true && (
                      <div className={"container card card-body shadow p-5"}>
                        <div className="rowclass">
                          <div className="Col1Succeeded">
                            <img
                              src={Solicitudimg3}
                              className="solicitudimg3"
                            ></img>
                          </div>

                          <div classMame="Col2Succeeded">
                            <br />

                            <h2 className="text-center">
                              Muchas gracias. Tu solicitud fue enviada con éxito
                            </h2>
                            <br />
                            <h4 className="text-center"> </h4>
                            <form
                              action=""
                              className="w-100 h2 btn-Cotizador text-light p-5 round-5"
                            >
                              <p className="text-center"></p>

                              <div className="text-center">
                                <Link to="/" style={{ textDecoration: "none" }}>
                                  <button className="w-50 btn btn-outline-info m-6">
                                    Escapar
                                  </button>
                                </Link>

                                <Link
                                  to={`/SolicitudesData/${solicitudData.Cedula}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  <button className="w-50 btn btn-outline-info m-6">
                                    Ver resumen
                                  </button>
                                </Link>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="charts"></div>
        <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
        </div>
      </div>
    </div>
  );
}

export default Cotizar;