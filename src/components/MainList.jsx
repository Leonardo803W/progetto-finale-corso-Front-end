import '../App.css';
import React, { useEffect, useState } from 'react'; 
import { Link } from 'react-router-dom'; 
import Carousel from 'react-multi-carousel'; 
import 'react-multi-carousel/lib/styles.css';

import GlobalLoading from './GlobalLoading'; 
import GlobalError from './GlobalError';

const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1200 }, items: 4, slidesToSlide: 1 },
    laptop: { breakpoint: { max: 1199 , min: 768 }, items: 3, slidesToSlide: 1 },
    tablet: { breakpoint: { max: 767, min: 576 }, items: 2, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 575, min: 0 }, items: 1, slidesToSlide: 1 },
};

const MainList = ({ dove, chekIn, chekOut, adulti, bambini }) => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);

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
                setData(result.data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
        fetchData();
    }, []);

    if (loading) { return <GlobalLoading />; }
    if (error) { return <GlobalError />; }

    const handleFavoriteClick = (item) => {
        let updatedFavorites;
        if (favorites.includes(item.id)) {
            updatedFavorites = favorites.filter(favId => favId !== item.id);
        } else {
            updatedFavorites = [...favorites, item.id];
        }
        setFavorites(updatedFavorites);
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    };

    const filteredData = data.filter(item => {
        const matchesDove = dove ? item.someProperty && item.someProperty.includes(dove) : true;
        const matchesChekIn = chekIn ? item.someDateProperty && new Date(item.someDateProperty) >= new Date(chekIn) : true;
        const matchesChekOut = chekOut ? item.someDateProperty && new Date(item.someDateProperty) <= new Date(chekOut) : true;
        const matchesAdulti = adulti ? item.adultiCount === adulti : true;
        const matchesBambini = bambini ? item.bambiniCount === bambini : true;

        return matchesDove && matchesChekIn && matchesChekOut && matchesAdulti && matchesBambini;
    });

    const chunkss = (array, size) => {
      const result = [];
      for (let i = 0; i < array.length; i += size) {
          result.push(array.slice(i, i + size));
      }
      return result;
  };

  const chunksFilters = (array, size) => {
      const result = [];
      for (let i = 0; i < array.length; i += size) {
          result.push(array.slice(i, i + size));
      }
      return result;
  };

    const chunks = chunkss(data, 7);
    const chunksFilter = chunksFilters(filteredData, 7);

    const handleBeforeChange = (previous, next) => {
        setActiveIndex(next);
    };

    return (
        <div>
            {(chunksFilter.length > 0 ? chunksFilter : chunks).map((chunk, index) => (
                <Carousel
                    key={index}
                    responsive={responsive}
                    swipeable={false}
                    draggable={false}
                    showDots={true}
                    ssr={true}
                    keyBoardControl={true}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="carousel-container"
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    beforeChange={handleBeforeChange}
                >
                    {chunk.map((item, itemIndex) => (
                        <div className={`card ${activeIndex === itemIndex ? 'active' : ''}`} key={item.id}>

                            <div className='p-2'>
                                <img src={item.image} alt="immagine copertina" className='imgCopertina' />
                            </div>

                            <div className = ' d-inline-flex'> 
                              <p>{item.stato}</p>
                              <p>{item.regione}</p>
                              <p>{item.provincia}</p>
                              <p>{item.citta}</p>
                            </div>

                        
                            <p>{item.descrizione}</p>
                            <p>Price: {item.prezzo}</p>

                            <div className = 'd-inline-flex align-items-center justify-content-around'>
                                <Link to={`/Dettaglio/${item.id}`}>
                                    <button>Vai ai dettagli</button>
                                </Link>   

                                <div onClick={() => handleFavoriteClick(item)} className='preferitiImg'>
                                    {favorites.includes(item.id) ? (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314" />
                                        </svg>
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
                                            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            ))}
        </div>
    );
};

export default MainList;