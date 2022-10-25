import "./style/Cotizar.css";
import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "../../../src/pages/home/home.scss";
export function Cotizar() {
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
                    Cotiza tu hipoteca, completa todos los campos para conocer cual sera tu letra aproximada
                  </h2>
                  <hr />
                  <br />
                  <br />
      
                  <p className="text-center mb-4">
                    DEBERA LLENAR TODOS LOS CAMPOS SI DESEA COTIZAR
                  </p>

                
                 
                  <div className="card border-0">
                    <form className="m-2">
                      <div className="card card-body shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                        <div className="my-flex p-5 form-group ">
                          <input
                            type="text"
                            name="dato2"
                            className="border-secondary form-control mb-3 text-center"
                            placeholder="Nombre de la propiedad"
                          ></input>

                          <input
                            type="text"
                            name="dato2"
                            className="border-secondary form-control mb-3 text-center"
                            placeholder="Ingresp Mensual"
                          ></input>

                          <input
                            type="text"
                            name="dato3"
                            className="border-secondary form-control mb-3 text-center"
                            placeholder="Precio de Venta"
                          ></input>
                          <input
                            type="text"
                            name="dato3"
                            className="border-secondary form-control mb-3 text-center"
                            placeholder="Abono Inicial"
                          ></input>
                          <br/>
                          <br/>
                          <br/>
                          <label for="cars">Tipo de propiedad</label><br/>
                          <select className="border-secondary rounded-1 p-1" id="cars" name="cars">
                            <option value="volvo">Seleccione su tipo de propiedad</option>
                            <option value="saab">Saab</option>
                            <option value="fiat">Fiat</option>
                            <option value="audi">Audi</option>
                          </select><br/>
                          <label for="cars">Proposito de compra</label><br/>
                          <select className="border-secondary rounded-1 p-1" id="cars" name="cars">
                            <option value="volvo">Seleccione su Proposito de compra</option>
                            <option value="saab">Saab</option>
                            <option value="fiat">Fiat</option>
                            <option value="audi">Audi</option>
                          </select><br/>
                          <label for="cars">Estado Migratorio</label><br/>
                          <select className=" rounded-1 p-1" id="cars" name="cars">
                            <option value="volvo">Seleccione su Estado Migratorio</option>
                            <option value="saab">Saab</option>
                            <option value="fiat">Fiat</option>
                            <option value="audi">Audi</option>
                          </select>
                        </div>
                        <button className="btn-Cotizador col-6 btn btn-primary rounded-5 mb-5">Cotizar</button>
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