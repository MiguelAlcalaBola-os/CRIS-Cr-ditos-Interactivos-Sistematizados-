import { useAuth } from "../../context/AuthContext.js";


const Notificaciones = () => {




    const { notificacionesTramite, contadorNotificacionesTramite } = useAuth();

    return (
        <>
            {contadorNotificacionesTramite === null ?
            
                <h2>No tienes Notificaciones Pendientes</h2>
            
            : 
            
            <table class="table">
            <thead>
                <tr>
                    <th scope="col">nro</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellidos</th>
                    <th scope="col">Cédula</th>
                    <th scope="col">Status</th>
                    <th scope="col">Observaciones</th>
                    <th scope="col">Área</th>
                    <th scope="col">Oficial Encargado</th>
                </tr>
            </thead>
            {notificacionesTramite.map((item, index) => (
                <>
                    <tbody>
                        <tr>
                        <th scope="row">{index + 1}</th>
                        <td>{item.Nombres}</td>
                        <td>{item.Apellidos}</td>
                        <td>{item.Cedula}</td>
                        <td>{item.estado}</td>
                        <td>{item.observaciones}</td>
                        <td>{item.rol}</td>
                        <td>{item.oficial}</td>
                        </tr>
                    </tbody>
                </>
            ))}
            </table>
            
        }
            

            

        </>
    )
}

export default Notificaciones;