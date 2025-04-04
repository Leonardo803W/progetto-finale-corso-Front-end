import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalLoading from './GlobalLoading';
import GlobalError from './GlobalError';

const MainPrenotazioni = () => {
  const [prenotazioni, setPrenotazioni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);

  /*
  let id = 57;

  // Recupera la lista dei preferiti esistente da localStorage
  let prenotazionii = JSON.parse(localStorage.getItem('prenotazioni')) || [];

  // Filtra l'array per rimuovere l'elemento con l'ID specificato
  prenotazionii = prenotazioni.filter(prenotazioni => prenotazioni.id !== id);

  // Salva nuovamente l'array aggiornato in localStorage
  localStorage.setItem('prenotazioni', JSON.stringify(prenotazionii));

  // Controlla se l'elemento è stato rimosso con successo
  if (!prenotazionii.some(prenotazioni => prenotazioni.id === id)) {
      console.log(`L'elemento con ID ${id} è stato rimosso con successo.`);
  } else {
      console.log(`L'elemento con ID ${id} non è stato rimosso.`);
  }
      */

  // Mostra il contenuto di localStorage
  console.log(localStorage);

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
            <div key={item.id} className = "cardList">
              <h3>{item.titolo}</h3>
                            
              <div className='p-2'>
                  <img src={item.image} alt="immagine copertina" className='imgCopertina' />
              </div>                            
                            
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
                <button className='buttonD' onClick={() => handleAnnullaPrenotazione(item.id)}>
                  Annulla Prenotazione
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainPrenotazioni;