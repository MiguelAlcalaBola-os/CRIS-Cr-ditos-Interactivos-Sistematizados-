import React from "react";
import Card from "./CardDashboardPipeline";
import image1 from "../assets/aprobadas.png";
import image2 from '../assets/ENTREGAS_FUTURAS.png'
import image3 from '../assets/SOLICITUDES_ASIGNADAS.png'


const cards = [
  {
    id: 1,
    title: "Entregas Inmediatas",
    image: image1,
    link: "/EntregasInmediatas",
    text: "Revisa las solicitudes que aún están pendientes",
    buttontext: "Pendientes"
  },
  {
    id: 2,
    title: "Entregas Futuras",
    image: image2,
    link: "/EntregasFuturas",
    text: "Descripcion pendiente",
    buttontext: "Renovaciones"
  },
  {
    id: 3,
    title: "Solicitudes Asignadas",
    image: image3,
    link: "/Rechazadas",
    text: "Descripcion pendiente",
    buttontext: "Completadas"
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
