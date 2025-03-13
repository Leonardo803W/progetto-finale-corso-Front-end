import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 

import GlobalLoading from './GlobalLoading';
import GlobalError from './GlobalError';

const MainDettaglio = () => {

  //inizializzazione variabili

  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //chiamata fetch con l'id dell'elemento specifico passato come props

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        console.log(result);
        setProduct(result);
      } catch (error) {
        console.log(error)
        setError(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchProduct();
  }, [id]);

  console.log(id)

  //utilizzo dei componenti loading ed error

  if (loading) {
    return <GlobalLoading />;
  }

  if (error) {
    return <GlobalError />; 
  }

    return(
        <>
            {product && (
            <>
              <div className = ' d-inline-flex justify-content-around w-100 align-items-center m-2'>
                <h1>{product.title}</h1>

                <div>

                  <button className = ' border-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-share-fill" viewBox="0 0 16 16">
                      <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5"/>
                    </svg>

                    <a href="" className = ' me-2 ms-2 text-decoration-none text-black'>condividi</a>
                  </button>

                  <button className = ' border-0'>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
                    </svg>

                    <a href="" className = ' me-2 ms-2 text-decoration-none text-black'>salva</a>
                  </button>
                </div>

              </div>
              
              <div className = 'imageProduct'>
                <img src={product.image} alt={product.title} />
              </div>
              
              <section className = ' d-inline-flex'>
                <div className = ' w-50 p-2'>
                  <p>{product.description}</p>
                  <p>Category: {product.category}</p>
                </div>

                <aside className = ' m-2 me-auto ms-auto'>
                  <p>Price: ${product.price}</p>
                </aside>
              </section>
            </>
          )}
        </>
    )
}

export default MainDettaglio;