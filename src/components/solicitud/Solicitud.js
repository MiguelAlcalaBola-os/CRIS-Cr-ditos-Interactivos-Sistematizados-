import "./style/Solicitud.css";
import React, { useState } from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import { writeUserData, removeData } from "../../firebase";
import { uploadIMG } from "../../storageFB";
import Success from "../Success";
import Solicitudimg1 from "../../assets/solicitudimg1.png";
import "../../../src/pages/home/home.scss";
import { useAuth } from '../../context/AuthContext.js'


export function Cotizar() {
  const { userDB, setUserSuccess, success, postsIMG, setUserPostsIMG } = useAuth()

  const [solicitudData, setSolicitudData] = useState({})
  const [preAprobacion, setPreAprobacion] = useState(false)
  const [datosComplementarios, setDatosComplementarios] = useState(false)
  const [cargarDocumentos, setCargarDocumentos] = useState(false)


  function handlerUploadFile(e) {
    const fileName = e.target.name
    const file = e.target.files[0]
    uploadIMG(file, `${solicitudData.Cedula}${fileName}`, setUserSuccess, postsIMG, setUserPostsIMG)
  }
  console.log(postsIMG)
  const handlerEventChange = (e) => {
    setSolicitudData({ ...solicitudData, [e.target.name]: e.target.value })
  }
  const saveSolicitud = (e, letter) => {
    e.preventDefault()
    writeUserData("/solicitudes/", solicitudData.Nombres, solicitudData)
    if (letter == "solicitud") setPreAprobacion(true)
    if (letter == "preAprobacion") setDatosComplementarios(true)
    if (letter == "datosComplementarios") setCargarDocumentos(true)

  }
  const handlerEventeChange = e => {
    setSolicitudData({ ...solicitudData, [e.target.name]: e.target.value })
  }
  return (
    <div className="home">
      <Sidebar />
{   success == "Cargando" &&   <Success> Cargando</Success>
}      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <div className="container w-100%">
            <div className="col-12 m-3 text-xl text-gray-900 font-semibold">
              <div className="col-12">
                <div className="col-md-16 col-12">
                  <h2 className="text-center mb-4">
                    Solicitud
                  </h2>
                  <hr />
                  <br />
                  <br />

                  <p className="text-center mb-4">
                    ingresa tus datos para completar tu solicitud.
                  </p>


                  <div className="card border-0">
                    <form className="m-1">
                      <div className="card card-body shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <div className="my-flex-solicitud p-5 form-group">
                          <div>
                            <label for="cars">Cantidad de solicitantes</label><br />
                            <div className="d-flex">
                              <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                <label class="form-check-label" for="inlineRadio1">1</label>
                              </div>
                              <div class="form-check form-check-inline">
                                <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                <label class="form-check-label" for="inlineRadio2">2</label>
                              </div>
                            </div>
                          </div>
                          <div></div>
                          <br />
                          <label>SOLICITANTE Nº1</label><br />
                          <div></div>
                          <input
                            type="text"
                            name="Nombres"
                            className="border-secondary form-control text-center"
                            placeholder="Nombres"
                            onChange={handlerEventChange}
                          ></input>
                          <input
                            type="text"
                            name="Apellidos"
                            className="border-secondary form-control text-center"
                            placeholder="Apellidos"
                            onChange={handlerEventChange}
                          ></input><br />
                          <select onChange={handlerEventChange} className="border-secondary rounded-1 p-1 text-center" id="cars" name="sexo">
                            <option value="">Sexo</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Indefinido">Indefinido</option>
                          </select><br />
                          <input
                            type="text"
                            name="Cedula"
                            className="border-secondary form-control text-center"
                            placeholder="Cedula"
                            onChange={handlerEventChange}
                          ></input><br />
                          <input
                            type="text"
                            name="Fecha de nacimiento"
                            className="border-secondary form-control text-center"
                            placeholder="Fecha de nacimiento"
                            onChange={handlerEventChange}
                          ></input><br />

                          <select onChange={handlerEventChange} className="text-center border-secondary rounded-1 p-1" id="cars" name="EstadoMigratorio">
                            <option value="">Estado migratorio</option>
                            <option value="Panameño">Panameño</option>
                            <option value="Extranjero - Residente Permanente">Extranjero - Residente Permanente</option>
                            <option value="Extranjero - Residente Temporal">Extranjero - Residente Temporal</option>
                            <option value="Extranjero - No Residente">Extranjero - No Residente</option>
                          </select><br />

                          <select onChange={handlerEventChange} className="text-center border-secondary rounded-1 p-1" id="cars" name="Estado Civil">
                            <option value="">Estado civil</option>
                            <option value="Soltero">Soltero</option>
                            <option value="Casado">Casado</option>
                            <option value="Unión Libre">Unión Libre</option>
                          </select><br />
                          <select onChange={handlerEventChange} className="text-center border-secondary rounded-1 p-1" id="cars" name="Tipo de ingresos">
                            <option value="">Tipo de ingresos</option>
                            <option value="Asalariado">Asalariado</option>
                            <option value="Independiente">Independiente</option>

                          </select><br />

                          <input
                            type="text"
                            name="Tiempo de servicios"
                            className="border-secondary form-control text-center"
                            placeholder="Tiempo de servicios"
                            onChange={handlerEventChange}
                          ></input><br />
                          <select onChange={handlerEventChange} className="text-center rounded-1 p-1" id="cars" name="Tipo de propiedad">
                            <option value="">Tipo de propiedad</option>
                            <option value="Nueva Interés Regular (+180,000)">Nueva Interés Regular (+180,000)</option>
                            <option value="Vivienda Nueva Interés Preferencial (hasta 180,000)">Vivienda Nueva Interés Preferencial (hasta 180,000)</option>
                            <option value="Segundo Uso">Segundo Uso</option>
                          </select><br />
                          <select onChange={handlerEventChange} className="text-center rounded-1 p-1" id="cars" name="Proposito de compra">
                            <option value="">Proposito de compra</option>
                            <option value="Vivienda Principal">Vivienda Principal</option>
                            <option value="Veraneo/Vacacional">Veraneo/Vacacional</option>
                            <option value="Inversión">Inversión</option>
                            <option value="Traslado y Préstamo con Garantía Hipotecaria">Traslado y Préstamo con Garantía Hipotecaria</option>
                          </select><br />


                          <div class="d-flex justify-content-center align-items-center mb-3">
                            <span class="w-25 input-group-text m-0 p-2 d-flex justify-content-center" id="inputGroup-sizing-sm">%</span>
                            <input type="text"
                              name="Tasa de interes anual"
                              className="w-100 border-secondary form-control  text-center p-2 m-0"
                              placeholder="Tasa de interes anual"
                              onChange={handlerEventChange} />
                          </div>


                          <div class="d-flex justify-content-center align-items-center mb-3">
                            <span class="w-25 input-group-text m-0 p-2 d-flex justify-content-center" id="inputGroup-sizing-sm">$</span>
                            <input type="text"
                              name="Precio de ventas"
                              className="w-100 border-secondary form-control  text-center p-2 m-0"
                              placeholder="Precio de ventas"
                              onChange={handlerEventChange} />
                          </div>


                          <div class="d-flex justify-content-center align-items-center mb-3">
                            <span class="w-25 input-group-text m-0 p-2 d-flex justify-content-center" id="inputGroup-sizing-sm">$</span>
                            <input type="text"
                              name="Abono inicial sugerido"
                              className="w-100 border-secondary form-control  text-center p-2 m-0"
                              placeholder="Abono inicial sujerido"
                              onChange={handlerEventChange} />
                          </div>
                          <br />

                        </div>
                        <br />
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                          <label class="form-check-label" for="flexCheckDefault">
                            Acepto que se verifique mis referencias de credito al cpmpletar esta solicitud.
                          </label>
                        </div><br />
                        <button onClick={(e) => saveSolicitud(e, "solicitud")} className="btn-Cotizador col-6 btn btn-primary rounded-5 mb-5">Continuar</button>
                      </div>
                    </form>
                    {preAprobacion == "no sirve" &&
                      <div className={"container card card-body shadow"}>
                        <div className="row">
                          <div className="col-4 text-center">
                            <span>Nombres </span> <br /><span>{solicitudData.Nombres}</span>
                          </div>
                          <div className="col-4 text-center">
                            <span>Cedula </span> <br /><span>{solicitudData.Cedula}</span>
                          </div>
                          <div className="col-4 text-center">
                            <span>Sexo </span> <br /><span>{solicitudData.sexo} </span>
                          </div>
                          <div className="col-4 text-center">
                            <span>Ingreso Mensual</span> <br /><span>{solicitudData["Ingreso mensual"]} </span>
                          </div>
                          <div className="col-4 text-center">
                            <span>Precio de ventas </span> <br /><span>{solicitudData["Precio de ventas"]} </span>
                          </div>
                          <div className="col-4 text-center">
                            <span>Abono inicial sugerido </span> <br /><span>{solicitudData["Abono inicial sugerido"]} </span>
                          </div>
                        </div>
                      </div>}

                    {preAprobacion == true && <div className={"container card card-body shadow p-5"}>
                      <div className="Image1 row">
                        <img src={Solicitudimg1} className="solicitudimg"></img>
                      </div>
                      <h2 className="text-center">Pre-Aprobacion</h2>
                      <h4 className="text-center">Genial, estas pre-aprobado finaliza tu solicitud </h4>

                      <p>Letra</p>
                      <p>Plazo</p>
                      <p>Taza</p>
                      <form action="" className="w-100 h3 btn-Cotizador text-light p-3 round-3">
                        <p className="text-center">¿Ya eligio propiedad?</p>
                        <div className="text-center">
                          <button className="w-25 btn btn-outline-info m-2" onClick={(e) => saveSolicitud(e, "preAprobacion")} >Si</button>
                          <button className="w-25 btn btn-outline-info m-2" onClick={(e) => saveSolicitud(e, "preAprobacion")}>No</button>
                        </div>

                      </form>
                    </div>}



                    {datosComplementarios == true && <div className={"container card card-body shadow p-5"}>

                      <form action="">
                        <h3>Datos complementarios</h3>
                        <div className="">
                          <input
                            type="text"
                            name="Direccion Actual"
                            className=" w-100 border-secondary form-control mb-3 text-center"
                            placeholder="Direccion Actual"
                          ></input>
                        </div>

                        <div className="">
                          <label htmlFor="">REFERENCIA PERSONAL #1</label>
                          <div className="d-flex">
                            <input
                              type="text"
                              name="Nombre Completo REF1"
                              className=" w-50 border-secondary form-control mb-3 mr-1 text-center"
                              placeholder="Nombre completo"
                            ></input>
                            <div className="text-light">_</div>
                            <div class="w-50 d-flex justify-content-center align-items-center mb-3 ml-1">
                              <span class="w-25 input-group-text m-0 p-2 d-flex justify-content-center" id="inputGroup-sizing-sm">+507</span>
                              <input type="text"
                                name="Numero de Celular REF1"
                                className="w-100 border-secondary form-control  text-center p-2 m-0"
                                placeholder="Numero de Celuluar"
                                onChange={handlerEventeChange} />
                            </div>
                          </div>
                        </div>
                        <div className="">
                          <label htmlFor="">REFERENCIA PERSONAL #2</label>
                          <div className="d-flex">
                            <input
                              type="text"
                              name="Nombre Completo REF2"
                              className=" w-50 border-secondary form-control mb-3 mr-1 text-center"
                              placeholder="Nombre Completo"
                            ></input>
                            <div className="text-light">_</div>
                            <div class="w-50 d-flex justify-content-center align-items-center mb-3 ml-1">
                              <span class="w-25 input-group-text m-0 p-2 d-flex justify-content-center" id="inputGroup-sizing-sm">+507</span>
                              <input type="text"
                                name="Numero de Celular REF2"
                                className="w-100 border-secondary form-control  text-center p-2 m-0"
                                placeholder="Numero de Celular"
                                onChange={handlerEventeChange} />
                            </div>
                          </div>
                        </div>
                        <div className="">
                          <label htmlFor="">REFERENCIA PERSONAL #3</label>
                          <div className="d-flex">
                            <input
                              type="text"
                              name="Nombre Completo REF3"
                              className=" w-50 border-secondary form-control mb-3 mr-1 text-center"
                              placeholder="Nombre Completo"
                            ></input>
                            <div className="text-light">_</div>
                            <div class="w-50 d-flex justify-content-center align-items-center mb-3 ml-1">
                              <span class="w-25 input-group-text m-0 p-2 d-flex justify-content-center" id="inputGroup-sizing-sm">+507</span>
                              <input type="text"
                                name="Numero de Celular REF3"
                                className="w-100 border-secondary form-control  text-center p-2 m-0"
                                placeholder="Numero de Celular"
                                onChange={handlerEventeChange} />
                            </div>
                          </div>
                        </div>
                        <div className="w-100 text-center">
                          <button className="btn-Cotizador col-6 btn btn-primary rounded-5 mb-5" onClick={(e) => saveSolicitud(e, "datosComplementarios")}> Guardar </button>
                        </div>

                      </form>



                    </div>}


                    {cargarDocumentos == true && <div className={"container card card-body shadow p-5"}>
                      <form action="" className=" w-100 d-flex flex-wrap">
                        <h3 className=" w-100">Cargar Documentos</h3>

                        <div className="w-50 text-center">
                          <label htmlFor="IdentificacionUno" className="w-75 btn btn-Cotizador btn-lg mb-3 text-light" >Subir identificacion 1 </label>
                          <input type="file" id="IdentificacionUno" name="Identificacion 1" style={{ display: "none" }} onChange={handlerUploadFile} accept="images" />
                          <img src={postsIMG[`${solicitudData.Cedula}Identificacion 1`]} style={{width: "50%", height: "400px", objectFit: "cover",  marginBottom: "15px"}} alt="" />
                        </div>
                        <div className="w-50 text-center">
                          <label htmlFor="Identificacion2" className="w-75 btn btn-Cotizador btn-lg mb-3 text-light" >Subir identificacion 2 </label>
                          <input type="file" id="Identificacion2" name="Identificacion 2" style={{ display: "none" }} onChange={handlerUploadFile} accept="images" />
                          <img src={postsIMG[`${solicitudData.Cedula}Identificacion 2`]} style={{width: "50%", height: "400px", objectFit: "cover",  marginBottom: "15px"}} alt="" />
                        </div>
                        <div className="w-50 text-center">
                          <label htmlFor="CartaDeTrabajo" className="w-75 btn btn-Cotizador btn-lg mb-3 text-light" >Subir carta de trabajo </label>
                          <input type="file" id="CartaDeTrabajo" name="Carta de trabajo" style={{ display: "none" }} onChange={handlerUploadFile} accept="images" />
                          <img src={postsIMG[`${solicitudData.Cedula}Carta de trabajo`]} style={{width: "50%", height: "400px", objectFit: "cover",  marginBottom: "15px"}} alt="" />
                        </div>
                        <div className="w-50 text-center">
                          <label htmlFor="FichaCSS" className="w-75 btn btn-Cotizador btn-lg mb-3 text-light" >Subir ficha de C.S.S </label>
                          <input type="file" id="FichaCSS" name="FichaCSS" style={{ display: "none" }} onChange={handlerUploadFile} accept="images" />
                          <img src={postsIMG[`${solicitudData.Cedula}FichaCSS`]} style={{width: "50%", height: "400px", objectFit: "cover",  marginBottom: "15px"}} alt="" />
                        </div>
                        <div className="w-50 text-center">
                          <label htmlFor="Talonario1" className="w-75 btn btn-Cotizador btn-lg mb-3 text-light" >Talonario 1 </label>
                          <input type="file" id="Talonario1" name="Talonario 1" style={{ display: "none" }} onChange={handlerUploadFile} accept="images" />
                          <img src={postsIMG[`${solicitudData.Cedula}Talonario 1`]} style={{width: "50%", height: "400px", objectFit: "cover",  marginBottom: "15px"}} alt="" />
                        </div>
                        <div className="w-50 text-center">
                          <label htmlFor="Talonario2" className="w-75 btn btn-Cotizador btn-lg mb-3 text-light">Talonario 2 </label>
                          <input type="file" id="Talonario2" name="Talonario 2" style={{ display: "none" }} onChange={handlerUploadFile} accept="images" />
                          <img src={postsIMG[`${solicitudData.Cedula}Talonario 2`]} style={{width: "50%", height: "400px", objectFit: "cover",  marginBottom: "15px"}} alt="" />           
                        </div>
                        <div className="w-50 text-center">
                          <label htmlFor="Contrato" className="w-75 btn btn-Cotizador btn-lg mb-3 text-light" >Subir contrato o proforma </label>
                          <input type="file" id="Contrato" name="Contrato" style={{ display: "none" }} onChange={handlerUploadFile} accept="images" />
                          <img src={postsIMG[`${solicitudData.Cedula}Contrato`]} style={{width: "50%", height: "400px", objectFit: "cover",  marginBottom: "15px"}} alt="" />
                        </div>
                        <div className="w-100 text-center">
                          <button className="btn-Cotizador col-6 btn btn-primary rounded-5 mb-5" onClick={(e) => saveSolicitud(e, "datosComplementarios")}>Enviar solicitud</button>
                        </div>
                      </form>
                    </div>}





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