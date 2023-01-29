import React from 'react'
import { Outlet, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Mensajes = () => {

  const { rolAdministrador } = useAuth()

  return (
    <>
        <div className='text-center align-items-center'>
          <nav className='mx-auto row align-items-center nav-bar bg-dark mb-10'>
            <div className='col-md-6 p-5'>
              <h2 className='h2 text-center text-white'>{rolAdministrador === '' ? 'Bienvenido al area de Atención al cliente' : 'Area de Mensajeria'}</h2>
              <p className='text-center lead fw-semibold fs-6 text-white-50'>
                {rolAdministrador === '' ? 'Envianos un mensaje con tu requerimiento y seras atendido a la brevedad' : <>{rolAdministrador === 'oficial' ? 'Recepciona y Envia mensaje a los clientes' : 'Envia mensajes a las otras areas de responsabilidad para saber el status de las solicitudes'}</>}
                </p>
            </div>
            <ul className='col-md-6 p-5 d-flex flex-column flex-md-row gap-4'>
              <Link className='text-center text-secondary fw-bold text-decoration-none' to='/'>Home</Link>
              <Link className='text-center text-secondary fw-bold text-decoration-none' to=''>Enviar Mensaje</Link>
              <Link className='text-center text-secondary fw-bold text-decoration-none' to='entrantes'>Bandeja de Entrada</Link>
              <Link className='text-center text-secondary fw-bold text-decoration-none' to='salientes'>Bandeja de Salida</Link>
            </ul>
          </nav>
          <div className='p-5'>
            <Outlet></Outlet>
          </div>
        </div>
    
    </>
  )
}

export default Mensajes