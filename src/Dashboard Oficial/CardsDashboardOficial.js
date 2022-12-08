import React from "react";
import Card from "./CardDashboardOficial";
import image1 from "../assets/pendientes.png";
import image2 from '../assets/cartas.png'
import image3 from '../assets/tramitacion.png'
import image4 from "../assets/credito.png";
import image5 from '../assets/aprobadas.png'
import image6 from '../assets/rechazadas.png'


const cards = [
  {
    id: 1,
    title: "Pendientes",
    image: image1,
    link: "/Pendientes",
    text: "Revisa las solicitudes que aún están pendientes",
    buttontext: "Pendientes"
  },
  {
    id: 2,
    title: "Cartas",
    image: image2,
    link: "/Cotizar",
    text: "Descripcion pendiente",
    buttontext: "Cartas"
  },
  {
    id: 3,
    title: "Tramitacion",
    image: image3,
    link: "/Datos",
    text: "Descripcion pendiente",
    buttontext: "Tramitacion"
  },
  {
    id: 4,
    title: "Credito",
    image: image4,
    link: "/users/new",
    text: "Descripcion pendiente",
    buttontext: "Credito"
  },
  {
    id: 5,
    title: "Aprobadas",
    image: image5,
    link: "/Aprobadas",
    text: "Descripcion pendiente",
    buttontext: "Aprobadas"
  },
  {
    id: 6,
    title: "Rechazadas",
    image: image6,
    link: "/Rechazadas",
    text: "Descripcion pendiente",
    buttontext: "Rechazadas"
  },
];

function Cards() {
  return (
    <div className="container d-flex justify-content-center align-items-center h-100 w-100">
      <div className="row">
        {cards.map(({ title, image, url, id, text, link, buttontext }) => (
          <div className="col-3" key={id}>
            <Card imageSource={image} title={title} url={url} text={text} buttontext={buttontext}
            link={link}/>
          </div>
          
        ))}
        
      </div>

    </div>
  );
}

export default Cards;
