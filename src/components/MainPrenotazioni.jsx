import React, { useEffect, useState } from 'react';
import GlobalLoading from './GlobalLoading';
import GlobalError from './GlobalError';

const MainPrenotazioni = () => {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const savedPrenotazioni = JSON.parse(localStorage.getItem('prenotazioni')) || [];
    setPrenotazioni(savedPrenotazioni);
    fetchData(savedPrenotazioni);
  }, []);

  const fetchData = async (prenotazioni) => {
    setLoading(true);
    setError(false);
    try {
      const fetchPromises = prenotazioni.map(async (id) => {
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
      setData(filteredData);
    } catch (error) {
      setError(true);
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnnullaPrenotazione = (itemId) => {
    const updatedPrenotazioni = prenotazioni.filter(id => id !== itemId);
    setPrenotazioni(updatedPrenotazioni);
    localStorage.setItem('prenotazioni', JSON.stringify(updatedPrenotazioni));
    fetchData(updatedPrenotazioni); // Refresh data after cancelling a reservation
    alert('Annullamento eseguito con successo!');
  };

  if (loading) { return <GlobalLoading />; }
  if (error) { return <GlobalError />; }

  return (
    <div>
      {data.length === 0 ? (
        <p>Non hai effettuato prenotazioni.</p>
      ) : (
        <div className='d-inline-flex'>
          {data.map(item => (
            <div key={item.id} className="favoriteCard">
              <h3>{item.titolo}</h3>
              <img src={item.image} alt="immagine copertina" />

              <div className='d-inline-flex'> 
                <p>{item.stato}</p>
                <p>{item.regione}</p>
                <p>{item.provincia}</p>
                <p>{item.citta}</p>
              </div>
              
              <p>{item.descrizione}</p>
              <p>Price: {item.prezzo}</p>
              
              <button 
                className='btn btn-danger' 
                onClick={() => handleAnnullaPrenotazione(item.id)}
              >
                Annulla Prenotazione
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainPrenotazioni;