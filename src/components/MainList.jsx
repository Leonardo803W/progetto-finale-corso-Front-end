import '../App.css';
import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import Carousel from 'react-multi-carousel'; 
import 'react-multi-carousel/lib/styles.css';

import GlobalLoading from './GlobalLoading'; 
import GlobalError from './GlobalError';

const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1200 }, items: 4, slidesToSlide: 1 },
    laptop: { breakpoint: { max: 1199 , min: 768 }, items: 3, slidesToSlide: 1 },
    tablet: { breakpoint: { max: 767, min: 576 }, items: 2, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 575, min: 0 }, items: 1, slidesToSlide: 1 },
};

const MainList = ({ dove, chekIn, chekOut, adulti, bambini }) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [alertMessage, setAlertMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(false);
            try {
                const response = await fetch('http://localhost:8080/api/viaggi/fetchall', {
                    method: 'GET',
                    headers: {
                      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZW9uIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTc0MzA4MDIwNywiZXhwIjoxNzQzOTQ0MjA3fQ.qNzRg0SS0wRcjLW1RdmYAyB1ZHpUur8JYCRZsjiZpzY',
                      'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const result = await response.json();
                setData(result.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
        fetchData();
    }, []);

    if (loading) { return <GlobalLoading />; }
    if (error) { return <GlobalError />; }

    const handleFavoriteClick = (item) => {
        let updatedFavorites;
    
        if (favorites.includes(item.id)) {
            updatedFavorites = favorites.filter(favId => favId !== item.id);
            setAlertMessage("Rimozione dai preferiti eseguita con successo!");
        } else {
            updatedFavorites = [...favorites, item.id];
            setAlertMessage("Aggiunta ai preferiti riuscita con successo!");
        }
    
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    
        // Gestisci il timeout qui
        setTimeout(() => {
            setAlertMessage('');
        }, 3000);
    };

    const filteredData = data.reduce((acc, item) => {
        const matchesDove = dove ? item.someProperty?.includes(dove) : true;
        const matchesChekIn = chekIn ? new Date(item.someDateProperty) >= new Date(chekIn) : true;
        const matchesChekOut = chekOut ? new Date(item.someDateProperty) <= new Date(chekOut) : true;
        const matchesAdulti = adulti ? item.adultiCount === adulti : true;
        const matchesBambini = bambini ? item.bambiniCount === bambini : true;
        
        if (matchesDove && matchesChekIn && matchesChekOut && matchesAdulti && matchesBambini) {
            acc.push(item);
        }
    
        return acc;
    }, []);

    const chunks = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    const handleBeforeChange = (previous, next) => {

        setActiveIndex(next);
    };

    const shouldDisplayCards = dove || chekIn || chekOut || adulti || bambini;
    console.log(filteredData)

    return (
        
        <div>
            {alertMessage && (
                <div className="alertLoginRegister">
                    <p>{alertMessage}</p>
                </div>
            )}

            {shouldDisplayCards ? (
                // Display a list of cards if props are not empty
                filteredData.map(item => (
                    <div className='card' key={item.id}>
                        <h3>{item.titolo}</h3>
                            
                        <div className='p-2'>
                            <img src={item.image} alt="immagine copertina" className='imgCopertina' />
                        </div>                            
                            
                        <p>{item.stato}</p>

                        <div className = 'd-flex'>
                            <p>{item.check_in}</p>
                            <p>{item.check_out}</p>                      
                        </div>

                        <div className = 'd-flex'>
                            <p>{item.adulti}</p>
                            <p>{item.bambini}</p>                           
                        </div>

                        <p>Price: {item.prezzo}</p>

                            <div className='d-inline-flex align-items-center justify-content-around'>
                            <Link to={`/Dettaglio/${item.id}`}>
                                <button>Vai ai dettagli</button>
                            </Link>   
                            <div onClick={() => handleFavoriteClick(item)} className='preferitiImg'>
                                {favorites.includes(item.id) ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                // Display the carousel if props are empty
                chunks(filteredData, 7).map((chunk, index) => (
                    <Carousel
                        key={index}
                        responsive={responsive}
                        swipeable={false}
                        draggable={false}
                        showDots={true}
                        ssr={true}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={500}
                        containerClass="carousel-container"
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                        beforeChange={handleBeforeChange}
                    >
                        {chunk.map((item, itemIndex) => (
                            <div className = {`cardList ${activeIndex === itemIndex ? 'active' : ''}`} key={item.id}>

                                <h3>{item.titolo}</h3>
                                <img src={item.image} alt="immagine copertina" />

                                <p className = 'm-2'>Luogo della struttura: {item.stato}</p>

                                <div className = 'divGroup'>
                                    <p>Check In: {item.checkIn}</p>
                                    <p>Check Out: {item.checkOut}</p>               
                                </div>

                                <div className = 'divGroup'>
                                    <p>camere per adulti: {item.adulti}</p>
                                    <p>camere per bambini: {item.bambini}</p>                           
                                </div>

                                <div id = 'buttonList'>
                                    <Link to={`/Dettaglio/${item.id}`}>
                                        <button>Vai ai dettagli</button>
                                    </Link>   
                                    <div onClick={() => handleFavoriteClick(item)} className='preferitiImg'>
                                        {favorites.includes(item.id) ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                                <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                            </svg>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Carousel>
                ))
            )}
        </div>
    );
};

export default MainList;