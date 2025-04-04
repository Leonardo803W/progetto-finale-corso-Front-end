import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import imageM1 from '../img/moderne-meraviglie/Petra, Giordania.jpg';
import imageM2 from "../img/moderne-meraviglie/Grande Muraglia Cinese.jpg";
import imageM3 from "../img/moderne-meraviglie/colosseo.jpg";
import imageM4 from "../img/moderne-meraviglie/Machu Picchu.jpg";
import imageM5 from "../img/moderne-meraviglie/Cristo Redentore.jpg";
import imageM6 from "../img/moderne-meraviglie/Chichén Itzá.jpg";
import imageM7 from "../img/moderne-meraviglie/Taj Mahal.jpg";

//image M per immagini delle moderne meraviglie

const HomeModerneMeraviglieMondo = () => {

    //creo un array per poter cambiare eventuali valori e per avere tutto in un unico luogo

    const arrayModern = [
        {
            title: "Petra",
            image: imageM1,
            description: "Visita Petra un sito archeologico della Giordania, posto a circa 250 km a sud della capitale Amman, costruito 2000 anni fa, una struttura scavata nella roccia, situata a metà strada tra il Golfo di Aqaba e il Mar Morto, a un'altitudine tra 800 e 1396 metri!"
        },
        {
            title: "Grande Muraglia Cinese",
            image: imageM2,
            description: "Visita la Grande Muraglia, una struttura mastodontica in cui nonostante i secoli trascorsi ancora oggi possibile percorrerla quasi del tutto, costruita a partire dal 214 a.C. e lunga 8 851 km una impresa titanica a visitarla tutta!"
        },
        {
            title: "Colosseo",
            image: imageM3,
            description: "Visita il Colosseo durate nei secoli e fonte di ispirazioni per grandissimi film storici, L'anfiteatro fu edificato in epoca flavia, La sua costruzione, iniziata nel 70 d.C. e fu conclusa nell'80 d.C.!"
        },
        {
            title: "Machu Picchu",
            image: imageM4,
            description: "Visita Machu Picchu costruita nell'anno 1440, nella valle dell'Urubamba, a circa 2 430 m, ancora adesso una città ricoperta da misteri!"
        },
        {
            title: "Cristo Redentore",
            image: imageM5,
            description: "Visita il Cristo Redentore la statua, fatta di calcestruzzo e pietra saponaria e costruita fra il 1922 e il 1931, un luogo molto religioso!"
        },
        {
            title: "Chichén Itzá",
            image: imageM6,
            description: "Visita Chichén Itzá Le rovine si estendono su un'area di 3 km², appartenevano ad una grande città che fu uno dei più importanti centri della regione intorno al periodo epiclassico della civiltà Maya, fra il VI e l'XI secolo!"
        },
        {
            title: "Taj Mahal",
            image: imageM7,
            description: "Visita Taj Mahal costruito nel 1632 dall'imperatore moghul Shāh Jahān in memoria dell'amatissima moglie Arjumand Banu Begum, un esempio di cosa l'amore può costruire!"
        }
    ];

    return (
        <>
            {/* Card */}
            <section className='bigSection'>
                <div className="card-container">
                    {arrayModern.map((modernWonder, index) => (
                        <div className='card-wrapper' key={index}>
                            <Card className='w-100 h-100'>
                                <Card.Img variant="top" src={modernWonder.image} alt='immagine copertina' className='w-100 h-50'/>
                                <Card.Body>
                                    <h4>{modernWonder.title}</h4>
                                    <p>{modernWonder.description}</p>
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

export default HomeModerneMeraviglieMondo;