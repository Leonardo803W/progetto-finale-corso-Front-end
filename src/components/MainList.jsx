import '../App.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import MainFavoriti from './MainFavoriti';
import GlobalLoading from './GlobalLoading';
import GlobalError from './GlobalError';

const MainList = () => {

  //inizializzazione variabili

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [favorites, setFavorites] = useState([]);

  //chiamata fetch

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
        console.log(result);
        setData(result.data);

      } catch (error) {
        console.log(error);
        setError(error); 
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //utilizzo dei componenti loading ed error

  if (loading) {
    return <GlobalLoading />;
  }

  if (error) {
    return <GlobalError />; 
  }

  //funzione per i preferiti in cui se l'elemento e gia aggiunti lo fa deselezionare se invece non c'e' lo aggiunge

  const handleFavoriteClick = (item) => {
    if (favorites.includes(item.id)) {
      setFavorites(favorites.filter(favId => favId !== item.id));
    } 
    else 
    {
      setFavorites([...favorites, item.id]);
    }
  };

  return (
    <div className="card-container d-inline-flex">
      {data.slice(0, 5).map((item) => (
        <div className="card" key={item.id}>
          <div className='p-2'>
            <img src = "https://placedog.net/500" alt = "" />

            <div onClick={() => handleFavoriteClick(item)} className='preferitiImg'>
              {favorites.includes(item.id) ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                  <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                </svg>
              )}
            </div>
            <MainFavoriti favorites={favorites} />
          </div>

          <div>
            <p>{item.stato}</p>
            <p>{item.regione}</p>
            <p>{item.provincia}</p>
            <p>{item.citta}</p>
          </div>

          <div>
              <h3>{item.titolo}</h3> 
              <p>{item.descrizione}</p>       
          </div>

          <div>{item.prezzo}</div>

          <Link to={`/Dettaglio/${item.id}`}>
            <button>Vai ai dettagli</button>
          </Link>

          <p>{item.price}</p>
        </div>
      ))}
    </div>
  );
};

export default MainList;
