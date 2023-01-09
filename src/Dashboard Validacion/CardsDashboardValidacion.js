import React from "react";
import Card from "./CardDashboardValidacion";
import image1 from "../assets/pendientes.png";
import image2 from '../assets/credito.png'
import image3 from '../assets/Credito Verificacion VERIFICADAS.png'
import image4 from '../assets/cartas.png'
import image5 from '../assets/rechazadas.png'


const cards = [
  {
    id: 1,
    title: "Aprobaciones",
    image: image1,
    link: "/PendientesV",
    text: "Revisa las solicitudes que aún están pendientes",
    buttontext: "Pendientes"
  },
  {
    id: 2,
    title: "Credito",
    image: image2,
    link: "/Aprobadas",
    text: "Descripcion pendiente",
    buttontext: "Renovaciones"
  },
  {
    id: 3,
    title: "Validadas",
    image: image3,
    link: "/Aprobadas",
    text: "Descripcion pendiente",
    buttontext: "Renovaciones"
  },
  {
    id: 4,
    title: "Cartas",
    image: image4,
    link: "/Aprobadas",
    text: "Descripcion pendiente",
    buttontext: "Renovaciones"
  },
  {
    id: 5,
    title: "Rechazadas",
    image: image5,
    link: "/Aprobadas",
    text: "Descripcion pendiente",
    buttontext: "Renovaciones"
  },

];

function Cards() {
  return (
    <div className="container d-flex justify-content-center align-items-center h-100 ">
      <div className="row">
        {cards.map(({ title, image, url, id, text, link, buttontext }) => (
          <div className="col-4" key={id}>
            <Card imageSource={image} title={title} url={url} text={text} buttontext={buttontext}
            link={link}/>
          </div>
          
        ))}
        
      </div>

    </div>
  );
}

export default Cards;
