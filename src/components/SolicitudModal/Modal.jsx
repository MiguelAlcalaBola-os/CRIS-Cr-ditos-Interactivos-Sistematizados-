import { useAuth } from '../../context/AuthContext.js'
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from './Modal.module.css'

export default function Modal({ item, funcion, funcionName, msg, close}) {
    const { userDB, setUserData, postsIMG, setUserPostsIMG, setUserSuccess, success } = useAuth()


    return (
        <div className={styles.modal}>
            <div className='d-flex flex-column justify-content-center align-items-center  bg-light w-50 h-50 color-dark'>
            <span onClick={close}>X</span>
            <img src="/modal.jpeg" alt="" />

          { msg ? msg : `${userDB.solicitudes[item].Nombres.toUpperCase() }esta aputo de ser ${funcionName.toUpperCase()}` }
            <button className={`btn text-light rounded-5 py-1 px-5 ${styles.button}`} onClick={()=>funcion(item, funcionName )}>Confirmar</button>
            </div>
        </div>
    )
}


