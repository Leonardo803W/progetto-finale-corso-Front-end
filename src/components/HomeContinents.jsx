import { Card, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const HomeContinents = () => {

    const arrayCountry = ["Nord America", "Sud America", "Europa", "Africa", "Asia", "Oceania", "Antartide" ]

    return (
        <>
            <h3>
                In quale continente ti piacerebbe andare?
            </h3>

            <section className='bigSection'>

                <div className='article'>
                    <Card.Img variant="top" src="https://www.ilmondosecondogipsy.it/wp-content/uploads/2018/10/foliage.jpg" />
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

                <div className='article'>
                    <Card.Img variant="top" src="https://siviaggia.it/wp-content/uploads/sites/2/2015/12/foresta-amazzonica.jpg" />
                    <Card.Body>
                        <h4>arrayCountry[1]</h4>
                        <p>
                            Visita il Sud America per vedere il grande polmone della terra la grande foresta amazzonica,
                            e il resto del continente, speriditi vedendo incredibili animali con i loro colori mozzafiati!
                        </p>
                        <Link to="/list">
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>

                <div className='article'>
                    <Card.Img variant="top" src="https://arte.sky.it/archivio/wp-content/uploads/2018/03/reddit-mappa-europa-capolavori-dellarte-620x388.jpg" />
                    <Card.Body>
                        <h4>arrayCountry[2]</h4>
                        <p>
                            Visita l'Europa il continente d'arte e cibo per eccellenza, perditi attraverso mille sapori
                            e rimani senza fiato guardando la sua arte, patria di grandi condottieri e poeti!
                        </p>
                        <Link to="/list">
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>

                <div className='article'>
                    <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/NubianMeroePyramids30sep2005%282%29.jpg/590px-NubianMeroePyramids30sep2005%282%29.jpg" />
                    <Card.Body>
                        <h4>arrayCountry[3]</h4>
                        <p>
                            Visita l'Africa un continente dove la vita riesce a stupire con le sue oasi e l'incredibile ecosistema di vita delle sue dune,
                            ma anche ricco di storia e da dove i nostri antenati sono arrivati!
                        </p>
                        <Link to="/list">
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>

                <div className='article'>
                    <Card.Img variant="top" src="https://www.hostelworld.com/blog/wp-content/uploads/2015/04/1145.jpg" />
                    <Card.Body>
                        <h4>arrayCountry[4]</h4>
                        <p>
                            Visita l'Asia il continente d'eccellenza della storia, la terra di guerrieri e condottieri implacabili,
                            patria di innumerevoli religioni e di una cultura sconfinata!
                        </p>
                        <Link to="/list">
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>

                <div className='article'>
                    <Card.Img variant="top" src="https://stefaniasilvestro.com/website/wp-content/uploads/2020/03/viaggi-nozze-oceania.jpg" />
                    <Card.Body>
                        <h4>arrayCountry[5]</h4>
                        <p>
                            Visita l'Oceania con spiagge incredibili, un continente circondato da acqua l'essenza della vita,
                            rimarrai sbalordito dal suo ecosistema e una vasta gamma di vita sconfinata!
                        </p>
                        <Link to="/list">
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>

                <div className='article'>
                    <Card.Img variant="top" src="https://leganerd.com/wp-content/uploads/2023/08/pinguini-Antartide.jpeg" />
                    <Card.Body>
                        <h4>arrayCountry[6]</h4>
                        <p>
                            Visita l'Antartide il continente dei ghiacciai dove si raggiungono temperature fuori dal comune,
                            perditi nella vista dei grandi ghiacciai e del suo ecosistema di vita!
                        </p>
                        <Link to="/list">
                            <Button variant="primary">Prenota e vola!</Button>
                        </Link>
                    </Card.Body>
                </div>
                
            </section>
        </>
    )
}

export default HomeContinents;