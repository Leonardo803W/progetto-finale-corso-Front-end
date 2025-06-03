import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalLoading from './GlobalLoading';
import GlobalError from './GlobalError';

const Mainpreferiti = () => {

    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);

    // Carica i favoriti dal localStorage all'inizio
    useEffect(() => {

        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    // Fetch dati ogni volta che favorites cambiano
    useEffect(() => {

        if (favorites.length > 0) {
            fetchData(favorites);
        } else {
            setData([]);
            setLoading(false);
        }
    }, [favorites]);

    // funzione per visualizzare tramite fetch i favoriti
    const fetchData = async (favorites) => {
        
        setLoading(true);
        setError(false);

        const token = localStorage.getItem('isUserToken');

        try {

            const fetchPromises = favorites.map(async (id) => {

                const response = await fetch(`http://localhost:8080/api/viaggi/findById/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return await response.json();
            });

            const results = await Promise.all(fetchPromises);
            //console.log('API results:', results);
            const filteredData = results.map(result => result.data).filter(item => item !== undefined); // Aggiorna i favoriti che non esistono più
            const existingFavorites = filteredData.map(item => item.id);
            const updatedFavorites = favorites.filter(id => existingFavorites.includes(id));
            
            if (updatedFavorites.length !== favorites.length) {
                setFavorites(updatedFavorites);
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            }

            setData(filteredData);
            
        } catch (error) {
            console.error('Fetch error:', error);
            setError(true);
        } finally {
            setLoading(false);
        }
    };

    const handleFavoriteClick = (itemId) => {

        const updatedFavorites = favorites.filter(id => id !== itemId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        alert('Annullamento eseguito con successo!');
    };

    if (loading) { return <GlobalLoading />; }
    if (error) { return <GlobalError />; }

    return (
        <div className = 'd-inline-flex'>
            {data.length === 0 ? (
                <p>No favorites found.</p>
            ) : (
                data.map(item => (
                    <div key={item.id} className="cardList">
                        <h3>{item.titolo}</h3>
                        <img src={item.image} alt="immagine copertina" className='imgCopertina' />
                            <p className='m-2'>Luogo della struttura: {item.stato}</p>

                            <div className='divGroup'>
                                <p>Check In: {item.checkIn}</p>
                                <p>Check Out: {item.checkOut}</p>               
                            </div>

                            <div className='divGroup'>
                                <p>camere per adulti: {item.adulti}</p>
                                <p>camere per bambini: {item.bambini}</p>                           
                            </div>
                        <p>Price: {item.prezzo}</p>
                        <div id='buttonList'>
                            <Link to={`/Dettaglio/${item.id}`}>
                                <button className='buttonD'>Vai ai dettagli</button>
                            </Link>
                            <div onClick={() => handleFavoriteClick(item.id)} className='preferitiImg'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                </svg>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Mainpreferiti;