import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import image1 from '../img/Petra, Giordania.jpg';
import image2 from "../img/Grande Muraglia Cinese.jpg";
import image3 from "../img/colosseo.jpg";
import image4 from "../img/Machu Picchu.jpg";
import image5 from "../img/Cristo Redentore.jpg";
import image6 from "../img/Chichén Itzá.jpg";
import image7 from "../img/Taj Mahal.jpg";

const HomeModerneMeraviglieMondo = () => {
    return (
        <>
            <h3>
                Quale meraviglia del mondo moderno ti piacerebbe visitare?
            </h3>

            <section className='bigSection'>
                <div className='article'>
                    <Card.Img variant="top" src={image1} />
                    <Card.Body>
                        <h4>Petra</h4>
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
                    <Card.Img variant="top" src={image2} />
                    <Card.Body>
                        <h4>Grande Muraglia Cinese</h4>
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
                    <Card.Img variant="top" src={image3} />
                    <Card.Body>
                        <h4>Colosseo</h4>
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
                    <Card.Img variant="top" src={image4} />
                    <Card.Body>
                        <h4>Machu Picchu</h4>
                        <p>
                            Visita Machu Picchu costruita nell'anno 1440, nella valle dell'Urubamba, a circa 2 430 m, ancora adesso una citta ricoperta da misteri!
                        </p>
                        <Link to="/list">
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>

                <div className='article'>
                    <Card.Img variant="top" src={image5} />
                    <Card.Body>
                        <h4>Cristo Redentore</h4>
                        <p>
                            Vistia il Cristo Redentore la statua, fatta di calcestruzzo e pietra saponaria e costruita fra il 1922 e il 1931, un luogo molto religioso!
                        </p>
                        <Link to="/list">
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>

                <div className='article'>
                    <Card.Img variant="top" src={image6} />
                    <Card.Body>
                        <h4>Chichén Itzá</h4>
                        <p>
                            Visita Chichén Itzá Le rovine si estendono su un'area di 3 km², appartenevano ad una grande città che fu uno dei più importanti centri della regione intorno al periodo epiclassico della civiltà Maya, fra il VI e l'XI secolo!
                        </p>
                        <Link to="/list">
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>

                <div className='article'>
                    <Card.Img variant="top" src={image7} />
                    <Card.Body>
                        <h4>Taj Mahal</h4>
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