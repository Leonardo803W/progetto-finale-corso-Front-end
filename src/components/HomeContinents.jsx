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
            descriptions: "Visita il Nord America per vedere i mille colori delle foreste..."
        },
        {
            title: "Sud America",
            image: imageC2,
            descriptions: "Visita il Nord America per vedere i mille colori delle foreste..."
        },
        {
            title: "Europa",
            image: imageC3,
            descriptions: "Visita il Nord America per vedere i mille colori delle foreste..."
        },
        {
            title: "Africa",
            image: imageC4,
            descriptions: "Visita il Nord America per vedere i mille colori delle foreste..."
        },
        {
            title: "Asia",
            image: imageC5,
            descriptions: "Visita il Nord America per vedere i mille colori delle foreste..."
        },
        {
            title: "Oceania",
            image: imageC6,
            descriptions: "Visita il Nord America per vedere i mille colori delle foreste..."
        },
        {
            title: "Antartide",
            image: imageC7,
            descriptions: "Visita il Nord America per vedere i mille colori delle foreste..."
        }
    ]

    return (
        <>
            {/* Card continets */}
            <section className='bigSection'>
                <div className="card-container">
                    {arrayCont.map((country, index) => (
                        <div className='card-wrapper' key={index}>
                            <Card className = 'w-100 h-100'>
                                <Card.Img variant="top" src = {country.image} alt = 'immagine copertina' className = 'w-100 h-50'/>
                                <Card.Body>
                                    <h4>{country.title}</h4>
                                    <p>
                                        {country.descriptions}
                                    </p>
                                    <Link to={{
                                        pathname: '/list',
                                        state: { title: country.title }
                                    }}>
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
