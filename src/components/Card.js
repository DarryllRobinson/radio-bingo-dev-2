import React, { Component } from 'react';
import './style.css';
import { FlexyFlipCard } from 'flexy-flipcards';
import Bingo from '../utils/Bingo';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      card: {},
      exists: false,
      tiles: null
    }

    this.submitArtist = this.submitArtist.bind(this);
  }

  /*componentWillMount() {

    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({
          profile,
          loading: 'profile'
        });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }*/

  componentDidMount() {

    const numTiles = 16;
    //const userId = 2;  // must figure out the actual user_id
    const campaignId = 2;   // ditto here
    const cardId = 4;   // and here
    //const exists = true; // need to integrate the user table eventually

    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile }, function() {
          this.checkDB(this.state.profile.sub, campaignId, numTiles);
        });
      });
    } else {
      this.setState({ profile: userProfile });
    };

    Bingo.getTiles(cardId).then(response => {

      const card = Object.keys(response).map((index) => {
        const tile = [];
        tile.push(response[index]);
        return tile;
      });

      this.setState({ tiles: card });
    });
  }

  checkDB(id, campaignId, numTiles) {
    Bingo.getUser(id).then(response => {
        Object.keys(response).map((index) => {
          if (response[index].campaign_id === campaignId) {
            this.setState({ exists: true }, function() {
              return true;
            });
          };
          return false;
        });

        if (!this.state.exists) {

          this.newCard(numTiles, this.state.profile.sub, campaignId)
          .then(response => {
            console.log('profile: ', this.state.profile);
            const user = {
              user_id: this.state.profile.sub,
              name: this.state.profile.nickname,
              picture: this.state.profile.picture,
              campaign_id: campaignId
            };
            Bingo.createUser(user).then(response => {
              console.log('response: ', response);
            });
          });
        };
      });
  }

  newCard(numTiles, userId, campaignId) {
    const promise = new Promise((resolve, reject) => {
      this.createCard(numTiles, userId, campaignId)
      .then((card) => {
        for (let i = 0; i < numTiles; i++) {
          this.createTile(card.id);
        }
        resolve(card);
      });
    });
    return promise;
  }

  createCard(numTiles, userId, campaignId) {
    const promise = new Promise((resolve, reject) => {
      const card = {
        numTiles: numTiles,
        user_id: userId,
        campaign_id: campaignId
      }
      Bingo.createCard(card).then(response => {
        resolve(response);
      });
    });
    return promise;
  }

  createTile(cardId) {
    const promise = new Promise((resolve, reject) => {
      Promise.all([
        this.fetchSong(),
        this.fetchArtists()
      ])
      .then((values) => {
        this.prepTiles(values, cardId)
      })
    });
    return promise;
  }

  fetchSong() {
    const id = Math.floor(Math.random() * 2000) + 1;
    return Bingo.getSong(id);
  }

  fetchArtists() {
    const fetchPromises = [];
    for (let j = 0; j < 2; j++) {
      const id = Math.floor(Math.random() * 10) + 1;
      fetchPromises.push(Bingo.getArtist(id));
    }
    return Promise.all(fetchPromises);
  }

  prepTiles(arr, cardId) {
    const tile = {
      song: arr[0].name,
      artist_1: arr[0].artist,
      artist_2: arr[1][0].artist,
      artist_3: arr[1][1].artist,
      card_id: cardId
    };
    Bingo.createTile(tile);
  }

  submitArtist(e) {
    e.preventDefault();
    console.log('The link was clicked.');
    /*console.log('myRef: ', this.myRef.value);
    this.myRef.value = "flipper";
    console.log('myRef: ', this.myRef.value);*/
  }

  renderCards() {
    if (this.state.tiles.length > 0) {
      return this.state.tiles.map(tile => {
        return (
          <div
            className="item"
            key={tile[0].id}>
              <FlexyFlipCard
                  frontBackgroundColor="#000034"
                  backBackgroundColor="#000034"
              >
                <div ref="flipper">
                  <h3>{tile[0].song}</h3>
                  <br />
                  <button className="select">Select artist</button>
                </div>

                <div>
                  <h4>
                    <input type="radio"
                      name="artist1"
                      value={tile[0].artist_1}
                    />
                    {tile[0].artist_1}
                    <br />
                    <br />
                    <input type="radio"
                      name="artist2"
                      value={tile[0].artist_2}
                    />
                    {tile[0].artist_2}
                    <br />
                    <br />
                    <input type="radio"
                      name="artist3"
                      value={tile[0].artist_3}
                    />
                    {tile[0].artist_3}
                    <br />
                    <br />
                    <div ref="flipper">
                      <button className="select"
                        onClick={this.submitArtist}>
                        Save artist
                      </button>
                    </div>
                  </h4>
                </div>
              </FlexyFlipCard>
          </div>
        );
      });
    }
  }

  render() {

    if (!this.state.tiles) {
      return (
        <div className="Landing">
          Please wait a moment as we build your card...
        </div>
      )
    }

    const { profile } = this.state;
    return (
      <div className="Landing">
        <h2>{profile.nickname + String.fromCharCode(39)}s Radio Bingo Board</h2>

        <div className="tileCard">

          <div className="item-list">
            {this.renderCards()}
          </div>

        </div>

      </div>
    )
  }
}

export default Card;
