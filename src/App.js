import React, { Component } from 'react';
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import './App.css';

class App extends Component {

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
      {
        isAuthenticated() && (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand"
              onClick={this.goTo.bind(this, 'landing')}
              style={{ cursor: "pointer" }}
            >
              Play Bingo!
            </a>
            <button  className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span  className="navbar-toggler-icon"></span>
            </button>

            <div  className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul  className="navbar-nav mr-auto">
                <li  className="nav-item active">
                  <a  className="nav-link"
                    onClick={this.goTo.bind(this, 'profile')}
                    style={{ cursor: "pointer" }}
                  >
                    Profile
                  <span  className="sr-only">
                  </span>
                  </a>
                </li>
                <li  className="nav-item active">
                  <a  className="nav-link"
                    onClick={this.goTo.bind(this, 'card')}
                    style={{ cursor: "pointer" }}
                  >
                    Card
                  <span  className="sr-only">
                  </span>
                  </a>
                </li>

                <li  className="nav-item active">
                  <a  className="nav-link"
                    onClick={this.logout.bind(this)}
                    style={{ cursor: "pointer" }}
                  >
                    Log Out
                  <span  className="sr-only">
                  </span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
      )}
      {
        !isAuthenticated() && (
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div  className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul  className="navbar-nav mr-auto">
                <li  className="nav-item active">
                  <a  className="nav-link"
                    onClick={this.login.bind(this)}
                    style={{ cursor: "pointer" }}
                  >
                    Log In
                  <span  className="sr-only">
                  </span>
                  </a>
                </li>
              </ul>
            </div>
          </nav>
      )}
      </div>
    );
  }
}

export default App;
