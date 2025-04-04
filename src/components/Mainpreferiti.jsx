import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalLoading from './GlobalLoading';
import GlobalError from './GlobalError';

const Mainpreferiti = () => {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
        fetchData(savedFavorites);
    }, []);

    /*
    let id = 57;

    // Recupera la lista dei preferiti esistente da localStorage
    let favoritess = JSON.parse(localStorage.getItem('favorites')) || [];

    // Filtra l'array per rimuovere l'elemento con l'ID specificato
    favoritess = favorites.filter(favorite => favorite.id !== id);

    // Salva nuovamente l'array aggiornato in localStorage
    localStorage.setItem('favorites', JSON.stringify(favoritess));

    // Controlla se l'elemento è stato rimosso con successo
    if (!favoritess.some(favorite => favorite.id === id)) {
        console.log(`L'elemento con ID ${id} è stato rimosso con successo.`);
    } else {
        console.log(`L'elemento con ID ${id} non è stato rimosso.`);
    }

    // Mostra il contenuto di localStorage
    console.log(localStorage);
    */

    const fetchData = async (favorites) => {
        
        
        setLoading(true);
        setError(false);
        try {
            const fetchPromises = favorites.map(async (id) => {
                const response = await fetch(`http://localhost:8080/api/viaggi/findById/${id}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZW9uIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTc0MzA4MDIwNywiZXhwIjoxNzQzOTQ0MjA3fQ.qNzRg0SS0wRcjLW1RdmYAyB1ZHpUur8JYCRZsjiZpzY',
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                return await response.json();
            });

            const results = await Promise.all(fetchPromises);
            const filteredData = results.map(result => result.data).filter(item => item !== undefined);

            // Check for favorites that no longer exist
            const existingFavorites = filteredData.map(item => item.id);
            const updatedFavorites = favorites.filter(id => existingFavorites.includes(id));

            // Update state and local storage if favorites have changed
            if (updatedFavorites.length !== favorites.length) {
                setFavorites(updatedFavorites);
                localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            }

            setData(filteredData);
        } catch (error) {
            setError(true);
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFavoriteClick = (itemId) => {

        const updatedFavorites = favorites.filter(id => id !== itemId);
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        
        // Refresh data after removing a favorite
        fetchData(updatedFavorites);
    };

    if (loading) { return <GlobalLoading />; }
    if (error) { return <GlobalError />; }

    return (
        <div className='d-inline-flex'>
            {data.length === 0 ? (
                <p>No favorites found.</p>
            ) : (
                data.map(item => (
                    <div key={item.id} className="cardList">
                        <h3>{item.titolo}</h3>

                        <img src={item.image} alt="immagine copertina" className='imgCopertina' />

                        <p>{item.stato}</p>

                        <div className='divGroup'>
                            <p>{item.check_in}</p>
                            <p>{item.check_out}</p>
                        </div>

                        <div className='divGroup'>
                            <p>{item.adulti}</p>
                            <p>{item.bambini}</p>
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