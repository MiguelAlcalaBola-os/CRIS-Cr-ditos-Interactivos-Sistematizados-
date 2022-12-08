import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./alert"
import { login, signup, logout, loginWithGoogle, resetPassword } from "../firebase"
import { useAuth } from '../context/AuthContext.js'
import { removeDataItem } from "../firebase";
import Modal from './SolicitudModal/Modal'
import { getList } from "../storageFB";

export function SolicitudesData() {
    const { userDB, setUserData, postsIMG, setUserPostsIMG } = useAuth()
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();


    const remove = (item) => {
        removeDataItem("/solicitudes/", item, setUserData)
    }
    console.log(userDB)
    const handlerItemClick = (item) => {
        navigate(`/SolicitudesData/${item}`)
    }


    useEffect(() => {
        postsIMG === true &&  getList(postsIMG, setUserPostsIMG)
    }, [postsIMG]);
    return (
        <>

            <table className="table h-100">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre del solicitante</th>
                        <th>Apellidos</th>
                        <th>Cedula</th>
                        <th>Tasa de interes anual</th>
                        <th>Precio de venta</th>
                        <th>Estado</th>
                        <th>Observaciones</th>
                        <th>Borrar</th>
                    </tr>
                </thead>


                {userDB && Object.keys(userDB.solicitudes).map((item, index) =>
                    <>
                        <tbody>

                            <tr onClick={() => handlerItemClick(item)}>
                                <th scope="row">{index}</th>
                                <td>{userDB.solicitudes[item].Nombres}</td>
                                <td>{userDB.solicitudes[item].Apellidos}</td>
                                <td>{userDB.solicitudes[item].Cedula}</td>
                                <td>{userDB.solicitudes[item]["Tasa de interes anual"]}</td>
                                <td>{userDB.solicitudes[item]["Precio de ventas"]}$</td>
                                <td>{userDB.solicitudes[item].estado ? userDB.solicitudes[item].estado : 'Pendiente' }</td>
                                <td>{userDB.solicitudes[item].observaciones ? userDB.solicitudes[item].observaciones : 'Sin Observaciones' }</td>
                                <td><button type="button" class="btn btn-danger" onClick={() => remove(item)}>Eliminar</button></td>
                            </tr>
                        </tbody>


                    </>
                )}
            </table>
        </>
    );
}
export default SolicitudesData;
