import React, { useEffect, useState } from 'react';
import { useParams, useHistory, Link } from 'react-router-dom'; 

import GlobalLoading from './GlobalLoading';
import GlobalError from './GlobalError';

const MainDettaglio = () => {

  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //chiamata della fetch tramite id passato per parametro
  useEffect(() => {

    const fetchData = async () => {

      setLoading(true);
      setError(null);
  
      try {
        const response = await fetch(`http://localhost:8080/api/viaggi/findById/${id}`, {

          // il token viene dato un pubblico per poter fare vedere all'utente anche se non e registrato

          method: 'GET',
          headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuZWxzb24iLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImlhdCI6MTc0ODYxMTYzOSwiZXhwIjoxNzQ5NDc1NjM5fQ.eT4yPYnugm979dlrIV9mzbjwECWdixz25V2FFXcVI-o',
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

  //funzione per le prenotazioni
  const handlePrenota = () => {

    const existingReservations = JSON.parse(localStorage.getItem('prenotazioni')) || [];
    
    //controlla se l'elemento sia stato o non sia stato gia prenotato
    if (existingReservations.includes(data.data.id)) {

      alert('Prenotazione già effettuata per questo elemento!');
      
    } else {

      //salva l'elemento nel local storage tramite id
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

  console.log(localStorage)
  const token = localStorage.getItem('authToken');

  return (
    <>
    <section className = 'BigSectionDettaglio'>
      <h3>{data.data.titolo}</h3>

      <div className='p-2'>
          <img src={data.data.image} alt="immagine copertina"/>
      </div>       

      <div className = 'luogoCasa'>
        <span>Luogo di destinazione: </span>
        <p>{data.data.stato}</p>
        <p>{data.data.regione}</p>
        <p>{data.data.provincia}</p>
        <p>{data.data.citta}</p>
      </div>
      
      <section className = 'd-flex bg-light mt-4'>
        <div className = 'w-50 p-2'>

          <div className = 'maindDettaglio'>
            <p>Stanze per adulti: {data.data.adulti}</p>
            <p>Stanze per i bambini: {data.data.bambini}</p>
          </div>

          <p className = 'm-0 p-4'>Descrizione: {data.data.descrizione}</p>
        </div>

          <aside className = 'm-2 me-auto ms-auto'>

            <div className = 'maindDettaglio'>
              <p>Data di check-In: {data.data.checkIn}</p>
              <p>Data di check-Out: {data.data.checkOut}</p>                      
            </div>

            <p className = 'm-0 p-4'>Price: ${data.data.prezzo}</p>

            <div id = 'buttonDettaglio'>
              {token ? (
                <button 
                  className = 'btn btn-danger' 
                  onClick={handlePrenota}
                >
                  Prenota
                </button>
              ) : (
                <Link to = "/">
                  <button className = 'buttonD'>
                    Registrati per prenotare
                  </button>
                </Link>
              )}
            </div>
          </aside>
        </section>
      </section>
    </>
  );
}

export default MainDettaglio;