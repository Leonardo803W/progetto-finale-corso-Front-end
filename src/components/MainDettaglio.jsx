import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 

import GlobalLoading from './GlobalLoading';
import GlobalError from './GlobalError';

const MainDettaglio = () => {
  const { id }  = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await fetch(`http://localhost:8080/api/viaggi/findById/${id}`, {
          method: 'GET',
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJsZW9uIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sImlhdCI6MTc0MzA4MDIwNywiZXhwIjoxNzQzOTQ0MjA3fQ.qNzRg0SS0wRcjLW1RdmYAyB1ZHpUur8JYCRZsjiZpzY',
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log(result);
        setData(result);

      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [id]);

  const handlePrenota = () => {
    const existingReservations = JSON.parse(localStorage.getItem('prenotazioni')) || [];
    
    // Check if the current item's ID is already in the reservations
    if (existingReservations.includes(data.data.id)) {
      alert('Prenotazione già effettuata per questo elemento!');
    } else {
      // Save the selected item ID to local storage
      existingReservations.push(data.data.id);
      localStorage.setItem('prenotazioni', JSON.stringify(existingReservations));
      alert('Prenotazione effettuata!');
    }
  };

  if (loading) {
    return <GlobalLoading />;
  }

  if (error) {
    return <GlobalError />; 
  }

  return (
    <>
      <h1>{data.data.titolo}</h1>
      <div className='imageProduct'>
        <img src="https://placedog.net/500" alt="" />
      </div>

      <div className='d-inline-flex'>
        <p>{data.data.stato}</p>
        <p>{data.data.regione}</p>
        <p>{data.data.provincia}</p>
        <p>{data.data.citta}</p>
      </div>
      
      <section className='d-flex'>
        <div className='w-50 p-2'>
          <p>{data.data.descrizione}</p>
        </div>

        <aside className='m-2 me-auto ms-auto'>
          <p>Price: ${data.data.prezzo}</p>
          <button 
            className='btn btn-danger' // Bootstrap class for styling a red button
            onClick={handlePrenota}
          >
            Prenota
          </button>
        </aside>
      </section>
    </>
  );
}

export default MainDettaglio;