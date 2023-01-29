import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext';
import { writeUserData, removeDataItem } from "../../firebase";

const Salientes = () => {

  const { user, mensajesSalientes, setUserData, setTipoMensaje } = useAuth();

  const navigate = useNavigate()


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

  const verMensaje = (e, id) => {
    e.preventDefault()
    setTipoMensaje(mensajesSalientes);
    navigate(`/mensajes/mensaje/${id}`)
  }

  return (
    <>
        
        <h1>Bandeja de Salida</h1>

        {mensajesSalientes.length === 0 ?

        <h2>No tienes mensajes enviados</h2> 
              
            : 
          
        <table className='container border border-dark border-opacity-25 shadow-lg p-3'>
              <thead>
                <tr>
                  <th scope="col">nro</th>
                  <th scope="col">de:</th>
                  <th scope="col">asunto:</th>
                  <th scope="col">fecha:</th>
                  <th scope="col">solicitud:</th>
                </tr>
              </thead>
          {mensajesSalientes.map((item, index) => (

          <>
            
              <tbody>
                <tr>
                    <td className='mb-5'>{index + 1}</td>
                    <td className='mb-5'>{item.de}</td>
                    <td className='mb-5'>{item.asunto}</td>
                    <td className='mb-5'>{item.fecha}</td>
                    <td className='mb-5'>{item.solicitud}</td>
                    <div className='d-flex gap-2 p-5'>
                      <a className='btn btn-success'
                        onClick={e=> verMensaje(e, item.id)}
                      >Leer</a>
                      <a className='btn btn-danger'
                        onClick={e=> handleClick(e, item.id)}
                      >Eliminar</a>
                    </div>
                </tr>
              </tbody>
          </>
            
            
          
        ))}
        </table>
      }
    </>
  )
}

export default Salientes