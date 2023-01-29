import { useState } from 'react'
import { Link } from 'react-router-dom';
import { writeUserData, removeData } from "../../firebase";
import { useAuth } from '../../context/AuthContext';

const EnviarMensaje = () => {

    

    const id = Date.now();

    const { user, notificacionesUsuario, rolAdministrador, mensajes, solicitudes } = useAuth()

    const [asunto, setAsunto] = useState('');
    const [solicitud, setSolicitud] = useState('');
    const [referencia, setReferencia] = useState('');
    const [mensaje, setMensaje] = useState('');

    const handlerSubmit = (e) => {
        e.preventDefault();

        if([asunto, solicitud, mensaje].includes('')){
            console.log('todos los campos deben estar llenos')
            return;
        }
        try{
            writeUserData("/mensajes/", id, {de: user.email, fecha: Date(), asunto, solicitud, referencia, mensaje, id, rolAdministrador});
        }catch(error){
            console.log(error)
        }
    }

  return (
    <>
        
        <h1>Envia tu Mensaje</h1>
        
        <div className='container d-flex justify-content-center w-50 mt-10'>
            <form className='col d-flex flex-column gap-4 border border-dark border-opacity-25 rounded shadow-lg p-5'
            onSubmit={handlerSubmit}
            >
                <div className="mb-3 text-start">
                    <label for="asunto" className="form-label fw-bold">Asunto</label>
                    <input type="text" className="form-control" id="asunto" placeholder="Asunto"
                    onChange={(e) => setAsunto(e.target.value)}
                    />
                </div>
                <div className="mb-3 text-start">
                    <label for="solicitud" className="form-label fw-bold">{rolAdministrador === '' ? 'selecciona tu Solicitud:' : <>{rolAdministrador === 'oficial' ? 'selecciona la Solicitud:' : 'area de destino'}</>}</label>
                    {rolAdministrador === '' ?  
                    <>
                    {notificacionesUsuario.map((item, index) => (
                        <select className="form-select" id='solicitud' aria-label=".form-select-sm example"
                        onChange={(e) => setSolicitud(e.target.value)}
                        >
                            <option selected>Solicitud</option>
                            <option value={item.Cedula}>Solicitante: {item.Cedula}, fecha: {item.fecha}</option>
                        </select>
                    ))}
                    </>
                    : 
                    <>
                    {rolAdministrador === 'oficial' ?

                    <>
                        {mensajes.map((item, index) => (
                            
                            <select className="form-select" id='solicitud' aria-label=".form-select-sm example"
                            onChange={(e) => setSolicitud(e.target.value)}
                            >
                                <option selected>Solicitud</option>
                                <option value={item.de}>Solicitante: {item.de}, solicitud: {item.id}</option>
                            </select>
                        ))} 
                    </>
                    : 
                    
                    
                    <>
                        

                        <select className="form-select" id='solicitud' aria-label=".form-select-sm example"
                        onChange={(e) => setSolicitud(e.target.value)}
                        >
                            <option selected>Area destinada</option>
                            <option value='creditoAnalisis'>credito Analisis</option>
                            <option value='pipeline'>pipeline</option>
                            <option value='cartas'>cartas</option>
                            <option value='oficial'>oficial</option>
                            <option value='validacion'>validacion</option>
                            <option value='creditosDeVerificacion'>creditos De Verificacion</option>
                            <option value='tramite'>tramite</option>
                            <option value='desembolso'>desembolso</option>
                        </select>

                        {solicitudes.map((item, index) => (
                            <>
                                <label for="solicitud" className="form-label fw-bold">solicitud:</label>
                                <select className="form-select" id='solicitud' aria-label=".form-select-sm example"
                                onChange={(e) => setReferencia(e.target.value)}
                                >
                                    <option selected>Solicitud</option>
                                    <option value={item.Cedula}>Cliente: {item.Cedula}</option>
                                </select>
                            </>
                        ))}
                        
                        
                    </>
                    
                    
                    }
                    
                    </>
                    }
                    
                    
                </div>
                <div className="mb-3 text-start">
                    <label for="mensaje" className="form-label fw-bold">Mensaje</label>
                    <textarea className="form-control" id="mensaje" rows="3" placeholder='escribe aquí tu mensaje' onChange={(e) => setMensaje(e.target.value)}></textarea>
                </div>
                <button className='btn btn-primary'>Enviar</button>
            </form>
        </div>
        
    
    </>
  )
}

export default EnviarMensaje;