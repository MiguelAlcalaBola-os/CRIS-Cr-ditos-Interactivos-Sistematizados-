import React from "react";
import Card from "./Card";
import image1 from "../assets/image1.png";
import image2 from '../assets/image2.png'
import image3 from '../assets/image3.png'
import image4 from '../assets/image4.png'

const cards = [
  {
    id: 1,
    title: "Solicitar crédito",
    image: image1,
    link: "/Solicitud",
    text: "Crea una nueva solicitud de manera interactiva con pre-aprobación bancaria ",
    buttontext: "Solicitar Credito"
  },
  {
    id: 2,
    title: "Cotizaciones automáticas",
    image: image2,
    link: "/Cotizar",
    text: "Crea una cotización para que pueda ser revisada en tiempo real desde tu cuenta",
    buttontext: "Cotizar"
  },
  {
    id: 3,
    title: "Ver viviendas o locales",
    image: image3,
    link: "/Datos",
    text: "Adquiere una vivienda residencial, vacacional o de inversión, o bien publica tu vivienda",
    buttontext: "Ver viviendas o locales"
  },
  {
    id: 4,
    title: "Registrar prospectos",
    image: image4,
    link: "/users/new",
    text: "¿Eres bróker? ¿Deseas llevar un control de tu cartera de clientes con unos simples pasos?",
    buttontext: "Registrar prospectos"
  },
];

function Cards() {
  return (
    <div className="container d-flex justify-content-center align-items-center h-100">
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
