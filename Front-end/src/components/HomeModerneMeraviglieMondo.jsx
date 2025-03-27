import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import imageM1 from '../img/moderne-meraviglie/Petra, Giordania.jpg';
import imageM2 from "../img/moderne-meraviglie/Grande Muraglia Cinese.jpg";
import imageM3 from "../img/moderne-meraviglie/colosseo.jpg";
import imageM4 from "../img/moderne-meraviglie/Machu Picchu.jpg";
import imageM5 from "../img/moderne-meraviglie/Cristo Redentore.jpg";
import imageM6 from "../img/moderne-meraviglie/Chichén Itzá.jpg";
import imageM7 from "../img/moderne-meraviglie/Taj Mahal.jpg";

// imageM la M serve per indicare le immagine delle meraviglie moderne

const HomeModerneMeraviglieMondo = () => {

    //arrayModern per avere i titoli in un unico posto, sia in caso di cambiamento dei titoli o di toglierne qualcuno

    const arrayModern = [ "Petra","Grande Muraglia Cinese", "Colosseo", "Machu Picchu", "Cristo Redentore", "Chichén Itzá", "Taj Mahal" ]

    return (
        <>
            <h3>
                Quale meraviglia del mondo moderno ti piacerebbe visitare?
            </h3>

            <section className='bigSection'>
                <div className='article'>
                    <Card.Img variant="top" src={imageM1} />
                    <Card.Body>
                        <h4>
                            {arrayModern[0]}
                        </h4>
                        <p>
                            Visita Petra un sito archeologico della Giordania, posto a circa 250 km a sud della capitale Amman, costruito 2000 anni fa,
                            una struttra scavata nella roccia, situata a metà strada tra il Golfo di Aqaba e il Mar Morto, a un'altitudine tra 800 e 1396 metri!
                        </p>
                        <Link to="/list">
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>

                <div className='article'>
                    <Card.Img variant="top" src={imageM2} />
                    <Card.Body>
                        <h4>
                            {arrayModern[1]}
                        </h4>
                        <p>
                            Visita la Grande Muraglia, una struttura mastodontica in cui nonostante i secoli trascorsi ancora oggi possibile percorrerla quasi del tutto,
                            costruita a partire dal 214 a.C. e lunga 8 851 km una impresa titanica a visitarla tutta!
                        </p>
                        <Link to="/list">
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>

                <div className='article'>
                    <Card.Img variant="top" src={imageM3} />
                    <Card.Body>
                        <h4>
                            {arrayModern[2]}
                        </h4>
                        <p>
                            Visita il Colosseo durate nei secoli e fonte di ispirazioni per grandissimi film storici,
                            L'anfiteatro fu edificato in epoca flavia, La sua costruzione, iniziata nel 70 d.C. e fu conclusa nell'80 d.C.!
                        </p>
                        <Link to="/list">
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>

                <div className='article'>
                    <Card.Img variant="top" src={imageM4} />
                    <Card.Body>
                        <h4>
                            {arrayModern[3]}
                        </h4>
                        <p>
                            Visita Machu Picchu costruita nell'anno 1440, nella valle dell'Urubamba, a circa 2 430 m, ancora adesso una citta ricoperta da misteri!
                        </p>
                        <Link to="/list">
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>

                <div className='article'>
                    <Card.Img variant="top" src={imageM5} />
                    <Card.Body>
                        <h4>
                            {arrayModern[4]}
                        </h4>
                        <p>
                            Vistia il Cristo Redentore la statua, fatta di calcestruzzo e pietra saponaria e costruita fra il 1922 e il 1931, un luogo molto religioso!
                        </p>
                        <Link to="/list">
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>

                <div className='article'>
                    <Card.Img variant="top" src={imageM6} />
                    <Card.Body>
                        <h4>
                            {arrayModern[5]}
                        </h4>
                        <p>
                            Visita Chichén Itzá Le rovine si estendono su un'area di 3 km², appartenevano ad una grande città che fu uno dei più importanti centri della regione intorno al periodo epiclassico della civiltà Maya, fra il VI e l'XI secolo!
                        </p>
                        <Link to="/list">
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>

                <div className='article'>
                    <Card.Img variant="top" src={imageM7} />
                    <Card.Body>
                        <h4>
                            {arrayModern[6]}
                        </h4>
                        <p>
                            Visita Taj Mahal costruito nel 1632 dall'imperatore moghul Shāh Jahān in memoria dell'amatissima moglie Arjumand Banu Begum, un esempio di cosa l'amore può costruire!
                        </p>
                        <Link to="/list">
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>
            </section>
        </>
    );
}

export default HomeModerneMeraviglieMondo;
