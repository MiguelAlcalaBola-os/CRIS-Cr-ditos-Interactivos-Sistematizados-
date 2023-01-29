import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { writeUserData, removeDataItem } from "../../firebase";
import { useAuth } from '../../context/AuthContext';

const VerMensaje = () => {

    const { setUserData, tipoMensaje } = useAuth();

    const params = useParams();

    const { id } = params;


    const handleClick = (e, id) => {
        e.preventDefault();
        if(id){
          try{
            removeDataItem("/mensajes/", id, setUserData)
          }catch(error){
            console.log(error)
          }
        }
      }

    
  return (
    <>
    
        <h1>Mensaje</h1>

        {tipoMensaje.map((item, index) => (

        <>
            {item.id == id ? 
            <div className='container d-flex flex-column justify-content-center w-50 mt-20'>
                <div className='text-start'>
                    
                    <p className='fw-bold text-lg text-uppercase'>De: <span className='fw-light text-capitalize'>{item.de}</span></p>

                    <p className='fw-bold text-lg text-uppercase'>Asunto: <span className='fw-light text-capitalize'>{item.asunto}</span></p>
                    
                    <p className='fw-bold text-lg text-uppercase'>Solicitud Nro: <span className='fw-light text-capitalize'>{item.solicitud}</span></p>

                    <p className='fw-bold text-lg text-uppercase'>Id Correo: <span className='fw-light text-capitalize'>{item.id}</span></p>

                    <p className='fw-bold text-lg text-uppercase'>Fecha de envio: <span className='fw-light text-capitalize'>{item.fecha}</span></p>

                    <p className='fw-bold text-lg text-uppercase'>Mensaje: <span className='fw-light text-capitalize'>{item.mensaje}</span></p>

                    <div>
                        <a className='btn btn-danger'
                        onClick={e=> handleClick(e, item.id)}
                        >Eliminar</a>
                    </div>
                </div>
            </div>
            
            
            : 
            
            
                ''
            
            
            }

            
    
        </>
  
  

))}
    
    
    
    </>
  )
}

export default VerMensaje