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
  const [rolAdministrador, setRolAdministrador] = useState('');

  const datos = [];

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


  useEffect(() => {
    const verificar = async () => {
      const result = await userDB.solicitudes
      const array = Object.values({...result})
      
      array.forEach(item => {
        if(item.userId == user.uid){
          if(item.estado.length > 1){
            datos.push(item)
            setContadorNotificaciones(datos.length);
            setNotificacionesUsuario(datos)
          }
        }
      })
    }
    verificar()
  }, [userDB])


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

  }, [user, userDB])
  


  return (
    <AuthContext.Provider value={{user, userDB, saveCotizacion, saveProspectos, postsIMG, success, setUser, setUserData, setSaveCotizacion, setUserPostsIMG, setSaveProspectos, setUserSuccess, notificacionesUsuario, contadorNotificaciones, rolAdministrador, setRolAdministrador}} >
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