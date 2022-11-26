import "./style/Cotizar.css";
import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { writeUserData, removeData } from "../../firebase";
import { useAuth } from "../../context/AuthContext.js";
import CotizarImg from "../../assets/cotizarimg.png";

export function Cotizar() {
  const [allData, setAllData] = useState({});
  const [montoDePrestamo, setMontoDePrestamo] = useState(null);
  const [plazoEnMeses, setPlazoEnMeses] = useState(null);
  const [tasaDeinteresAnual, setTasaDeinteresAnual] = useState("");
  const [interesMensual, setInteresMensual] = useState("");
  const [cotaMensual, setCotaMensual] = useState("");
  const { setSaveCotizacion } = useAuth();
  const [getResta, SetgetResta] = useState({});
  const [getPorcentajeFijo, SetgetPorcentajeFijo] = useState({
    tasaDeinteresAnual: 5.09,
  });

  const [getPorcentage, setGetPorcentage] = useState({
    abonoInicial: 0,
    precioDeVenta: 0.00000001,
  });

  const Guardar = (e) => {
    e.preventDefault();
    if (
      e.target.form[4].value.length < 3 ||
      e.target.form[5].value.length < 3 ||
      e.target.form[6].value.length < 3 ||
      e.target.form[7].value.length < 3
    ) {
      console.log("error");
      return;
    }
    const object = {
      tipoDePropiedad: e.target.form[0].value,
      propositoDeCompra: e.target.form[1].value,
      estadoMigratorio: e.target.form[2].value,
      tipoDeIngreso: e.target.form[3].value,
      nombreDeLaPropiedad: e.target.form[4].value,
      ingresoMensual: e.target.form[5].value,
      precioDeVenta: e.target.form[6].value,
      abonoInicial: e.target.form[7].value,
      montoDePrestamo: e.target.form[8].value,
      tasaDeinteresAnual: e.target.form[9].value,
      plazoEnMeses: e.target.form[10].value,
      tasaDeinteresMensual: interesMensual,
    };
    setAllData(object);
    writeUserData(
      "/cotizaciones/",
      object.nombreDeLaPropiedad.replace(" ", ""),
      object
    );
    setSaveCotizacion(true);
  };

  const calculoDeCotaMensual = (e) => {
    e.preventDefault();
    const p = e.target.form[8].value; // montoDePrestamo
    const n = e.target.form[10].value * 12; // plazoEnMeses
    const tasaDeinteresAnual00 = e.target.form[9].value; //
    const i = tasaDeinteresAnual00 / 100 / ((360 * 12) / 365);
    const cotaMes = p / ((1 - Math.pow(1 + i, -n)) / i);
    console.log(cotaMes);
    setMontoDePrestamo(e.target.form[8].value);
    setPlazoEnMeses(e.target.form[10].value * 12);
    setTasaDeinteresAnual(e.target.form[9].value);

    setInteresMensual(i);
    setCotaMensual(cotaMes);

    setSaveCotizacion(false);
  };






  const handlerEventeChange = (e) => {
    setGetPorcentage({ ...getPorcentage, [e.target.name]: e.target.value });
    SetgetResta({ ...getResta, [e.target.name]: e.target.value });
    SetgetPorcentajeFijo({
      ...getPorcentajeFijo,
      [e.target.name]: e.target.value,
    });
  };

  console.log(getPorcentage);
  console.log(getPorcentajeFijo);
  console.log(getResta);

  const remove = (e) => {
    e.preventDefault();
    removeData();
  };

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <div className="container" class="Cotizar">
            <div className="m-3 text-xl text-gray-900 font-semibold">
              <div className="">
                <div className="col-md-16">
                  <h2 className="text-center mb-4">
                    Cotiza tu hipoteca, completa todos los campos para conocer
                    cual sera tu letra aproximada
                  </h2>
                  <hr />

                  <p className="text-center mb-4">
                    DEBERA LLENAR TODOS LOS CAMPOS SI DESEA COTIZAR
                  </p>
                  <div className="card border-0">
                    <form className="m-2">
                      <div className="card card-body shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <h6 className="text-center">
                          Te recomendamos seleccionar tus parametros deseados
                          antes de ingresar tus datos
                        </h6>
                        <div className="my-flex p-5 form-group ">
                          <select
                            className="border-secondary rounded-1 p-1"
                            id="cars"
                            name="cars"
                          >
                            <option value="Seleccione su tipo de propiedad" className="text-center">
                              Tipo de propiedad:
                            </option>
                            <option value="Nueva Interés Regular (+180,000)">
                              Nueva Interés Regular (+180,000)
                            </option>
                            <option value="Vivienda Nueva Interés Preferencial (hasta 180,000)">
                              Vivienda Nueva Interés Preferencial (hasta
                              180,000)
                            </option>
                            <option value="Segundo Uso">Segundo Uso</option>
                          </select>

                          <select
                            className="border-secondary rounded-1 p-1"
                            id="cars"
                            name="cars"
                          >
                            <option value="Seleccione su Proposito de compra"className="text-center">
                              Proposito de compra:
                            </option>
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

                          <select
                            className=" rounded-1 p-1"
                            id="cars"
                            name="cars"
                          >
                            <option value="Seleccione su Estado Migratorio"className="text-center">
                              Estado Migratorio:
                            </option>
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

                          <select
                            className=" rounded-1 p-1"
                            id="cars"
                            name="cars"
                          >
                            <option value="Seleccione su Estado Migratorio"className="text-center">
                            Tipo de Ingreso:
                            </option>
                            <option value="Panameño">Asalariado Sector Privada</option>
                            <option value="Extranjero - Residente Permanente">
                            Asalariado Sector Público
                            </option>
                            <option value="Extranjero - Residente Temporal">
                            Independiente
                            </option>
                            <option value="Extranjero - No Residente">
                            Profesional Idoneo
                            </option>
                            <option value="Extranjero - No Residente">
                            Jubilado
                            </option>
                            <option value="Extranjero - No Residente">
                            Pensionado
                            </option>
                          </select>

                          <div className="">

                            Nombre de la propiedad
                            <input
                              type="text"
                              name="dato2"
                              className="w-100 border-secondary form-control mb-3 text-center"
                              placeholder="Nombre de la propiedad"
                            />
                          </div>

                          <div className="">
                            Ingreso Mensual
                            <input
                              type="text"
                              name="dato2"
                              className=" w-100 border-secondary form-control mb-3 text-center"
                              placeholder="Ingreso Mensual"
                            />
                          </div>

                          <div className="">
                            Precio de venta
                            <div class="w-100 d-flex justify-content-center align-items-center mb-3">
                              <span
                                class="w-25 input-group-text m-0 p-0 d-flex justify-content-center"
                                id="inputGroup-sizing-sm"
                              >
                                $
                              </span>
                              <input
                                type="text"
                                name="precioDeVenta"
                                className="w-100 border-secondary form-control  text-center p-0 m-0"
                                placeholder="Precio de venta $"
                                onChange={handlerEventeChange}
                              />
                            </div>
                          </div>

                          <div className="">
                            Abono inicial
                            <div class="w-100 d-flex justify-content-center align-items-center mb-3">
                              <span
                                class="w-25 input-group-text m-0 p-0 d-flex justify-content-center"
                                id="inputGroup-sizing-sm"
                              >
                                $
                              </span>
                              <input
                                type="text"
                                name="abonoInicial"
                                className="w-100 border-secondary form-control  text-center p-0 m-0"
                                placeholder="Abono inicial $"
                                onChange={handlerEventeChange}
                              />
                              <span
                                class="w-25 input-group-text m-0 p-0 d-flex justify-content-center"
                                id="inputGroup-sizing-sm"
                              >
                                {(getPorcentage.abonoInicial * 100) /
                                  getPorcentage.precioDeVenta}
                                %
                              </span>
                            </div>

                          </div>

                          <div className="">
                            Financiamiento
                            <div class="w-100 d-flex justify-content-center align-items-center mb-3">
                              <span
                                class="w-25 input-group-text m-0 p-0 d-flex justify-content-center"
                                id="inputGroup-sizing-sm"
                              >
                                $
                              </span>

                              <input
                                type="text"
                                name="Financiamiento"
                                className="w-100 border-secondary form-control  text-center p-0 m-0"
                                placeholder="Monto de financiamiento $$$"
                                value={
                                  getResta.precioDeVenta - getResta.abonoInicial
                                }
                                onChange={handlerEventeChange}
                              />
                            </div>
                          </div>

                          <div className="">
                            Tasa
                            <div class="w-100 d-flex justify-content-center align-items-center mb-3">
                              <input
                                type="text"
                                name="dato3"
                                className="w-100 border-secondary form-control  text-center p-0 m-0"
                                placeholder="Tasa de interes anual $"
                                value={getPorcentajeFijo.tasaDeinteresAnual}
                              />
                              <span
                                class="w-25 input-group-text m-0 p-0 d-flex justify-content-center"
                                id="inputGroup-sizing-sm"
                              >
                                %
                              </span>
                            </div>
                          </div>

                          <div className="w-100">
                            Plazo en años
                            <input
                              type="text"
                              name="dato3"
                              className=" border-secondary form-control mb-3 text-center"
                              placeholder="Plazo en años"
                            />
                          </div>
                        </div>
                        <button
                          className="btn-Cotizador col-6 btn btn-primary rounded-5 mb-5"
                          onClick={calculoDeCotaMensual}
                        >
                          Cotizar
                        </button>
                        {montoDePrestamo && plazoEnMeses && tasaDeinteresAnual && (
                          <div
                            className={"container card card-body shadow p-5"}
                          >
                            <div className="rowclass">
                              <div className="Col1">
                                <img
                                  src={CotizarImg}
                                  className="cotizarimg"
                                ></img>
                              </div>
                              <div className="Col2">
                                <h3 className="text-center">¡Todo listo!</h3>
                                <h4 className="text-center">
                                  Estos son los resultados de tu cotización{" "}
                                </h4>
                                <span>Meses de financiamiento: </span> <br />
                                <span>{plazoEnMeses}</span>
                                <hr />
                                <span>Tasa de interes mensual: </span> <br />
                                <span>
                                  {Math.round(interesMensual * 100000) / 100000}{" "}
                                </span>
                                <hr />
                                <span>Pago mensual: </span> <br />
                                <span>
                                  {Math.round(cotaMensual * 100) / 100}{" "}
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
                                      className="btn-Cotizador col-5 btn btn-primary rounded-5 mb-2"
                                      onClick={Guardar}
                                    >
                                      Guardar Cotizacion
                                    </button>
                                    <button
                                      className="btn-Cotizador col-5 btn btn-primary rounded-5 mb-2"
                                      onClick={remove}
                                    >
                                      Quiero Aplicar
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="charts"></div>
      </div>
    </div>
  );
}

export default Cotizar;