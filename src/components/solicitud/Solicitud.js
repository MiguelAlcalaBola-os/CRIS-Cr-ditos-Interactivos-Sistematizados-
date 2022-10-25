import "./style/Solicitud.css";
import React from "react";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import "../../../src/pages/home/home.scss";
export function Cotizar() {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
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
                    <form className="m-2">
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
                            name="dato2"
                            className="border-secondary form-control text-center"
                            placeholder="Nombres"
                          ></input>
                          <input
                            type="text"
                            name="dato2"
                            className="border-secondary form-control text-center"
                            placeholder="Apellidos"
                          ></input><br />
                          <div className="">
                            <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" />
                            <label class="btn btn-secondary" for="option1">Hombre</label>
                            <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off" />
                            <label class="btn btn-secondary" for="option2">Mujer</label>
                            <input type="radio" class="btn-check" name="options" id="option3" autocomplete="off" />
                            <label class="btn btn-secondary" for="option3">Indefinido</label>
                          </div><br />
                          <input
                            type="text"
                            name="dato3"
                            className="border-secondary form-control text-center"
                            placeholder="Cedula"
                          ></input><br />
                          <input
                            type="text"
                            name="dato3"
                            className="border-secondary form-control text-center"
                            placeholder="Fecha de nacimiento"
                          ></input><br />

                          <select className="border-secondary rounded-1 p-1" id="cars" name="cars">
                            <option value="volvo">Estado migratorio</option>
                            <option value="saab">opcion</option>
                            <option value="fiat">opcion</option>
                            <option value="audi">opcion</option>
                          </select><br />

                          <select className=" border-secondary rounded-1 p-1" id="cars" name="cars">
                            <option value="volvo">Estado civil</option>
                            <option value="saab">opcion</option>
                            <option value="fiat">opcion</option>
                            <option value="audi">opcion</option>
                          </select><br />
                          <div className="">
                            <input type="radio" class="btn-check" name="options2" id="option4" autocomplete="off" />
                            <label class="btn btn-secondary" for="option4"><small>Ingresos</small> Asalariado</label>
                            <input type="radio" class="btn-check" name="options2" id="option5" autocomplete="off" />
                            <label class="ml1 btn btn-secondary" for="option5"><small>Ingresos</small> Independiente</label>
                          </div><br />

                          <input
                            type="text"
                            name="dato3"
                            className="border-secondary form-control text-center"
                            placeholder="Tiempo de servicios"
                          ></input><br />
                          <select className=" rounded-1 p-1" id="cars" name="cars">
                            <option value="volvo">Tipo de propiedad</option>
                            <option value="saab">Opcion</option>
                            <option value="fiat">Opcion</option>
                            <option value="audi">Opcion</option>
                          </select><br />
                          <select className=" rounded-1 p-1" id="cars" name="cars">
                            <option value="volvo">Proposito de compra</option>
                            <option value="saab">Opcion</option>
                            <option value="fiat">Opcion</option>
                            <option value="audi">Opcion</option>
                          </select><br />
                          <input
                            type="text"
                            name="dato3"
                            className="border-secondary form-control text-center"
                            placeholder="Ingreso Mensula"
                          ></input><br />
                          <input
                            type="text"
                            name="dato3"
                            className="border-secondary form-control text-center"
                            placeholder="Precio de ventas"
                          ></input><br />
                          <input
                            type="text"
                            name="dato3"
                            className="border-secondary form-control text-center"
                            placeholder="Abono inicial sujerido"
                          ></input>
                        </div>
                        <br />
                        <div class="form-check">
                          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                          <label class="form-check-label" for="flexCheckDefault">
                            Acepto que se verifique mis referencias de credito al cpmpletar esta solicitud.
                          </label>
                        </div><br />
                        <button className="btn-Cotizador col-6 btn btn-primary rounded-5 mb-5">Continuar</button>
                      </div>
                    </form>
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
