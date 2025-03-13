import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";


class GlobalNavbar extends Component {

  constructor(props) {
      super(props);
      
      this.state = {

        isProfileDropdownOpen: false,
      };
      
      this.profileDropdownRef = React.createRef();
    }

  //funzione per aprire la tenda del profilo

    toggleProfileDropdown = () => {

      this.setState((prevState) => ({
        isProfileDropdownOpen: !prevState.isProfileDropdownOpen,
      }));
    };

    //funzione per far chiudere la tenda al click al di fuori di essa
  
    handleClickOutside = (event) => {
      if (
        this.profileDropdownRef.current &&
        !this.profileDropdownRef.current.contains(event.target) 
      ) {
        this.setState({

          isProfileDropdownOpen: false,
        });
      }
    };
  

  render() {

    const { isProfileDropdownOpen } = this.state;

    return (
      <section className="d-inline-flex justify-content-between w-100 pe-4 ps-4 align-items-center">
        
        <Link to = {"/"}>
          <div className="brand">
            Viaggi di Passione
          </div>
        </Link>

        <Link to = {"/list"}>
          <button>

            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="16" 
              height="16" 
              fill="currentColor" 
              className="search"
              viewBox="0 0 16 16" 
              >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
            </svg>

              Vuoi passare direttamente alla ricerca?
          </button>
        </Link>
          
        <button className="profile" onClick={this.toggleProfileDropdown} ref={this.profileDropdownRef}>

            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16" className="me-2">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>

            {isProfileDropdownOpen && (
              <div className = "profileDropdown">
                <ul>
                  <li>
                    Il mio profilo
                  </li>

                  <li>
                    Impostazioni
                  </li>

                  <Link to = {"/favoriti"}
                    className = "link"
                  > 
                    <li>
                      Preferiti
                    </li>
                  </Link>

                  <li>
                    Logout
                  </li>
                </ul>
              </div>
            )}
        </button>

      </section>
    );
  }
}

export default GlobalNavbar