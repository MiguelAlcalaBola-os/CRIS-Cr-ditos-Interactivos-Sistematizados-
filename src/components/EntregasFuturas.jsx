import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "./alert"
import { login, signup, logout, loginWithGoogle, resetPassword } from "../firebase"
import { useAuth } from '../context/AuthContext.js'
import { removeDataItem, writeUserData } from "../firebase";
import Modal from './SolicitudModal/Modal'
import Error from './Error'
import Success from './Success'
import { getList } from "../storageFB";

export function SolicitudesData() {
    const { userDB, setUserData, postsIMG, setUserPostsIMG, setUserSuccess, success } = useAuth()
    const [modal, setModal] = useState(false);
    const [feedback, setFeedback] = useState({})
    const [item, setItem] = useState(null)
    const [funcion, setFuncion] = useState(null)
    const [estado, setEstado] = useState('EnviadoC')


    const navigate = useNavigate();



    const handlerSolicitud = (item, data) => {
        const observations = feedback[item] ? { observaciones: feedback[item] } : null;
        const object = { estado: data, ...observations, validacion: true  }
        const url = `solicitudes/${item}`
        const complemento = ''
        writeUserData(url, complemento, object)
        setUserSuccess('EnviadoCV')
        setModal(false)
    }

    // const devolver = (item) => {
    //     const observations = feedback[item] ? { observaciones: feedback[item] } : null;
    //     const object = { estado: 'Reprobado', ...observations }
    //     const url = `solicitudes/${item}`
    //     const complemento = ''
    //     writeUserData(url, complemento, object)
    //     setUserSuccess('DevueltoCV')

    // }

    const handleOnChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFeedback({ ...feedback, [name]: value })
    }

    const handlerItemClick = (item) => {
        navigate(`/SolicitudesData/${item}`)
    }
    const handlerModal = (item, data) => {
        setFuncion(data)
        setItem(item)
        setModal(!modal)
    }

    const handlerEstado = (data) => {
        setEstado(data)
    }

    const close = () => {
        setModal(!modal)
    }


    useEffect(() => {
        postsIMG === true && getList(postsIMG, setUserPostsIMG)
    }, [postsIMG]);



    return (
        <>

            <ul class="nav nav-tabs">
                <li class="nav-item">
                    <a class={`nav-link ${estado === 'EnviadoC' && 'active'}`} href="#!" onClick={() => handlerEstado('EnviadoC')}>Nuevos</a>
                </li>
                <li class="nav-item">
                    <a class={`nav-link ${estado === 'Tramites' && 'active'}`} href="#!" onClick={() => handlerEstado('Tramites')}>Tramites</a>
                </li>
                <li class="nav-item">
                    <a class={`nav-link ${estado === 'Validacion' && 'active'}`} href="#!" onClick={() => handlerEstado('Validacion')}>Validación</a>
                </li>
                <li class="nav-item">
                    <a class={`nav-link ${estado === 'DevueltoP' && 'active'}`} href="#!" onClick={() => handlerEstado('DevueltoP')}>Devueltas</a>
                </li>
                <li class="nav-item">
                    <a class={`nav-link ${estado === 'DevueltoT' && 'active'}`} href="#!" onClick={() => handlerEstado('DevueltoT')}>Rechazados</a>
                </li>
            </ul>


            <table className="table h-100">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre del solicitante</th>
                        <th>Apellidos</th>
                        <th>Cedula</th>
                        <th>Tasa de interes anual</th>
                        <th>Precio de venta</th>
                        <th>Observationes</th>
                        <th>Tramitar</th>
                        <th>Devolver</th>


                    </tr>
                </thead>


                {userDB && Object.keys(userDB.solicitudes).map((item, index) =>
                    <>
                        {userDB.solicitudes[item].estado == estado && Math.floor(new Date().getTime() - new Date(userDB.solicitudes[item].fecha).getTime()) / (1000 * 60 * 60 * 24) > 180 && <tbody>

                            <tr>
                                {/* {    console.log(new Date(userDB.solicitudes[item].fecha))} */}

                                {console.log(Math.floor(new Date().getTime() - new Date(userDB.solicitudes[item].fechaDeEmision).getTime()) / (1000 * 60 * 60 * 24))}

                                <th scope="row">{index}</th>
                                <td onClick={() => handlerItemClick(item)}>{userDB.solicitudes[item].Nombres}</td>
                                <td onClick={() => handlerItemClick(item)}>{userDB.solicitudes[item].Apellidos}</td>
                                <td onClick={() => handlerItemClick(item)}>{userDB.solicitudes[item].Cedula}</td>
                                <td>{userDB.solicitudes[item]["Tasa de interes anual"]}</td>
                                <td>{userDB.solicitudes[item]["Precio de ventas"]}$</td>
                                <td> <input name={item} onChange={handleOnChange} placeholder="Observaciones" /> </td>
                                <td><button
                                    type="button"
                                    class="btn btn-success"
                                    onClick={userDB.solicitudes[item].estado == estado && Math.floor(new Date().getTime() - new Date(userDB.solicitudes[item].fechaDeEmision).getTime()) / (1000 * 60 * 60 * 24) > 360
                                        ? () => handlerModal(item, 'Validacion')
                                        : () => handlerModal(item, 'Tramites')}>
                                    Tramitar/Guardar
                                </button></td>
                                <td><button type="button" class="btn btn-danger" onClick={() => handlerModal(item, 'DevueltoP')}>Devolver/Guardar</button></td>
                            </tr>
                        </tbody>}
                    </>
                )}
            </table>
            {modal && <Modal item={item} funcion={handlerSolicitud} funcionName={funcion} msg={funcion == 'Validacion' ? `La solicitud de ${userDB.solicitudes[item].Nombres.toUpperCase()} exede los 365 desea enviarlos a VALIDACION`: null} close={close} />}
        </>
    );
}
export default SolicitudesData;