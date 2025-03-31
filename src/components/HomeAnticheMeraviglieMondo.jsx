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
            description: "Visita il Tempio di Artemide, un periptero con cella in pietra, costruito nella seconda metà dell'VIII secolo a.C. o nel secondo quarto del VII secolo a.C.!"
        },
        {
            title: "Piramide di Cheope",
            image: imageA3,
            description: "Visita la Piramide di Cheope, secondo gli egittologi, è stata realizzata nel XXVI secolo a.C., una immensa tomba e ancora oggi non si sa tutto sia della sua storia sia della struttura interna!"
        },
        {
            title: "Mausoleo di Alicarnasso",
            image: imageA5,
            description: "Visita il Mausoleo di Alicarnasso, è la monumentale tomba che Artemisia fece costruire per il marito, tra il 353 a.C. e il 350 a.C., in origine una struttura alta più di 15 metri, ma per via di terremoti nei secoli venne abbattuto, ma il sito è visitabile!"
        }
    ];

    return (
        <>
            {/* Card */}
            <section className='bigSection'>
                <div className="card-container">
                    {arrayOld.map((oldWonder, index) => (
                        <div className='card-wrapper' key={index}>
                            <Card className='w-100 h-100'>
                                <Card.Img variant="top" src={oldWonder.image} alt='immagine copertina' className='w-100 h-50'/>
                                <Card.Body>
                                    <h4>{oldWonder.title}</h4>
                                    <p>{oldWonder.description}</p>
                                    <Link to="/list">
                                        <Button variant="primary">Prenota e vola!</Button>
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