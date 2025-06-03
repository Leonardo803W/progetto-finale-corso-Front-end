import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import imageC1 from '../img/continenti/Nord America.webp';
import imageC2 from '../img/continenti/Sud America.webp';
import imageC3 from '../img/continenti/Europa.jpg';
import imageC4 from '../img/continenti/Africa.jpg';
import imageC5 from '../img/continenti/Asia.webp';
import imageC6 from '../img/continenti/Oceania.jpg';
import imageC7 from '../img/continenti/Antartide.jpeg';

//image C immagini per i continenti

const HomeContinents = () => {

    //creo un array per poter cambiare eventuali valori e per avere tutto in un unico luogo

    const arrayCont = [
        {
            title: "Nord America",
            image: imageC1,
            descriptions: "Visita le vaste foreste, le meraviglie naturali e le grandi città del Nord America, un continente ricco di diversità e avventure."
        },
        {
            title: "Sud America",
            image: imageC2,
            descriptions: "Esplora le foreste pluviali, le rovine antiche e le spiagge mozzafiato del Sud America, un luogo di colori e cultura vibrante."
        },
        {
            title: "Europa",
            image: imageC3,
            descriptions: "Scopri i siti storici, le città d'arte e i paesaggi incantevoli dell'Europa, culla di cultura e tradizioni millenarie."
        },
        {
            title: "Africa",
            image: imageC4,
            descriptions: "Vivi l'emozione dei safari, le meraviglie naturali e le civiltà antiche che rendono l'Africa un continente unico al mondo."
        },
        {
            title: "Asia",
            image: imageC5,
            descriptions: "Immergiti nelle antiche tradizioni, nei paesaggi spettacolari e nelle metropoli moderne dell'Asia, il continente più popoloso e vario."
        },
        {
            title: "Oceania",
            image: imageC6,
            descriptions: "Esplora le isole tropicali, le barriere coralline e le culture indigene dell'Oceania, un paradiso di biodiversità."
        },
        {
            title: "Antartide",
            image: imageC7,
            descriptions: "Vivi l'esperienza di un territorio estremo, ricco di ghiacci eterni e fauna unica, il continente più remoto e selvaggio del mondo."
        }
    ]

    return (
        <>
            <section className = 'bigSection'>

                <div className = "card-container">

                    {arrayCont.map((country, index) => (

                        <div className='card-wrapper' key={index}>
                            <Card className = 'h-100'>
                                <Card.Img variant="top" src = {country.image} alt = 'immagine copertina' className = 'w-100 h-50'/>
                                <Card.Body>
                                    <h4>{country.title}</h4>
                                    <p>{country.descriptions}</p>
                                    <Link to = '/list'>
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

export default HomeContinents;
