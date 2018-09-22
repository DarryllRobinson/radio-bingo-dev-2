import React, { Component } from 'react';
import { FlexyFlipCard } from 'flexy-flipcards';
import { Button, Radio, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Bingo from '../utils/Bingo';
import './style947.css';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      card: {},
      campaignId: 2,      // must update to actual campaign chosen
      completed: 0,       // must update from db for each reload
      except: [],
      exceptArtists: [],
      exceptSongs: [],
      exists: false,
      tiles: null,
      updatedIndex: null,
      updatedTile: null
    }

    this.submitArtist = this.submitArtist.bind(this);
    this.genRandomNum = this.genRandomNum.bind(this);
  }

  componentDidMount() {

    const numTiles = 2;
    const campaignId = this.state.campaignId;

    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile }, function() {
          this.checkDB(this.state.profile.sub, campaignId, numTiles)
          .then(exists => {
            if (!exists) {
              this.newCard(numTiles, this.state.profile.sub, campaignId)
              .then(card => {
                const user = {
                      userId: this.state.profile.sub,
                      campaignId: campaignId,
                      cardId: card.id
                };

                Bingo.completeUser(user).then(response => {
                  this.setState({ card: response.cardId }, function() {
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
              Bingo.getUser(userId).then(user => {
                for (const index in user) {
                  if (user[index].campaign_id === campaignId) {
                    this.setState({ card: user[index].card_id }, function() {
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
                    return true;
                  }
                }
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
    //const id = Math.floor(Math.random() * 2000) + 1;
    const id = this.genRandomSong(1, 2000);
    return Bingo.getSong(id);
  }

  fetchArtists() {
    const fetchPromises = [];
    for (let j = 0; j < 2; j++) {
      const id = this.genRandomArtist(1, 10);
      fetchPromises.push(Bingo.getArtist(id));
    }
    return Promise.all(fetchPromises);
  }

  prepTiles(arr, cardId) {
    let numbers = this.genRandomNum(1, 3);
    let tileElements = [
      { artist: arr[0].artist, value: numbers[0] },
      { artist: arr[1][0].artist, value: numbers[1] },
      { artist: arr[1][1].artist, value: numbers[2] }
    ];

    const orderedTiles = [...tileElements];
    orderedTiles.sort((a,b) => {
      return a.value > b.value;
    });

    const tile = {
      song: arr[0].name,
      artist_1: orderedTiles[0].artist,
      artist_2: orderedTiles[1].artist,
      artist_3: orderedTiles[2].artist,
      card_id: cardId
    };

    Bingo.createTile(tile);
  }

  submitArtist(e) {
    e.preventDefault();
    if (this.state.updatedIndex) {
      const tileToSend = this.state.tiles[this.state.updatedIndex][0];
      Bingo.submitArtist(tileToSend).then(response => {
        const submission = {
          artist: response.submittedArtist,
          campaignId: this.state.campaignId,
          tileId: response.id,
          song: response.song,
          time: response.submittedTime
        };
        this.checkSong(submission).then(result => {
          console.log('result: ', result);
          if (result === true) {
            console.log('submission.tileId: ', submission.tileId);
            const update = {
              id: submission.tileId,
              correct: 1
            }
            Bingo.correctSubmission(update).then(response => {
              console.log('response: ', response);
              const completed = this.state.completed + 1;
              const newTiles = this.state.tiles;
              this.setState({
                completed: completed,
                tiles: newTiles
              }, function() {
                //console.log('did it work?');
                window.location.reload();
              });
            });
          } else {
            console.log('submission.tileId: ', submission.tileId);
            const update = {
              id: submission.tileId,
              message: result
            }
            Bingo.wrongSubmission(update).then(response => {
              console.log('response: ', response);
              const newTiles = this.state.tiles;
              this.setState({
                tiles: newTiles
              }, function() {
                //console.log('did it work?');
                window.location.reload();
              });
            });
          }
        });
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

  checkSong(submission) {
    const promise = new Promise((resolve, reject) => {
      Bingo.matchSong(submission.campaignId).then(result => {
        Object.keys(result).map((index) => {
          if (result[index].song === submission.song) {
            // checking time
            if (result[index].start_time < submission.time
              && submission.time < result[index].end_time) {
              // checking artist
              if (result[index].artist === submission.artist) {
                //console.log('artist matches');
                resolve(true);
                return true;
              } else {
                resolve('Not the correct artist');
                return false;
              }
            }
            resolve('Song was not playing at the time you submitted');
            return false;
          } else {
            resolve('Song was not playing');
            return false;

          }
        });
      });
    });
    return promise;
  }

  genRandomNum(min, max) {
    let count = 0;
    let num = 0;

    do {
      let except = this.state.except;
      let random = Math.floor(Math.random() * (max - min + 1)) + min;
      let len = this.state.except.length;
      // Checking the array isn't full already - clear and send error msg if it is
      if (len === max) {
        const clear = [];
        this.setState({ except: clear });
        random = 'error';
      } else if (len === 0) {
        let newExcept = this.state.except;
        newExcept.push(random);
        this.setState({ except: newExcept });
        count++;
        len = this.state.except.length;
      } else if (len < max) {
        // Checking if num has already been chosen
        let found = this.findInArray(except, random);
        if (!found) {
          let newExcept = this.state.except;
          newExcept.push(random);
          this.setState({ except: newExcept });
          count++;
          len = this.state.except.length;
        }
      }
      num = random;
    } while (count < max);
    const returnArray = this.state.except;
    const clear = [];
    this.setState({ except: clear }, function() {
      return num;
    });
    return returnArray;
  }

  genRandomSong(min, max) {
    let num = 0;

      let except = this.state.exceptSongs;
      let random = Math.floor(Math.random() * (max - min + 1)) + min;
      let len = this.state.exceptSongs.length;
      // Checking the array isn't full already - clear and send error msg if it is
      if (len === max) {
        const clear = [];
        this.setState({ exceptSongs: clear });
        random = 'error';
      } else if (len === 0) {
        let newExcept = this.state.exceptSongs;
        newExcept.push(random);
        this.setState({ exceptSongs: newExcept });
        len = this.state.exceptSongs.length;
      } else if (len < max) {
        // Checking if num has already been chosen
        let found = this.findInArray(except, random);
        if (!found) {
          let newExcept = this.state.exceptSongs;
          newExcept.push(random);
          this.setState({ exceptSongs: newExcept });
          len = this.state.exceptSongs.length;
        }

      }
      num = random;
    return num;
  }

  genRandomArtist(min, max) {
    let num = 0;

    let except = this.state.exceptArtists;
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    let len = this.state.exceptArtists.length;
    // Checking the array isn't full already - clear and send error msg if it is
    if (len === max) {
      const clear = [];
      this.setState({ exceptArtists: clear });
      random = 'error';
    } else if (len === 0) {
      let newExcept = this.state.exceptArtists;
      newExcept.push(random);
      this.setState({ exceptArtists: newExcept });
      len = this.state.exceptArtists.length;
    } else if (len < max) {
      // Checking if num has already been chosen
      let found = this.findInArray(except, random);
      if (!found) {
        let newExcept = this.state.exceptArtists;
        newExcept.push(random);
        this.setState({ exceptArtists: newExcept });
        len = this.state.exceptArtists.length;
      }
    }
    num = random;
    return num;
  }

  findInArray(arr, el) {
    let match = arr.find(random => {
      return random === el;
    });
    return match;
  }

  renderCards() {
    const tooltip = (
      <Tooltip id="tooltip">
        <strong>Select the artist singing the current song</strong>
      </Tooltip>
    )
    if (this.state.tiles.length > 0) {
      return this.state.tiles.map((tile, index) => {
        if (tile[0].correct === 0) {
          return (
            <div
              className="item"
              key={tile[0].id}>
                <FlexyFlipCard
                    frontBackgroundColor="#000"
                    backBackgroundColor="#d8410a"
                >
                  <div ref="flipper">
                    <h3 className="page-header"
                      style={{marginTop: 46, fontSize: 26}}>
                      {tile[0].song}
                    </h3>
                    <Button className="btn btn-primary"
                      style={{fontSize: 15}}>
                      Song is playing!
                    </Button>
                    <h2
                      style={{marginTop: 46}}>{tile[0].message}</h2>
                  </div>

                  <div className="RadioGroup"
                  style={{fontSize: 13, color: "white", textAlign: "left", padding: 3}}>
                    <Radio
                        name={`${index}`}
                        value={'artist_1' + tile[0].artist_1}
                        onChange={(e) => this.handleOnChange(e)}
                        selected={tile[0].artist_1_selected}
                      >
                      {tile[0].artist_1}
                      </Radio>
                      <Radio name={`${index}`}
                        value={'artist_2' + tile[0].artist_2}
                        onChange={(e) => this.handleOnChange(e)}
                        selected={tile[0].artist_2_selected}
                      >
                      {tile[0].artist_2}
                      </Radio>
                      <Radio name={`${index}`}
                        value={'artist_3' + tile[0].artist_3}
                        onChange={(e) => this.handleOnChange(e)}
                        selected={tile[0].artist_3_selected}
                      >
                      {tile[0].artist_3}
                      </Radio>
                      <div ref="flipper" style={{alignItems: "center"}}>
                      <OverlayTrigger placement="right" overlay={tooltip}>


                      <Button className="btn btn-primary"
                          onClick={this.submitArtist}>
                          Submit artist
                        </Button>
                        </OverlayTrigger>
                      </div>
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
    const { isAuthenticated } = this.props.auth;

    if (!this.state.tiles && isAuthenticated) {
      return (
        <div className="Landing">
          Please wait a moment as we build your card...
        </div>
      )
    }

    const { profile } = this.state;
    return (
      <div>
        {
          isAuthenticated() && (
            <div className="Landing">
              <h2>{profile.nickname + String.fromCharCode(39)}s Radio Bingo Board</h2>
              <h2>You have {this.state.completed} tiles completed</h2>

              <div className="col-xs-5 col-sm-12 col-md-9">

                <div className="item-list">
                  {this.renderCards()}
                </div>

              </div>

            </div>
          )
        }
      </div>
    )
  }
}

export default Card;
