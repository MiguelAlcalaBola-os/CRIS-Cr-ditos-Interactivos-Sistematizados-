import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext.js'
import { useState, useEffect } from "react";
import { writeUserData } from "../firebase"
import { uploadIMG } from "../storageFB"

import styles from './SolicitudModal/Modal.module.css'
const Details = () => {

    const { item } = useParams();
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState({ pdfs: [] })






    const {user, userDB, setUserData, setUserSuccess, postsIMG, setUserPostsIMG } = useAuth()
    const [topic, setTopic] = useState(null);

    console.log(userDB)
    function handlerSection(letter) {
        setTopic(letter)
    }

    const handleOnChange = (e) => {
        const arr = Array.from(e.target.files)
        const name = e.target.name
        const value = e.target.value
        setFeedback({ ...feedback, [name]: name == 'pdfs' ? [...feedback.pdfs, ...arr] : value })
    }

    console.log(feedback)

    function handlerNavigation() {
        navigate(`/SolicitudesData`)
    }

    function save() {
        const url = `solicitudes/`
        const obj = feedback.pdfs.map((i, index) => {
            const name = `${item}${i.name}`
            uploadIMG(i, name , setUserSuccess, postsIMG, setUserPostsIMG)
            return i.name
        }  )
        const arr = userDB.solicitudes[item].pdfs? new Set([...userDB.solicitudes[item].pdfs, ...obj]): obj
         
        writeUserData(url, item, { pdfs: [...arr] })

         setFeedback({ pdfs: [] })

    }

    useEffect(() => {

        topic === null && setTopic('Resumen de la Solicitud')

    }, [topic, feedback]);

    return (
        <div className={styles.modal}>
            {userDB && postsIMG && <table className="table-sm bg-light">


                {/* <span onClick={() => click()}>X</span> */}
                <thead>
                    <tr>
                        <th> <h3><span onClick={() => topic != 'Resumen de la Solicitud' ? handlerSection('Resumen de la Solicitud') : handlerNavigation()}>{'<   '}</span>{topic}</h3> </th>
                    </tr>
                </thead>


                {topic === 'Resumen de la Solicitud' ? <>
                    <thead>
                        <tr>
                            <th>Oficial asignado</th>
                            <th>Rafael Hernandez</th>
                        </tr>
                        <tr>
                            <th>Numero de solicitud</th>
                            <th>{item}</th>
                        </tr>
                    </thead>
                    <thead className={styles.banner}>
                        <tr  >
                            <th>Estado de la solicitud pendiente</th>
                            <button className={styles.buttonP}> {userDB.solicitudes[item].estado ? userDB.solicitudes[item].estado : 'Pendiente'}</button>
                        </tr>
                    </thead>

                    <thead>
                        <tr>
                            <th>Letra</th>
                            <th>$832.35</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Precio de vanta</td>
                            <td>{userDB.solicitudes[item]['Precio de ventas']}</td>
                        </tr>
                        <tr>
                            <td>Abono</td>
                            <td>{userDB.solicitudes[item]['Abono inicial sugerido']}</td>
                        </tr>
                        <tr>
                            <td>Financiamiento</td>
                            <td>{userDB.solicitudes[item]['Monto de prestamo']}</td>
                        </tr>
                        <tr>
                            <td>Tasa</td>
                            <td>{userDB.solicitudes[item].tasaCalc}
                            </td>
                        </tr>
                        <tr>
                            <td>Gastos de Manejo</td>
                            <td>Ninguno</td>
                        </tr>
                        <tr>
                            <td>Plazo</td>
                            <td>{userDB.solicitudes[item]['Plazo anual']}</td>
                        </tr>
                        <tr>
                            <td>Seguro de vida</td>
                            <td>Ninguno</td>
                        </tr>
                        <tr>
                            <td>Seguro de incendio</td>
                            <td>Ninguno</td>
                        </tr>
                        <tr>
                            <td>Fecha</td>
                            <td>{userDB.solicitudes[item]['fecha']}</td>
                        </tr>
                    </tbody>
                </> : ''}


                {topic === "Datos Generales" && <>

                    <tbody>
                        <tr>
                            <td>Nombre Completo</td>
                            <td>{userDB.solicitudes[item]['Nombres']}</td>
                        </tr>
                        <tr>
                            <td>Sexo</td>
                            <td>{userDB.solicitudes[item]['sexo']}</td>
                        </tr>
                        <tr>
                            <td>Cedula</td>
                            <td>{userDB.solicitudes[item]['Cedula']}</td>
                        </tr>
                        <tr>
                            <td>Fecha de nacimiento</td>
                            <td>{userDB.solicitudes[item]['fechaDeNacimiento']}</td>
                        </tr>
                        <tr>
                            <td>Estado migratorio</td>
                            <td>{userDB.solicitudes[item]['Estado Migratorio']}</td>
                        </tr>
                        <tr>
                            <td>Estado civil</td>
                            <td>{userDB.solicitudes[item]['Estado Civil']}</td>
                        </tr>
                        <tr>
                            <td>Ingreso</td>
                            <td>{userDB.solicitudes[item]['Salario']}</td>
                        </tr>
                        <tr>
                            <td>Tiempo de servicio</td>
                            <td>{userDB.solicitudes[item]['Tiempo de servicios']} Años</td>
                        </tr>
                        <tr>
                            <td>Tipo de propiedad</td>
                            <td>{userDB.solicitudes[item]['Tipo de propiedad']}</td>
                        </tr>
                        <tr>
                            <td>Proposito de compra</td>
                            <td>{userDB.solicitudes[item]['Proposito de compra']}</td>
                        </tr>
                        <tr>
                            <td>Ingreso mensual</td>
                            <td>{userDB.solicitudes[item]['Salario']}</td>
                        </tr>
                        <tr>
                            <td>Precio de venta</td>
                            <td>{userDB.solicitudes[item]['Precio de ventas']}</td>
                        </tr>
                        <tr>
                            <td>Abono inicial sugerido</td>
                            <td>{userDB.solicitudes[item]['Abono inicial sugerido']}</td>
                        </tr>
                        <tr>
                            <td>Direccion Actual</td>
                            <td>{userDB.solicitudes[item]['Direccion Actual']}</td>
                        </tr>
                    </tbody>
                </>}





                {topic === "Referencias" && <>
                    <thead>
                        <tr>
                            <th>Referencia 1</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nombre Completo</td>
                            <td>{userDB.solicitudes[item]['Nombre Completo REF1']}</td>
                        </tr>
                        <tr>
                            <td>Telefono</td>
                            <td>{userDB.solicitudes[item]['Numero de Celular REF1']}</td>
                        </tr>
                    </tbody>

                    <thead>
                        <tr>
                            <th>Referencia 2</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nombre Completo</td>
                            <td>{userDB.solicitudes[item]['Nombre Completo REF2']}</td>
                        </tr>
                        <tr>
                            <td>Telefono</td>
                            <td>{userDB.solicitudes[item]['Numero de Celular REF2']}</td>
                        </tr>
                    </tbody>

                    <thead>
                        <tr>
                            <th>Referencia 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Nombre Completo</td>
                            <td>{userDB.solicitudes[item]['Nombre Completo REF3']}</td>
                        </tr>
                        <tr>
                            <td>Telefono</td>
                            <td>{userDB.solicitudes[item]['Numero de Celular REF3']}</td>
                        </tr>
                    </tbody>
                </>}



                {topic === "Documentos" && <>
                    <tbody>
                        {console.log(postsIMG[userDB.solicitudes[item].Cedula + "Identificacion 1"])}
                        <tr>
                            <td>Cedula</td>
                            <img src={postsIMG[userDB.solicitudes[item].Cedula + "Identificacion 1"]} alt="" />
                        </tr>
                        <tr>
                            <td>Otra Identificacion</td>
                            <img src={postsIMG[userDB.solicitudes[item].Cedula + "Identificacion 2"]} alt="" />
                        </tr>
                        <tr>
                            <td>Carta de trabajo</td>
                            {postsIMG[userDB.solicitudes[item].Cedula + "Carta de trabajo"] &&
                                <a href={postsIMG[userDB.solicitudes[item].Cedula + "Carta de trabajo"]} target='_blanck' style={{ textDecoration: "none" }}>
                                    <img src="/adobe.png" alt="" />
                                </a>}
                        </tr>
                        <tr>
                            <td>Ficha de seguro social</td>
                            {postsIMG[userDB.solicitudes[item].Cedula + "FichaCSS"] &&
                                <a href={postsIMG[userDB.solicitudes[item].Cedula + "FichaCSS"]} target='_blanck' style={{ textDecoration: "none" }}>

                                    <img src="/adobe.png" alt="" />
                                </a>
                            }
                        </tr>
                        <tr>
                            <td>Talonario 1</td>
                            {postsIMG[userDB.solicitudes[item].Cedula + "Talonario 1"] &&
                                <a href={postsIMG[userDB.solicitudes[item].Cedula + "Talonario 1"]} target='_blanck' style={{ textDecoration: "none" }}>

                                    <img src="/adobe.png" alt="" />
                                </a>
                            }
                        </tr>
                        <tr>
                            <td>Talonario 2</td>
                            {postsIMG[userDB.solicitudes[item].Cedula + "Talonario 2"] &&
                                <a href={postsIMG[userDB.solicitudes[item].Cedula + "Talonario 2"]} target='_blanck' style={{ textDecoration: "none" }}>

                                    <img src="/adobe.png" alt="" />
                                </a>
                            }
                        </tr>
                        <tr>
                            <td>Contrato o proforma</td>
                            {postsIMG[userDB.solicitudes[item].Cedula + "Contrato"] &&
                                <a href={postsIMG[userDB.solicitudes[item].Cedula + "Contrato"]} target='_blanck' style={{ textDecoration: "none" }}>

                                    <img src="/adobe.png" alt="" />
                                </a>
                            }
                        </tr>
                    </tbody>
                </>}




                {topic === "Otros" && <>
                    <tbody >
                        {console.log(postsIMG[userDB.solicitudes[item].Cedula + "Identificacion 1"])}

                        {userDB.users[user.uid].rol == 'cartas' && <tr>
                            <td>
                                <label htmlFor="pdf" className="border px-2">Cargar PDFs</label>
                                <input id='pdf' className="d-none" type='file' name='pdfs' onChange={handleOnChange} accept='.pdf' multiple />
                            </td>

                        </tr>}


                        {feedback.pdfs.map((i, index) =>
                            <tr key={index}>
                                <td className="text-align-center ">
                                    <img src='/adobe.png' style={{ height: '30px' }} alt="" />
                                    {i.name}
                                </td>
                            </tr>
                        )}





                       {userDB.users[user.uid].rol == 'cartas' && <tr>
                            <td>
                                <button className='btn btn-primary' onClick={save}> Guardar </button>
                            </td>
                        </tr>}

                        {
                        userDB.solicitudes[item].pdfs ? userDB.solicitudes[item].pdfs.map((i, index) =>
                            <tr key={index}>
                                <td className="text-align-center " onClick={()=>window.open(postsIMG[`${item}${i}`], '_blank')}>
                                    <img src='/adobe.png' style={{ height: '30px' }} alt="" />
                                    {i}
                                </td>
                            </tr>
                        ) : ''
                        }



                    </tbody>
                </>}


                <tbody>
                    <tr>
                        <td></td>
                        <td><a href="#" onClick={() => handlerSection('Datos Generales')}>Datos Generales {'>'}</a> </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><a href="#" onClick={() => handlerSection('Referencias')}>Referencias {'>'}</a> </td>
                    </tr>

                    <tr>
                        <td></td>
                        <td><a href="#" onClick={() => handlerSection('Documentos')}>Documentos {'>'}</a> </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td><a href="#" onClick={() => handlerSection('Otros')}>Otros {'>'}</a> </td>
                    </tr>
                </tbody>
            </table>}
        </div>
    );
};
export default Details;



