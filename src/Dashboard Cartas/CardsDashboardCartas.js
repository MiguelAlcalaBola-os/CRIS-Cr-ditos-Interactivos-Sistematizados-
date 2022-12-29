import React from "react";
import Card from "./CardDashboardCartas";
import image1 from "../assets/aprobadas.png";
import image2 from '../assets/RENOVACIONES.png'
import image3 from '../assets/COMPLETADAS.png'


const cards = [
  {
    id: 1,
    title: "Aprobaciones",
    image: image1,
    link: "/Pendientes",
    text: "Revisa las solicitudes que aún están pendientes",
    buttontext: "Pendientes"
  },
  {
    id: 2,
    title: "Renovaciones",
    image: image2,
    link: "/Aprobadas",
    text: "Descripcion pendiente",
    buttontext: "Renovaciones"
  },
  {
    id: 3,
    title: "Completadas",
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
