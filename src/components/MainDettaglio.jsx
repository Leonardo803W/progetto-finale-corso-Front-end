import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 

import GlobalLoading from './GlobalLoading';
import GlobalError from './GlobalError';

const MainDettaglio = () => {

  const { id }  = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //fetch dell'elemento cliccato dall'utente chiamato tramite l'id passato come parametro e fornito poi alla fetch per la chiamata
  
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

  if (loading) 
  {
    return <GlobalLoading />;
  }

  if (error) 
  {
    return <GlobalError />; 
  }

  return (
        <>
          <div className='d-inline-flex justify-content-around w-100 align-items-center m-2'>
            <h1>{data.data.titolo}</h1>

            <div>
              <button className='border-0'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-share-fill" viewBox="0 0 16 16">
                  <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
                </svg>
                <a href="" className='me-2 ms-2 text-decoration-none text-black'>condividi</a>
              </button>

              <button className='border-0'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                </svg>
                <a href="" className='me-2 ms-2 text-decoration-none text-black'>salva</a>
              </button>
            </div>
          </div>
          
          <div className='imageProduct'>
            <img src="https://placedog.net/500" alt="" />
          </div>

          <div>
            <p>{data.data.stato}</p>
            <p>{data.data.regione}</p>
            <p>{data.data.provincia}</p>
            <p>{data.data.citta}</p>
          </div>
          
          <section className='d-inline-flex'>
            <div className='w-50 p-2'>
              <p>{data.data.descrizione}</p>
            </div>

            <aside className='m-2 me-auto ms-auto'>
              <p>Price: ${data.data.prezzo}</p>
            </aside>
          </section>
        </>
  );
}

export default MainDettaglio;
