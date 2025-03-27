import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import axios from "axios"; // Make sure to install axios for making HTTP requests

class GlobalNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isProfileDropdownOpen: false,
      isModalOpen: false,
      isRegisterMode: false,
      username: '',
      password: '',
      email: '',
      isAuthenticated: false,
    };

    this.profileDropdownRef = React.createRef();
  }

  toggleProfileDropdown = () => {
    this.setState((prevState) => ({ isProfileDropdownOpen: !prevState.isProfileDropdownOpen }));
  };

  handleClickOutside = (event) => {
    if (this.profileDropdownRef.current && !this.profileDropdownRef.current.contains(event.target)) {
      this.setState({ isProfileDropdownOpen: false });
    }
  };

  openModal = (isRegisterMode = false) => {
    this.setState({ isModalOpen: true, isRegisterMode });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false, username: '', password: '', email: '' });
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleAuthSubmit = (event) => {
    event.preventDefault();
    const { isRegisterMode, username, password, email } = this.state;

    const endpoint = isRegisterMode ? '/api/auth/register' : '/api/auth/login';
    const data = isRegisterMode ? { username, password, email } : { username, password };

    axios.post(endpoint, data)
      .then(response => {
        if (!isRegisterMode) {
          // Assume the response contains a token for successful login
          localStorage.setItem("token", response.data.token); // Store token
          this.setState({ isAuthenticated: true });
        }
        this.closeModal();
      })
      .catch(error => {
        console.error("Authentication error", error);
      });
  };

  handleLogout = () => {
    localStorage.removeItem("token"); // Clear token
    this.setState({ isAuthenticated: false });
  };

  render() {
    const { isProfileDropdownOpen, isModalOpen, isRegisterMode, isAuthenticated } = this.state;

    return (
      <section className="d-inline-flex justify-content-between w-100 pe-4 ps-4 align-items-center">
        <Link to={"/"}>
          <div className="brand">Viaggi di Passione</div>
        </Link>

        <Link to={"/list"}>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
            Vuoi passare direttamente alla ricerca?
          </button>
        </Link>

        <button className="profile" onClick={this.toggleProfileDropdown} ref={this.profileDropdownRef}>
          {/* Profile Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
          </svg>

          {isProfileDropdownOpen && (
            <div className="profileDropdown">
              <ul>
                {!isAuthenticated ? (
                  <li onClick={() => this.openModal(false)}>Log in</li>
                ) : (
                  <>
                    <li><Link to="/settings">Impostazioni</Link></li>
                    <li><Link to="/favorites">Preferiti</Link></li>
                    <li onClick={this.handleLogout}>Logout</li>
                  </>
                )}
              </ul>
            </div>
          )}
        </button>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>{isRegisterMode ? "Registrati" : "Accedi"}</h2>
              <form onSubmit={this.handleAuthSubmit}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  required
                />
                {isRegisterMode && (
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    required
                  />
                )}
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  required
                />
                <button type="submit">{isRegisterMode ? "Registrati" : "Accedi"}</button>
                <button type="button" onClick={this.closeModal}>Chiudi</button>
              </form>
              <button onClick={() => this.openModal(!isRegisterMode)}>
                {isRegisterMode ? "Hai già un account? Accedi" : "Non hai un account? Registrati"}
              </button>
            </div>
          </div>
        )}
      </section>
    );
  }
}

export default GlobalNavbar;