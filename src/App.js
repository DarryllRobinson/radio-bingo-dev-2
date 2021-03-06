import React, { Component } from 'react';
//import { Link } from 'react-router-dom';
import { FormGroup, ControlLabel, FormControl, Form, Button, Col, Radio } from 'react-bootstrap';
import Bingo from './utils/Bingo';
import "../node_modules/jquery/dist/jquery.min.js";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      campaigns: {},
      firstName: '',
      surname: '',
      email: '',
      cell: '',
      picture: ''
    };

    this.updateProfile = this.updateProfile.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentWillMount() {
    this.listCampaigns();
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile }, function() {
          console.log('profile: ', this.state.profile);
        });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  listCampaigns() {
    Bingo.getCampaigns().then(response => {
      const list = Object.keys(response).map((index) => {
        const campaign = [];
        campaign.push(response[index]);
        return campaign;
      });
      this.setState({ campaigns: list });
    });
  }

  renderList() {
    if (this.state.campaigns.length > 0) {
      return this.state.campaigns.map((campaign, index) => {
        return (
          <Col smOffset={2} sm={10} key={campaign[0].id}>
            <Radio name="campaign"
              value={campaign[0].campaign_name}>
              {campaign[0].campaign_name}
            </Radio>
            {' '}
          </Col>
        )
      })
    }
  }

  updateProfile(e) {
    e.preventDefault();
    console.log('updateProfile: ', this.state);
  }

  handleOnChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case 'frmName':
        console.log(1);
        this.setState({ firstName: value })
        break;
      case 'frmSurname':
        this.setState({ surname: value })
        break;
      case 'frmEmail':
        this.setState({ email: value })
        break;
      case 'frmCell':
        this.setState({ cell: value })
        break;
      case 'frmFile':
        this.setState({ picture: value })
        break;
      default:
        console.log('problem with switch');
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { profile } = this.state;

    return (
      <div>
      {
        isAuthenticated() && (
          <div>
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

            <div className="createUser">
              <p>Welcome to Radio Bingo. Please provide a little more information and then select a campaign below to start playing.</p>
              <Form horizontal
              onChange={(e) => this.handleOnChange(e)}>

                <FormGroup controlId="frmName">
                  <Col componentClass={ControlLabel} sm={2}>
                    First name
                  </Col>
                  <Col sm={6}>
                    <FormControl type="name"
                      name="frmName"
                      placeholder={profile.nickname}
                    />
                  </Col>
                </FormGroup>

                <FormGroup controlId="frmSurname">
                  <Col componentClass={ControlLabel} sm={2}>
                    Surname
                  </Col>
                  <Col sm={6}>
                    <FormControl type="name"
                      placeholder="Surname"
                      name="frmSurname"
                    />
                  </Col>
                </FormGroup>

                <FormGroup controlId="frmEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                  </Col>
                  <Col sm={6}>
                    <FormControl type="email"
                      placeholder={profile.name}
                      name="frmEmail"
                    />
                  </Col>
                </FormGroup>

                <FormGroup controlId="frmCell">
                  <Col componentClass={ControlLabel} sm={2}>
                    Cell phone number
                  </Col>
                  <Col sm={6}>
                    <FormControl type="number"
                    placeholder="Give us your digits please"
                    name="frmCell"
                  />
                  </Col>
                </FormGroup>

                <FormGroup controlId="frmFile">
                  <Col componentClass={ControlLabel} sm={2}>
                    Profile picture
                  </Col>
                  <Col sm={2}>
                    <img src={profile.picture} alt="profile" />
                  </Col>
                  <Col componentClass={ControlLabel} sm={2}>
                    Upload a new profile pic
                  </Col>
                  <Col sm={4}>
                    <FormControl type="file" />
                  </Col>
                </FormGroup>

                <FormGroup controlId="frmCampaigns">
                  {this.renderList()}
                </FormGroup>

                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button className="btn btn-primary"
                      type="submit"
                      onClick={this.updateProfile}
                    >
                    Save & play
                    </Button>
                  </Col>
                </FormGroup>
              </Form>
            </div>
          </div>
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
