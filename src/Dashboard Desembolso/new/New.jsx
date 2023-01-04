import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import React, { useState } from "react";
import { writeUserData, removeDataPros } from "../../firebase";
import { useAuth } from "../../context/AuthContext.js";
import { uploadIMG } from "../../storageFB";
import ProspectoImg1 from "../../assets/Exito.png";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Success from "../../components/Success";
import Error from "../../components/Error";
import TimePicker from "react-time-picker";
import { Check } from "@mui/icons-material";
const New = ({ inputs, title }) => {
  
  const [form2, setForm2] = useState(false);
  const [photos, setPhotos] = useState({});
  const state = {
    fecha: new Date("2001", "2", "15"),
  };
  const [selectedDate, setselectedDate] = useState(null);
  const { userDB, setUserSuccess, success, postsIMG, setUserPostsIMG } =
    useAuth();

  function handlerUploadFile(e) {
    const fileName = e.target.name;
    const file = e.target.files[0];
    file !== undefined && setPhotos({ ...photos, [fileName]: file });
    uploadIMG(
      file,
      `${prospectodata.ApellidosDelProspecto}${fileName}`,
      setUserSuccess,
      postsIMG,
      setUserPostsIMG
    );
  }
  console.log(photos);
  console.log(postsIMG);
  const [prospectodata, setProspectosData] = useState({});
  const handlerEventChange = (e) => {
    setProspectosData({ ...prospectodata, [e.target.name]: e.target.value });
  };
  const handlerEventChangeHour = (e) => {
    setProspectosData({ ...prospectodata, [e.target.name]: e.target.value });
  };

  const Guardar = (e, letter) => {
    e.preventDefault();
    const soli = Object.keys(prospectodata);
    console.log(soli);
    writeUserData(
      "/prospectos/",
      prospectodata.NombresDelProspecto.replace(" ", ""),
      prospectodata
    );
    if (letter == "cargarDocumentos") {
      prospectodata["NombresDelProspecto"] &&
      prospectodata["ApellidosDelProspecto"] &&
      prospectodata["Numerotelefonico"] &&
      prospectodata["Correoelectronico"] &&
      prospectodata["Propiedaddeinteres"] &&
      prospectodata["Monto"] &&
      prospectodata["Comentarios"] &&
      prospectodata["Tipodeidentificacion"] &&
      prospectodata["Identificacion"] &&
    //  prospectodata["FechaDeCita"] &&
    //  prospectodata["HoraDeCita"] &&
    //  prospectodata["Hora"] &&
    //  prospectodata["Hora"] &&
      Object.keys(photos).length > 0
        ? setForm2(true)
        : setUserSuccess("Complete");
    }
  };

  const remove = (e) => {
    e.preventDefault();
    removeDataPros();
  };

  return (
    <div className="new">
      {success == "Complete" && (
        <Error>Por favor, complete el Formulario correctamente</Error>
      )}
      <Sidebar />
      {success == "Cargando" && <Success> Subiendo, por favor espere</Success>}
      {success == "Save" && <Success> Guardado Exitosamente</Success>}
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h3 className="text-center mb-2">Registrar prospectos</h3>
        </div>
        <h4 className="text-center mb-2">
          Llene todos los formularios y siga los pasos para guardar su prospecto
          correctamente
        </h4>{" "}
        <hr />
        <p className="text-center text-bold">
          Recomendamos llenar los campos solicitados antes de adjuntar un
          documento
        </p>
        <div className="bottom">
          <div className="Col1Pros">
            <img
              src={
                postsIMG[
                  `${prospectodata.ApellidosDelProspecto}DocumentoProspecto`
                ]
              }
              style={{
                width: "60%",
                height: "350px",
                objectFit: "cover",
                marginBottom: "15px",
              }}
              alt=""
            />

            <label className="text-center" htmlFor="DocumentoProspecto">
              Adjuntar Documento :{" "}
              <DriveFolderUploadOutlinedIcon className="icon" />
              <h6 className="text-center">Adjuntar documento es obligarotio</h6>
            </label>

            <input
              type="file"
              id="DocumentoProspecto"
              name="DocumentoProspecto"
              style={{ display: "none" }}
              onChange={handlerUploadFile}
              accept="images"
            />
            <p
              className={
                prospectodata.DocumentoProspecto
                  ? "text-success w-100 text-center"
                  : "text-danger w-100 text-center"
              }
            >
              {prospectodata.DocumentoProspecto &&
              prospectodata.DocumentoProspecto.length
                ? "Correcto"
                : "*"}
            </p>
          </div>

          <div className="right">
            <form>
              <div className="">
                <label htmlFor="">Nombres del prospecto</label>

                <input
                  type="text"
                  name="NombresDelProspecto"
                  className="w-100 border-secondary form-control text-center "
                  placeholder="Ingrese 2 nombres"
                  onChange={handlerEventChange}
                ></input>
                <p
                  className={
                    prospectodata.NombresDelProspecto
                      ? "text-success text-center"
                      : "text-danger text-center"
                  }
                >
                  {prospectodata.NombresDelProspecto &&
                  prospectodata.NombresDelProspecto.length
                    ? "✔"
                    : "*"}
                </p>
              </div>

              <div className="">
                <label htmlFor="">Apellidos del prospecto</label>
                <input
                  type="text"
                  name="ApellidosDelProspecto"
                  className=" w-100 border-secondary form-control text-center"
                  placeholder="Ingrese 2 apellidos"
                  onChange={handlerEventChange}
                ></input>
                <p
                  className={
                    prospectodata.ApellidosDelProspecto
                      ? "text-success text-center"
                      : "text-danger text-center"
                  }
                >
                  {prospectodata.ApellidosDelProspecto &&
                  prospectodata.ApellidosDelProspecto.length
                    ? "✔"
                    : "*"}
                </p>
              </div>

              <div className="">
                <label htmlFor="">Numero telefonico</label>
                <input
                  type="number"
                  name="Numerotelefonico"
                  className=" w-100 border-secondary form-control text-center"
                  placeholder="Telefono"
                  onChange={handlerEventChange}
                ></input>
                <p
                  className={
                    prospectodata.Numerotelefonico
                      ? "text-success text-center"
                      : "text-danger text-center"
                  }
                >
                  {prospectodata.Numerotelefonico &&
                  prospectodata.Numerotelefonico.length
                    ? "✔"
                    : "*"}
                </p>
              </div>

              <div className="">
                <label htmlFor="">Correo electronico</label>
                <input
                  type="text"
                  name="Correoelectronico"
                  className=" w-100 border-secondary form-control text-center"
                  placeholder="E-mail"
                  onChange={handlerEventChange}
                ></input>
                <p
                  className={
                    prospectodata.Correoelectronico
                      ? "text-success w-100 text-center"
                      : "text-danger w-100 text-center"
                  }
                >
                  {prospectodata.Correoelectronico &&
                  prospectodata.Correoelectronico.length
                    ? "✔"
                    : "*"}
                </p>
              </div>

              <div className="">
                <label htmlFor="">Propuedad de interes</label>
                <input
                  type="text"
                  name="Propiedaddeinteres"
                  className=" w-100 border-secondary form-control text-center"
                  placeholder="Propiedad de interes"
                  onChange={handlerEventChange}
                ></input>
                <p
                  className={
                    prospectodata.Propiedaddeinteres
                      ? "text-success w-100 text-center"
                      : "text-danger w-100 text-center"
                  }
                >
                  {prospectodata.Propiedaddeinteres &&
                  prospectodata.Propiedaddeinteres.length
                    ? "✔"
                    : "*"}
                </p>
              </div>

              <div className="">
                <label htmlFor="">Monto</label>
                <input
                  type="text"
                  name="Monto"
                  className=" w-100 border-secondary form-control text-center"
                  placeholder="Monto $$$"
                  onChange={handlerEventChange}
                ></input>
                <p
                  className={
                    prospectodata.Monto
                      ? "text-success w-100 text-center"
                      : "text-danger w-100 text-center"
                  }
                >
                  {prospectodata.Monto && prospectodata.Monto.length
                    ? "✔"
                    : "*"}
                </p>
              </div>
              <div className="">
                <label htmlFor="">Comentarios</label>
                <input
                  type="text"
                  name="Comentarios"
                  className="w-100 border-secondary form-control text-center"
                  placeholder="Comentario (Opcional)"
                  onChange={handlerEventChange}
                ></input>
                <p
                  className={
                    prospectodata.Comentarios
                      ? "text-success w-100 text-center"
                      : "text-danger w-100 text-center"
                  }
                >
                  {prospectodata.Comentarios && prospectodata.Comentarios.length
                    ? "✔"
                    : "*"}
                </p>
              </div>

              <div>
                <select
                  onChange={handlerEventChange}
                  className="text-center border-secondary rounded-2 w-100"
                  id="cars"
                  name="Tipodeidentificacion"
                >
                  <option value="">Tipo de identificacion</option>
                  <option value="Panameño">Cedula Panameña - Nacional</option>
                  <option value="Extranjero - Residente Permanente">
                    Pasaporte - Extrangero
                  </option>
                </select>

                <label htmlFor=""></label>
                <input
                  type="text"
                  name="Identificacion"
                  className="w-100 border-secondary form-control text-center"
                  placeholder="Identificacion"
                  onChange={handlerEventChange}
                ></input>
                <p
                  className={
                    prospectodata.Identificacion
                      ? "text-success w-100 text-center"
                      : "text-danger w-100 text-center"
                  }
                >
                  {prospectodata.Identificacion &&
                  prospectodata.Identificacion.length
                    ? "✔"
                    : "*"}
                </p>
              </div>
            </form>
            <div className="Picker">
              <div>
                <label htmlFor="">Fecha de cita</label>

                <DatePicker
                  className="text-center"
                  name="FechaDeCita"
                  selected={selectedDate}
                  placeholderText={"Escoger fecha"}
                  onChange={date =>
                    setselectedDate (date)
                  }
                  isClearable
                  showYearDropdown
                  scrollableMonthYearDropdown
                />
                  <p
                  className={
                    prospectodata.FechaDeCita
                      ? "text-success w-100 text-center"
                      : "text-danger w-100 text-center"
                  }
                >
                  {prospectodata.FechaDeCita && prospectodata.FechaDeCita.length
                    ? "✔"
                    : "*"}
                </p>
              </div>
              <div className="w-25">
                <label htmlFor="">Hora de cita</label>
                <TimePicker
                  className="text-center w-100"
                  name="HoraDeCita"
                //  onChange={handlerEventChangeHour}
                />
                  <p
                  className={
                    prospectodata.HoraDeCita
                      ? "text-success w-100 text-center"
                      : "text-danger w-100 text-center"
                  }
                >
                  {prospectodata.HoraDeCita && prospectodata.HoraDeCita.length
                    ? "✔"
                    : "*"}
                </p>
              </div>
            </div>

            <button
              className="w-100"
              onClick={(e) => Guardar(e, "cargarDocumentos")}
            >
              Guardar prospecto
            </button>
            <div className="FechaHora"></div>
          </div>
        </div>
        <div>
          {form2 == true && (
            <div className={"container card card-body shadow p-5"}>
              <div className="rowclass">
                <img src={ProspectoImg1} className="prospectoimg"></img>

                <div className="Col2Pros">
                  <br />

                  <h2 className="text-center">
                    Bien hecho, has registrado con éxito a tu prospecto
                  </h2>
                  <br />
                  <h4 className="text-center"> </h4>
                  <form
                    action=""
                    className="w-100 h5 btn-Cotizador text-light p-5 round-5"
                  >
                    <br />
                    <p className="text-center">
                      Puedes ver un resumen de tu prospecto o bien, ir
                      directamente al inicio
                    </p>

                    <div className="text-center">
                      <Link to="/" style={{ textDecoration: "none" }}>
                        <button className="btn-Cotizador col-5 btn btn-primary rounded-5 mb-2">
                          Escapar
                        </button>
                      </Link>

                      <Link
                        to="/SolicitudesData"
                        style={{ textDecoration: "none" }}
                      >
                        <button className="btn-Cotizador col-5 btn btn-primary rounded-5 mb-2">
                          Ver resumen
                        </button>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
              <br />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default New;
