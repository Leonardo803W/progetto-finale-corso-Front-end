import '../App.css';
import React, { Component, useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import Carousel from 'react-multi-carousel'; 
import 'react-multi-carousel/lib/styles.css';

import GlobalLoading from './GlobalLoading'; 
import GlobalError from './GlobalError';

// punti definiti per la quantita di card visualizzabili del carosello
const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1200 }, items: 4, slidesToSlide: 1 },
    laptop: { breakpoint: { max: 1199, min: 768 }, items: 3, slidesToSlide: 1 },
    tablet: { breakpoint: { max: 767, min: 576 }, items: 2, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 575, min: 0 }, items: 1, slidesToSlide: 1 },
};

const MainList = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [favorites, setFavorites] = useState([])
    const [alert, setAlert] = useState(false)
    const [alertMessage, setAlertMessage] = useState('') // per impostare messaggi personalizzati
    const [activeIndex, setActiveIndex] = useState(0); 
    const [animatingIds, setAnimatingIds] = useState([]);

    // funzione per tenere salvati i preferiti 
    useEffect(() => {
    
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, [favorites]);



    // fetch per visualizzare tuttli gli elementi gia esistenti
    useEffect(() => {

        const fetchData = async () => {

            setLoading(true);
            setError(false);

            try {
                const response = await fetch('http://localhost:8080/api/viaggi/fetchall', {

                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuZWxzb24iLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlhdCI6MTc0ODk3NTk4NywiZXhwIjoxNzQ5ODM5OTg3fQ.KTMroG0fhXcpc_WBD-9PgdsW3M8PV-OS8mAuLWxNOL4',
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                //console.log(result)
                setData(result.data)
                
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false)
            }
        };

        fetchData();
    }, []);

    // chiamo l'animazione per far intendere all'utente che vi e un caricamento in corso
    if (loading) { 
        return <GlobalLoading />; 
    }

    if (error) { 
        return <GlobalError />; 
    }

    // funzione per gestire l'indice del carosello
    const handleBeforeChange = (previous, next) => {

        setActiveIndex(next);
    };

    // funzione per dividere il carosello avendo diversi caroselli con tot elementi
    const chunks = (array, size) => {

        const result = [];

        for (let i = 0; i < array.length; i += size) {

            result.push(array.slice(i, i + size)); // divido l'array in array piu piccoli in una specifica dimensione 
        }

        return result;
    };

    // funzione per gestire l'animazione dei favoriti
    const handleFavoriteanimation = (item) => {

        let updatedFavorites;

        if (favorites.includes(item.id)) {
            
            // controllo se l'elemento sia gia presente e lo tolgo
            updatedFavorites = favorites.filter(favId => favId !== item.id);
            setAlertMessage("Rimozione dai preferiti eseguita con successo!")
            setAlert(true)

        } else {

            // controllo se l'elemento non sia presente e lo aggiungo
            updatedFavorites = [...favorites, item.id];
            setAlertMessage("Aggiunta ai preferiti riuscita con successo!")
            setAlert(true)
        }

        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        //console.log(localStorage)

        // tempo per il messaggio
        setTimeout(() => {
            setAlert(false)
            setAlertMessage('')
        }, 4000);

        // Attiva animazione per questo item
        setAnimatingIds(prev => [...prev, item.id]);

        // tempo per l'animazione 
        setTimeout(() => {
            setAnimatingIds(prev => prev.filter(id => id !== item.id));
        }, 1000);
    };
        
        return (

            <div className='mb-4 mt-4'>

                {alert && (
                    <div className = "alertFavoriti">
                        <p className = 'm-0'>{alertMessage}</p>
                    </div>
                )}

                {chunks(data.content, 6).map((chunk, index) => (
                    <Carousel
                        key={index}
                        responsive={responsive}
                        swipeable={false}
                        draggable={false}
                        showDots={true}
                        ssr={true}
                        keyBoardControl={true}
                        //infinite={true}
                        //autoPlay={true}
                        //autoPlaySpeed={2000}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                        beforeChange={handleBeforeChange}
                    >
                        {chunk.map((item, itemIndex) => (

                            <div className={`cardList ${activeIndex === itemIndex ? 'active' : ''}`} key={item.id}>
                                <h3>{item.titolo}</h3>
                                <img src={item.image} alt="immagine copertina" />
                                <p className='m-2'>Luogo della struttura: {item.stato}</p>

                                <div className='divGroup'>
                                    <p>Check In: {item.checkIn}</p>
                                    <p>Check Out: {item.checkOut}</p>               
                                </div>

                                <div className='divGroup'>
                                    <p>camere per adulti: {item.adulti}</p>
                                    <p>camere per bambini: {item.bambini}</p>                           
                                </div>

                                <p className='m-0 p-2'>Price: {item.prezzo}</p>

                                <div id='buttonList'>
                                    <Link to={`/Dettaglio/${item.id}`}>
                                        <button className='buttonD'>Vai ai dettagli</button>
                                    </Link>   
                                    <div onClick={() => handleFavoriteanimation(item)} className='preferitiImg'>
                                        {favorites.includes(item.id) ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className={`bi bi-heart-fill ${animatingIds.includes(item.id) ? 'heart-pulse' : ''}`}
                                                viewBox="0 0 16 16"
                                                id = 'animationHeart1'
                                            >
                                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className={`bi bi-heart-fill ${animatingIds.includes(item.id) ? 'heart-void' : ''}`}
                                                viewBox="0 0 16 16"
                                                id = 'animationHeart2'
                                            >
                                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                ))}
            </div>
        );
}

export default MainList;