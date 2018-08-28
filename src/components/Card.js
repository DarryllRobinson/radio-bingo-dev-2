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
      tiles: null,
      updatedIndex: null,
      updatedTile: null
    }

    this.submitArtist = this.submitArtist.bind(this);
  }

  componentDidMount() {

    const numTiles = 16;
    const campaignId = 4;   // pretending the user chose campaign ???
    //const cardId = 3;   // need to create a new card
    //const exists = true; // need to integrate the user table eventually

    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile }, function() {
          this.checkDB(this.state.profile.sub, campaignId, numTiles)
          .then(exists => {
            //console.log('this.state.card: ', this.state.card);
            //console.log('return exists: ', exists);
            if (!exists) {
              this.newCard(numTiles, this.state.profile.sub, campaignId)
              .then(card => {
                //console.log('back from newCard');
                const user = {
                      userId: this.state.profile.sub,
                      campaignId: campaignId,
                      cardId: card.id
                };

                Bingo.completeUser(user).then(response => {
                  //console.log('back from completeUser');
                  this.setState({ card: response.cardId }, function() {
                    //console.log('completeUser resolve');
                    const cardId = this.state.card;
                    Bingo.getTiles(cardId).then(response => {
                      const card = Object.keys(response).map((index) => {
                        const tile = [];
                        tile.push(response[index]);
                        return tile;
                      });
                      this.setState({ tiles: card });
                    });
                  });
                });
              });
            } else {
              const userId = this.state.profile.sub;
              //console.log('userId: ', userId);
              Bingo.getUser(userId).then(user => {
                //console.log('user: ', user);
                this.setState({ card: user[0].card_id }, function() {
                  //console.log('this.state.card: ', this.state.card);
                  const cardId = this.state.card;
                  Bingo.getTiles(cardId).then(response => {
                    const card = Object.keys(response).map((index) => {
                      const tile = [];
                      tile.push(response[index]);
                      return tile;
                    });
                    this.setState({ tiles: card });
                  });
                });
              });
            };
          });
        });
      });
    } else {
      this.setState({ profile: userProfile });
    };



  }

  checkDB(id, campaignId, numTiles) {
    const promise = new Promise((resolve, reject) => {
      Bingo.getUser(id).then(response => {
        Object.keys(response).map((index) => {
          //console.log('heading into Object keys');
          if (response[index].campaign_id === campaignId && response[index].card_id) {
            this.setState({ exists: true }, function() {
              //console.log('exists: ', this.state.exists);
              return true;
            });
          };
          //console.log('exists: ', this.state.exists);
          return false;
        });
        resolve(this.state.exists);
      });
    });
    return promise;
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
      const cardElements = {
        numTiles: numTiles,
        user_id: userId,
        campaign_id: campaignId
      }
      //console.log('cardElements: ', cardElements);
      Bingo.createCard(cardElements).then(card => {
        resolve(card);
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
    if (this.state.updatedIndex) {
      //console.log('The link was clicked.');
      //console.log('state: ', this.state);
      //console.log('tile to be updated: ', this.state.tiles[this.state.updatedIndex]);
      const tileToSend = this.state.tiles[this.state.updatedIndex][0];
      //console.log('tileToSend: ', tileToSend);
      /*const preppedTile = Object.keys(tileToSend).map((index) => {
        const tile = [];
        tile.push(tileToSend[index]);
        //console.log('tile[]: ', tile);
        return tile;
      });*/
      //console.log('preppedTile: ', preppedTile);
      //console.log('state before submit: ', this.state.tiles);
      Bingo.submitArtist(tileToSend).then(response => {
        //console.log('response: ', response);
        //console.log('state after submit: ', this.state.tiles);
      });
    };
  }

  handleOnChange(e) {
    const clickTime = new Date().toLocaleString();
    const tileId = e.target.name;
    const value = e.target.value
    const selection = value.slice(0, 8);
    const artist = value.slice(8);
    const tile = this.state.tiles;

    switch (selection) {
      case 'artist_1':
        tile[tileId][0].artist_1_selected = true;
        break;
      case 'artist_2':
        tile[tileId][0].artist_2_selected = true;
        break;
      case 'artist_3':
        tile[tileId][0].artist_3_selected = true;
        break;
      default:
        console.log('problem with switch');
    }

    tile[tileId][0].submitted = true;
    tile[tileId][0].submitted_artist = artist;
    tile[tileId][0].submitted_time = clickTime;

    this.setState({
      tiles: tile,
      updatedIndex: tileId,
      updatedTile: tile[tileId][0].id
    });
  }

  renderCards() {
    if (this.state.tiles.length > 0) {
      return this.state.tiles.map((tile, index) => {
        if (tile[0].correct === 0) {
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
                        name={`${index}`}
                        value={'artist_1' + tile[0].artist_1}
                        onChange={(e) => this.handleOnChange(e)}
                        selected={tile[0].artist_1_selected}
                      />
                      {tile[0].artist_1}
                      <br />
                      <br />
                      <input type="radio"
                        name={`${index}`}
                        value={'artist_2' + tile[0].artist_2}
                        onChange={(e) => this.handleOnChange(e)}
                        selected={tile[0].artist_2_selected}
                      />
                      {tile[0].artist_2}
                      <br />
                      <br />
                      <input type="radio"
                        name={`${index}`}
                        value={'artist_3' + tile[0].artist_3}
                        onChange={(e) => this.handleOnChange(e)}
                        selected={tile[0].artist_3_selected}
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
        } else if (tile[0].correct === 1) {
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
                    <h3>Correct!</h3>

                    <br />
                    <button className="select">Check submitted artist</button>
                  </div>

                  <div>
                    <h4>
                      <input type="radio"
                        name={`${index}`}
                        value={'artist_1' + tile[0].artist_1}
                        onChange={(e) => this.handleOnChange(e)}
                        selected={tile[0].artist_1_selected}
                      />
                      {tile[0].artist_1}
                      <br />
                      <br />
                      <input type="radio"
                        name={`${index}`}
                        value={'artist_2' + tile[0].artist_2}
                        onChange={(e) => this.handleOnChange(e)}
                        selected={tile[0].artist_2_selected}
                      />
                      {tile[0].artist_2}
                      <br />
                      <br />
                      <input type="radio"
                        name={`${index}`}
                        value={'artist_3' + tile[0].artist_3}
                        onChange={(e) => this.handleOnChange(e)}
                        selected={tile[0].artist_3_selected}
                      />
                      {tile[0].artist_3}
                      <br />
                      <br />
                      <div ref="flipper">
                        <button className="select"
                          onClick={this.submitArtist}>
                          Back
                        </button>
                      </div>
                    </h4>
                  </div>
                </FlexyFlipCard>
            </div>
          );
        } else {
          return(
            <div  className="item"
              key={tile[0].id}>
              <h4>Error in rendering tiles</h4>
            </div>
          );
        }
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
