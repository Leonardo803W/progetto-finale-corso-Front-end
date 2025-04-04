import '../App.css';
import React, { Component } from 'react'; 
import { Link } from 'react-router-dom'; 
import Carousel from 'react-multi-carousel'; 
import 'react-multi-carousel/lib/styles.css';

import GlobalLoading from './GlobalLoading'; 
import GlobalError from './GlobalError';

// Define responsive breakpoints for the carousel
const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1200 }, items: 4, slidesToSlide: 1 },
    laptop: { breakpoint: { max: 1199, min: 768 }, items: 3, slidesToSlide: 1 },
    tablet: { breakpoint: { max: 767, min: 576 }, items: 2, slidesToSlide: 1 },
    mobile: { breakpoint: { max: 575, min: 0 }, items: 1, slidesToSlide: 1 },
};

class MainList extends Component {
    constructor(props) {
        super(props);
        // Initialize state
        this.state = {
            data: [], // To store fetched data
            loading: true, // Loading state
            error: false, // Error state
            favorites: [], // To store favorite items
            activeIndex: 0, // To track active carousel index
            alertMessage: '', // Message for alerts
        };
    }

    // Fetch favorite items from local storage and then fetch data
    async componentDidMount() {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        this.setState({ favorites: savedFavorites });
        await this.fetchData();
    }

    // Fetch all items from the API
    fetchData = async () => {
        this.setState({ loading: true, error: false });
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
            this.setState({ data: result.data }); // Save fetched data to state
        } catch (error) {
            this.setState({ error: true }); // Set error state if fetch fails
        } finally {
            this.setState({ loading: false }); // Set loading to false after fetching
        }
    };

    // Handle adding/removing favorites
    handleFavoriteClick = (item) => {
        let updatedFavorites;

        if (this.state.favorites.includes(item.id)) {
            
            // If item is already a favorite, remove it
            updatedFavorites = this.state.favorites.filter(favId => favId !== item.id);
            this.setState({ alertMessage: "Rimozione dai preferiti eseguita con successo!" });
        } else {

            // If item is not a favorite, add it
            updatedFavorites = [...this.state.favorites, item.id];
            this.setState({ alertMessage: "Aggiunta ai preferiti riuscita con successo!" });
        }

        this.setState({ favorites: updatedFavorites });
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Save updated favorites to local storage
        console.log(localStorage)
        
        // Remove alert message after 3 seconds
        setTimeout(() => {
            this.setState({ alertMessage: '' });
        }, 3000);
    };

    // Handle carousel index change
    handleBeforeChange = (previous, next) => {
        this.setState({ activeIndex: next });
    };

    // Utility function to split the fetched data into chunks for the carousel
    chunks = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size)); // Split array into smaller arrays of specified size
        }
        return result;
    };

    render() {
        const { loading, error, alertMessage, activeIndex, data } = this.state;

        // Rendering loading or error components
        if (loading) { return <GlobalLoading />; }
        if (error) { return <GlobalError />; }

        // Filtered data to be displayed in the carousel (modify as needed)
        const filteredData = data; // Adjust this line according to your filtering logic

        return (
            <div className='mb-4 mt-4'>
                {alertMessage && (
                    <div className="alertLoginRegister">
                        <p>{alertMessage}</p>
                    </div>
                )}

                {/* Render carousel with chunks of filtered data */}
                {this.chunks(filteredData, 6).map((chunk, index) => (
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
                        beforeChange={this.handleBeforeChange}
                    >
                        {chunk.map((item, itemIndex) => (
                            <div className={`cardList ${activeIndex === itemIndex ? 'active' : ''}`} key={item.id}>
                                <h3>{item.titolo}</h3>
                                <img src={item.image} alt="immagine copertina" />
                                <p className='m-2'>Luogo della struttura: {item.stato}</p>

                                <div className='divGroup'>
                                    <p>Check In: {item.checkIn}</p>
                                    <p>Check Out: {item.checkOut}</p>               
                                </div>

                                <div className='divGroup'>
                                    <p>camere per adulti: {item.adulti}</p>
                                    <p>camere per bambini: {item.bambini}</p>                           
                                </div>

                                <p className='m-0 p-2'>Price: {item.prezzo}</p>

                                <div id='buttonList'>
                                    <Link to={`/Dettaglio/${item.id}`}>
                                        <button className='buttonD'>Vai ai dettagli</button>
                                    </Link>   
                                    <div onClick={() => this.handleFavoriteClick(item)} className='preferitiImg'>
                                        {this.state.favorites.includes(item.id) ? (
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
    }
}

export default MainList;