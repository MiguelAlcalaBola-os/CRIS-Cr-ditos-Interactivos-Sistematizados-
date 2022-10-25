import "./style/Cotizar.css";
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
                    Datos Inmueble
                  </h2>
                  <hr />
                  <br />
          
                  <div className="card border-0">
                    <form className="m-2">
                      <div className="card card-body shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <div className="my-flex p-5 form-group">
                          <input
                            type="text"
                            name="dato2"
                            className="border-secondary form-control text-center"
                            placeholder="Nombre de la propiedad"
                          ></input><br />
                          <div className="">
                            <input type="radio" class="btn-check" name="options" id="option1" autocomplete="off" />
                            <label class="btn btn-secondary" for="option1">Casa</label>
                            <input type="radio" class="btn-check" name="options" id="option2" autocomplete="off" />
                            <label class="btn btn-secondary" for="option2">Apartamento</label>
                          </div><br />
                          <input
                            type="text"
                            name="dato3"
                            className="border-secondary form-control text-center"
                            placeholder="Numero de casa o Apto"
                          ></input><br />
                          <input
                            type="text"
                            name="dato3"
                            className="border-secondary form-control text-center"
                            placeholder="Numero de finca"
                          ></input><br />
                          <input
                            type="text"
                            name="dato3"
                            className="border-secondary form-control text-center"
                            placeholder="Folio"
                          ></input><br />
                          <input
                            type="text"
                            name="dato3"
                            className="border-secondary form-control text-center"
                            placeholder="Distrito"
                          ></input><br />
                          <input
                            type="text"
                            name="dato3"
                            className="border-secondary form-control text-center"
                            placeholder="Corregimiento"
                          ></input><br />
                          <input
                            type="text"
                            name="dato3"
                            className="border-secondary form-control text-center"
                            placeholder="Barriada"
                          ></input><br />
                          <input
                            type="text"
                            name="dato3"
                            className="border-secondary form-control text-center"
                            placeholder="Direccion especifica"
                          ></input><br />

                        </div>                    
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
