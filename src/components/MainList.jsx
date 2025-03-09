import '../App.css'; 
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const MainList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); 

      try {
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setData(result); 
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
        <div className="card-container d-inline-flex">
          {data.slice(0, 5).map((item) => (
            <div className="card" key={item.id}> {/* Usa item.id come chiave */}
              <img src={item.image} alt={item.title} />
              <h3>{item.category}</h3>
              <p>{item.description}</p>
              <Link to={`/Dettaglio/${item.id}`}> {/* Passa l'id nel link */}
                <button>Vai ai dettagli</button>
              </Link>
              <p>{item.price}</p>
            </div>
          ))}
        </div>
    </>
  );
}

export default MainList;