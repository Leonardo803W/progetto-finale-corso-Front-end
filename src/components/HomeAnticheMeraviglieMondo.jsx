import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import imageA1 from '../img/antiche-meraviglie/Tempio di Artemide.jpg';
import imageA3 from '../img/antiche-meraviglie/Piramide di Cheope.jpg';
import imageA5 from '../img/antiche-meraviglie/Mausoleo di Alicarnasso.jpg';

//image A per immagini delle antiche meraviglie

const HomeAnticheMeraviglieMondo = () => {

    //creo un array per poter cambiare eventuali valori e per avere tutto in un unico luogo

    const arrayOld = [
        {
            title: "Tempio di Artemide",
            image: imageA1,
            description: "Un capolavoro dell'antichità, il Tempio di Artemide a Efeso rappresenta uno dei più grandi templi dedicati alla dea Artemide, simbolo di bellezza e devozione."
        },
        {
            title: "Piramide di Cheope",
            image: imageA3,
            description: "La più grande delle piramidi di Giza, simbolo dell'ingegneria e della ricchezza dell'antico Egitto, un mistero ancora affascinante ai giorni nostri."
        },
        {
            title: "Mausoleo di Alicarnasso",
            image: imageA5,
            description: "Un'imponente tomba monumentale dedicata a Mausolo, esempio di architettura funebre che ha ispirato il termine 'mausoleo' ancora oggi."
        }
    ];

    return (
        <>
            <section className = 'bigSection'>

                <div className = "card-container">
                    {arrayOld.map((oldWonder, index) => (

                        <div className = 'card-wrapper' key={index}>
                            <Card className = 'h-100'>
                                <Card.Img variant="top" src={oldWonder.image} alt='immagine copertina' className='w-100 h-50'/>
                                <Card.Body>
                                    <h4>{oldWonder.title}</h4>
                                    <p>{oldWonder.description}</p>
                                    <Link to="/list">
                                        <button className = 'buttonD'>Prenota e vola!</button>
                                    </Link>
                                </Card.Body>
                            </Card>
                        </div>
                    ))}
                </div>

            </section>
        </>
    );
};

export default HomeAnticheMeraviglieMondo;