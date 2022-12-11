import React from "react";
import Card from "./CardDashboardCreditoAnalisis";
import image1 from "../assets/pendientes.png";
import image2 from '../assets/aprobadas.png'
import image3 from '../assets/rechazadas.png'


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
    title: "Aprobadas",
    image: image2,
    link: "/Aprobadas",
    text: "Descripcion pendiente",
    buttontext: "Aprobadas"
  },
  {
    id: 3,
    title: "Rechazadas",
    image: image3,
    link: "/Rechazadas",
    text: "Descripcion pendiente",
    buttontext: "Rechazadas"
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
