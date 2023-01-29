import React, { useContext, useEffect, useState } from "react";
import { userColumns } from "../datatablesource";
import { onAuth } from "../firebase";


const AuthContext = React.createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState("loading");
  const [loading, setLoading] = useState(true);
  const [userDB, setUserDB] = useState(null);
  const [saveCotizacion, setSaveCotizacion] = useState(true);
  const [saveProspectos, setSaveProspectos] = useState(true);
  const [postsIMG, setPostIMG] = useState(true);
  const [success, setSuccess] = useState(null);
  const [notificacionesUsuario, setNotificacionesUsuario] = useState([]);
  const [contadorNotificaciones, setContadorNotificaciones] = useState(null);
  const [notificacionesOficial, setNotificacionesOficial] = useState([]);
  const [contadorNotificacionesOficial, setContadorNotificacionesOficial] = useState(null);
  const [notificacionesCV, setNotificacionesCv] = useState([]);
  const [contadorNotificacionesCV, setContadorNotificacionesCv] = useState(null);
  const [notificacionesCA, setNotificacionesCa] = useState([]);
  const [contadorNotificacionesCA, setContadorNotificacionesCa] = useState(null);
  const [notificacionesCartas, setNotificacionesCartas] = useState([]);
  const [contadorNotificacionesCartas, setContadorNotificacionesCartas] = useState(null);
  const [notificacionesPipeline, setNotificacionesPipeline] = useState([]);
  const [contadorNotificacionesPipeline, setContadorNotificacionesPipeline] = useState(null);
  const [notificacionesTramite, setNotificacionesTramite] = useState([]);
  const [contadorNotificacionesTramite, setContadorNotificacionesTramite] = useState(null);
  const [notificacionesDesembolso, setNotificacionesDesembolso] = useState([]);
  const [contadorNotificacionesDesembolso, setContadorNotificacionesDesembolso] = useState(null);
  const [mensajesSalientes, setMensajesSalientes] = useState([])
  const [mensajesEntrantes, setMensajesEntrantes] = useState([])
  const [tipoMensaje, setTipoMensaje] = useState([])
  const [rolAdministrador, setRolAdministrador] = useState('');
  const [solicitudes, setSolicitudes] = useState([]);
  
  const [contadorMensajes, setContadorMensajes] = useState(0);
  const [mensajes, setMensajes] = useState([]);
  
  const datosNotificacionesUsuario = [];
  const datosOficiales = [];
  const datosCreditoVerificacion = [];
  const datosCreditoAnalisis = [];
  const datosCartas = [];
  const datosPipeline = [];
  const datosTramite = [];
  const datosDesembolso = [];
  const datosMensajesSalientes = [];
  const datosMensajesEntrantes = [];
  const cantidadMensajes = [];

const setUserData = (data) => {
  setUserDB(data)
}
function setUserSuccess (mode) {
  setSuccess(mode)
  setTimeout(()=>{ setSuccess(null)}, 6000)
}
function setUserPostsIMG (data) {
  setPostIMG(data)
}

  useEffect(() => {
    setLoading(false)
    return onAuth(setUser, setUserData, postsIMG, setUserPostsIMG);
  },[user])


  // UseEffect para las notificaciones e informacion de las solicitudes al perfil del cliente
  useEffect(() => {
    const verificar = async () => {
      const result = await userDB.solicitudes
      const array = Object.values({...result})
      
      array.forEach(item => {
        if(item.userId == user.uid){
          if(item.estado.length > 1){
            datosNotificacionesUsuario.push(item)
            setContadorNotificaciones(datosNotificacionesUsuario.length);
            setNotificacionesUsuario(datosNotificacionesUsuario)
          }
        }
      })
    }
    verificar()
  }, [userDB])
  

  // UseEffect para las notificaciones e informacion de las solicitudes al perfil de administracion
  useEffect(() => {
    const verificar = async () => {
      const result = await userDB.solicitudes;
      const array = Object.values({...result});
      array.forEach(item => {
        if(item.estado === undefined){
          datosOficiales.push(item);
          setContadorNotificacionesOficial(datosOficiales.length);
          setNotificacionesOficial(datosOficiales);
        }
        if(item.estado === 'Enviado'){
          if(item.estado.length > 1){
            datosCreditoVerificacion.push(item);
            setContadorNotificacionesCv(datosCreditoVerificacion.length);
            setNotificacionesCv(datosCreditoVerificacion);
          }
        }
        if(item.estado === 'EnviadoCV'){
          datosCreditoAnalisis.push(item);
          setContadorNotificacionesCa(datosCreditoAnalisis.length);
          setNotificacionesCa(datosCreditoAnalisis);
        }
        if(item.estado === 'EnviadoCA'){
          datosCartas.push(item);
          setContadorNotificacionesCartas(datosCartas.length);
          setNotificacionesCartas(datosCartas);
        }
        if(item.estado === 'EnviadoC'){
          datosPipeline.push(item);
          setContadorNotificacionesPipeline(datosPipeline.length);
          setNotificacionesPipeline(datosPipeline);
        }
        if(item.estado === 'Tramites'){
          datosTramite.push(item);
          setContadorNotificacionesTramite(datosTramite.length);
          setNotificacionesTramite(datosTramite);
        }
        if(item.estado === 'EnviadoT'){
          datosDesembolso.push(item);
          setContadorNotificacionesDesembolso(datosDesembolso.length);
          setNotificacionesDesembolso(datosDesembolso);
        }
      })
    }
    verificar()
  }, [userDB])
  



  // UseEffect para verificar que tipo de administrador se encuentra en sesion y asi enviarlo a los mensajes de notificaciones
  useEffect(() => {
    const infoAdmin = async () => {
      const result = await userDB.users;
      const array = Object.keys({...result});
      array.forEach((id, index) => {
        const userId = id;
        if(userId === user.uid){
          try {
            const perfilOficial = Object.values({...result});
            if(perfilOficial[index].rol !== 'cliente'){
              setRolAdministrador(perfilOficial[index].rol);
            }
          } catch (error) {
            console.log(error)
          }
        }
      })

    }

    infoAdmin();

  }, [userDB])


  // useEffect para la obtencion de mensajes en la bandeja de salida
  useEffect(() => {
    const obtenerMensajes = async() => {
      const result = await userDB.mensajes;
      const array = Object.values({...result});
      array.forEach(item => {
        if(item.de === user.email){
          datosMensajesSalientes.push(item);
          setMensajesSalientes(datosMensajesSalientes);
        }
        if(item.de !== user.email){
          datosMensajesEntrantes.push(item);
          setMensajesEntrantes(datosMensajesEntrantes);
        }
        
        
      })
    }

    obtenerMensajes();
  }, [userDB]);


  // useeffect obtencion de cantidad de mensajes entrantes
  useEffect(() => {
    const obtenerCantidadDeMensajes = async () => {
      const array = await mensajesEntrantes;
      if(rolAdministrador === ''){
        array.forEach(item => {
          console.log(item)
          if(item.solicitud === user.email){
            cantidadMensajes.push(item);
            setContadorMensajes(cantidadMensajes.length);
            setMensajes(cantidadMensajes);
          }
        })
      }
      if(rolAdministrador === 'oficial'){
        array.forEach(item => {
          if(item.rolAdministrador === ''){
            console.log(item)
            cantidadMensajes.push(item);
            setContadorMensajes(cantidadMensajes.length);
            setMensajes(cantidadMensajes);
          }
        })
      }
      if(rolAdministrador !== '' || rolAdministrador !== 'oficial'){
        array.forEach(item => {
          if(item.solicitud === rolAdministrador){
            cantidadMensajes.push(item);
            setContadorMensajes(cantidadMensajes.length);
            setMensajes(cantidadMensajes);
          }
        })
      }
    }
    obtenerCantidadDeMensajes();
    
  }, [mensajesEntrantes])





  return (
    <AuthContext.Provider value={{user, userDB, saveCotizacion, saveProspectos, postsIMG, success, setUser, setUserData, setSaveCotizacion, setUserPostsIMG, setSaveProspectos, setUserSuccess, notificacionesUsuario, contadorNotificaciones, rolAdministrador, setRolAdministrador, notificacionesCV, contadorNotificacionesCV, notificacionesCA, contadorNotificacionesCA, notificacionesCartas, contadorNotificacionesCartas, mensajesSalientes, setMensajesSalientes, mensajesEntrantes, setMensajesEntrantes, tipoMensaje, setTipoMensaje, solicitudes, notificacionesPipeline, contadorNotificacionesPipeline, contadorMensajes, notificacionesOficial, contadorNotificacionesOficial, notificacionesTramite, contadorNotificacionesTramite, notificacionesDesembolso, contadorNotificacionesDesembolso, mensajes}} >
      {!loading && children}
    </AuthContext.Provider>
  )
}



export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('error')
  }
  return context
}