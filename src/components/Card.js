import React, { Component } from 'react';
import './style.css';
import { FlexyFlipCard } from 'flexy-flipcards';
import Bingo from '../utils/Bingo';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      card: {},
      tiles: null
    }

    this.submitArtist = this.submitArtist.bind(this);
  }

  componentWillMount() {

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
  }

  componentDidMount() {
    const numTiles = 15;
    const userId = 2;  // must figure out the actual user_id
    const campaignId = 3;   // ditto here
    const cardId = 4;   // and here
    const exists = true; // need to integrate the user table eventually

    if (!exists) {
      this.newCard(numTiles, userId, campaignId);
    };

    console.log('initial this.state.tiles: ', this.state.tiles);

    Bingo.getTiles(cardId).then(response => {

      console.log('response: ', response);
      const card = Object.keys(response).map((index) => {
        const tile = [];
        console.log('response[index]: ', response[index]);
        tile.push(response[index]);
        console.log('tile: ', tile);
        return tile;
      });
      //tile.push(response);
      //console.log('tile: ', tile);

      this.setState({ tiles: card }, function() {
        console.log('updated this.state.tiles: ', this.state.tiles);
      });
      console.log('updated this.state.tiles: ', this.state.tiles);
    });

      /*Object.keys(card).map((i) => {
        console.log('Object: ', card[i]);
        let tile = {
          id: card[i].id,
          song: card[i].song,
          artist_1: card[i].artist_1,
          artist_2: card[i].artist_2,
          artist_3: card[i].artist_3,
          card_id: card[i].card_id
        };
        tiles.push(tile);
        return tile;    // I don't even know why this is here
      });*/
      /*const tile = [{
        id: 1,
        name: "song",
        artist_1: "artist_1",
        artist_2: "artist_2",
        artist_3: "artist_3",
        cardId: "cardId"
      },
      {
        id: 2,
        name: "song",
        artist_1: "artist_1",
        artist_2: "artist_2",
        artist_3: "artist_3",
        cardId: "cardId"
      },
      {
        id: 3,
        name: "song",
        artist_1: "artist_1",
        artist_2: "artist_2",
        artist_3: "artist_3",
        cardId: "cardId"
      }];*/


    /*Bingo.getTiles(cardId).then(tile => {
      if (tile) {
        this.setState({
          tiles: tile
        }, function() {
          console.log('updated this.state.tiles: ', this.state.tiles);
          return;
        });
      }
    });*/

    //this.setState({ loading: 'true' });

    /*this.fetchCard(cardId)
    .then((card) => {
      let tiles = [];
      Object.keys(card).map((i) => {
        console.log('Object: ', card[i]);
        let tile = {
          id: card[i].id,
          song: card[i].song,
          artist_1: card[i].artist_1,
          artist_2: card[i].artist_2,
          artist_3: card[i].artist_3,
          card_id: card[i].card_id
        };
        tiles.push(tile);
        return tile;    // I don't even know why this is here
      });
      console.log('Final tiles: ', tiles);
      this.setState({ tiles: tiles }, function() {
        console.log('Completed setting the state');
      });

    });*/

    /*this.fetchCard(cardId)
    .then((card) => {
      this.pushToState(card)
      .then((response) => {
        this.setState({ tiles: response }, function() {
          console.log('Final state: ', this.state.tiles);
        });
      });
    });*/
  }

  checkDB(id) {
    let exists = false;
    if (Bingo.getUser(id)) {
      exists = true;
    };
    return exists;
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
    //console.log('tile: ', tile);
    Bingo.createTile(tile);
  }

  updateTiles(arr) {
    //console.log('arr: ', arr);
    return new Promise((resolve, reject) => {
      this.setState(prevState => ({
        tiles: [...prevState.tiles, arr]
      }), function() {
        console.log('State: ', this.state);
        resolve();
      });
    });
  }

  fetchCard(cardId) {
    const promise = new Promise((resolve, reject) => {
      Bingo.getTiles(cardId).then(card => {
        resolve(card);
      });
    });

    return promise;
  }

  /*pushToState(card) {
    const promise = new Promise((resolve, reject) => {
      Object.keys(card).map((i) => {
        console.log('Object: ', card[i]);
        let tiles = [];
        tiles.push(card[i]);
      });
      console.log('pushToState resolve');
      resolve('tiles');
    });
    return promise;
  }*/

  submitArtist(e) {
    e.preventDefault();
    console.log('The link was clicked.');
    /*console.log('myRef: ', this.myRef.value);
    this.myRef.value = "flipper";
    console.log('myRef: ', this.myRef.value);*/
  }

  renderCards() {
    console.log('renderCards');
    //console.log('this.state.tiles[0].id: ', this.state.tiles[0].id);
    //console.log('this.state.tiles.length before: ', this.state.tiles.length);
    //console.log('current state: ', this.state);
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
          Not loading
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
