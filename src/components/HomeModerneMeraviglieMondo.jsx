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
            description: "Antica città scavata nella roccia in Giordania, famosa per le sue strutture scolpite nella pietra, simbolo di ingegneria e arte antica."
        },
        {
            title: "Grande Muraglia Cinese",
            image: imageM2,
            description: "Una delle meraviglie più impressionanti del mondo, questa lunga muraglia difensiva attraversa le montagne e le pianure della Cina."
        },
        {
            title: "Colosseo",
            image: imageM3,
            description: "Il simbolo dell'antica Roma, un anfiteatro grandioso dove si svolgevano combattimenti e spettacoli pubblici."
        },
        {
            title: "Machu Picchu",
            image: imageM4,
            description: "La misteriosa città inca sulle Ande peruviane, un esempio di ingegneria e spiritualità, avvolta da un'aura di mistero."
        },
        {
            title: "Cristo Redentore",
            image: imageM5,
            description: "La statua iconica di Rio de Janeiro, simbolo di pace e accoglienza, che domina la città con le sue braccia aperte."
        },
        {
            title: "Chichén Itzá",
            image: imageM6,
            description: "Uno dei siti più importanti della civiltà Maya, con le sue piramidi e templi che raccontano storie di antiche civiltà."
        },
        {
            title: "Taj Mahal",
            image: imageM7,
            description: "Il mausoleo di marmo bianco in India, simbolo eterno di amore e bellezza, costruito dall'imperatore Shah Jahan."
        }
    ];

    return (
        <>
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