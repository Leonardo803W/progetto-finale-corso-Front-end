import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import imageC1 from '../img/continenti/Nord America.webp'
import imageC2 from '../img/continenti/Sud America.webp'
import imageC3 from '../img/continenti/Europa.jpg'
import imageC4 from '../img/continenti/Africa.jpg'
import imageC5 from '../img/continenti/Asia.webp'
import imageC6 from '../img/continenti/Oceania.jpg'
import imageC7 from '../img/continenti/Antartide.jpeg'

// imageC la C serve per indicare le immagini dei continenti

const HomeContinents = () => {

    //arrayCountry per avere i titoli in un unico posto, sia in caso di cambiamento dei titoli o di toglierne qualcuno

    const arrayCountry = ["Nord America", "Sud America", "Europa", "Africa", "Asia", "Oceania", "Antartide" ]

    return (
        <>
            <h3>
                In quale continente ti piacerebbe andare?
            </h3>

            <section className = 'bigSection'>

                <div className = 'article'>
                    <Card.Img variant = "top" src = {imageC1} />
                    <Card.Body>
                        <h4>{arrayCountry[0]}</h4>
                        <p>
                            Visita il Nord America per vedere i mille colori delle foreste, enormi canyon che hanno
                            ispirato i grandi film del west, le spiagge pieni di surfisti e l'incredibile storia dei nativi americani.
                        </p>
                        <Link to = '/list'>
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>

                <div className = 'article'>
                    <Card.Img variant = "top" src = {imageC2} />
                    <Card.Body>
                        <h4>{arrayCountry[1]}</h4>
                        <p>
                            Visita il Sud America per vedere il grande polmone della terra la grande foresta amazzonica,
                            e il resto del continente, speriditi vedendo incredibili animali con i loro colori mozzafiati!
                        </p>
                        <Link to = "/list">
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>

                <div className = 'article'>
                    <Card.Img variant = "top" src = {imageC3} />
                    <Card.Body>
                        <h4>{arrayCountry[2]}</h4>
                        <p>
                            Visita l'Europa il continente d'arte e cibo per eccellenza, perditi attraverso mille sapori
                            e rimani senza fiato guardando la sua arte, patria di grandi condottieri e poeti!
                        </p>
                        <Link to = "/list">
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>

                <div className = 'article'>
                    <Card.Img variant = "top" src = {imageC4} />
                    <Card.Body>
                        <h4>{arrayCountry[3]}</h4>
                        <p>
                            Visita l'Africa un continente dove la vita riesce a stupire con le sue oasi e l'incredibile ecosistema di vita delle sue dune,
                            ma anche ricco di storia e da dove i nostri antenati sono arrivati!
                        </p>
                        <Link to = "/list">
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>

                <div className = 'article'>
                    <Card.Img variant = "top" src = {imageC5} />
                    <Card.Body>
                        <h4>{arrayCountry[4]}</h4>
                        <p>
                            Visita l'Asia il continente d'eccellenza della storia, la terra di guerrieri e condottieri implacabili,
                            patria di innumerevoli religioni e di una cultura sconfinata!
                        </p>
                        <Link to = "/list">
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>

                <div className = 'article'>
                    <Card.Img variant = "top" src = {imageC6} />
                    <Card.Body>
                        <h4>{arrayCountry[5]}</h4>
                        <p>
                            Visita l'Oceania con spiagge incredibili, un continente circondato da acqua l'essenza della vita,
                            rimarrai sbalordito dal suo ecosistema e una vasta gamma di vita sconfinata!
                        </p>
                        <Link to = "/list">
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>

                <div className = 'article'>
                    <Card.Img variant = "top" src = {imageC7} />
                    <Card.Body>
                        <h4>{arrayCountry[6]}</h4>
                        <p>
                            Visita l'Antartide il continente dei ghiacciai dove si raggiungono temperature fuori dal comune,
                            perditi nella vista dei grandi ghiacciai e del suo ecosistema di vita!
                        </p>
                        <Link to = "/list">
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>
                
            </section>
        </>
    )
}

export default HomeContinents;
