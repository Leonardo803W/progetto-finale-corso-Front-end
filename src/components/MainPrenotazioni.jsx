import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalLoading from './GlobalLoading';
import GlobalError from './GlobalError';

const MainPrenotazioni = () => {

  const [prenotazioni, setPrenotazioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  // Carica i prenotati dal localStorage all'inizio
  useEffect(() => {

    const savedPrenotazioni = JSON.parse(localStorage.getItem('prenotazioni')) || [];
    setPrenotazioni(savedPrenotazioni);
  }, []);

  // Fetch dati ogni volta che le prenotazioni cambiano
  useEffect(() => {
      if (prenotazioni.length > 0) {
          fetchData(prenotazioni);
      } else {
          setData([]);
          setLoading(false);
      }
  }, [prenotazioni]);

// funzione per visualizzare tramite fetch i prenotati
const fetchData = async (prenotazioni) => {

  setLoading(true);
  setError(false);
  
  const token = localStorage.getItem('isUserToken');

  try {
    const fetchPromises = prenotazioni.map(async (id) => {
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
    const filteredData = results.filter(item => item !== undefined);
    setData(filteredData);

  } catch (error) {
    setError(true);
    console.error('Fetch error:', error);
  } finally {
    setLoading(false);
  }
};

  if (loading) { return <GlobalLoading />; }
  if (error) { return <GlobalError />; }

  // funzione per annullare la prenotazione
  const handleAnnullaPrenotazione = (itemId) => {
    const updatedPrenotazioni = prenotazioni.filter(id => id !== itemId);
    setPrenotazioni(updatedPrenotazioni);
    localStorage.setItem('prenotazioni', JSON.stringify(updatedPrenotazioni));

    const updatedData = data.filter(item => item.id !== itemId);
    setData(updatedData);

    alert('Annullamento eseguito con successo!');
  };

  return (
    <div>
      {data.length === 0 ? (
        <p>Non hai effettuato prenotazioni.</p>
      ) : (
        <div className='d-inline-flex'>
          {data.map(item => {
            console.log('Item:', item); // Verifica i dati
            return (
              <div key={item.id} className="cardList">
                <h3>{item.titolo}</h3>
                              <div className='p-2'>
                        <img src={item.image} alt="immagine copertina" className='imgCopertina' />
                    </div>                            
                                  
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
                      <button className='buttonD' onClick={() => handleAnnullaPrenotazione(item.id)}>
                        Annulla Prenotazione
                      </button>
                    </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MainPrenotazioni;