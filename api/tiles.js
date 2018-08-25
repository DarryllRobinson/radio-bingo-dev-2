const express = require('express');
const tilesRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

tilesRouter.param('cardId', (req, res, next, cardId) => {
  const sql = 'SELECT * FROM tile WHERE card_id = $cardId';
  const values = {$cardId: cardId};
  db.all(sql, values, (error, tile) => {
    if (error) {
      next(error);
    } else if (tile) {
      req.tile = tile;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

tilesRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM tile',
    (err, tiles) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({tiles: tiles});
      }
    });
});

tilesRouter.get('/:cardId', (req, res, next) => {
  res.status(200).json({tile: req.tile});
});

tilesRouter.post('/', (req, res, next) => {
  const song = req.body.tile.song,
        artist_1 = req.body.tile.artist_1,
        artist_1_selected = req.body.tile.artist_1_selected,
        artist_2 = req.body.tile.artist_2,
        artist_2_selected = req.body.tile.artist_2_selected,
        artist_3 = req.body.tile.artist_3,
        artist_3_selected = req.body.tile.artist_3_selected,
        submitted = req.body.tile.submitted,
        submitted_artist = req.body.tile.submitted_artist,
        submitted_time = req.body.tile.submitted_time,
        correct = req.body.tile.correct,
        card_id = req.body.tile.card_id;
  if (!song || !artist_1 || !artist_2 || !artist_3 || !card_id) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO tile (song, artist_1, artist_1_selected, artist_2, artist_2_selected, artist_3, artist_3_selected, card_id)' +
      'VALUES ($song, $artist_1, $artist_1_selected, $artist_2, $artist_2_selected,  $artist_3, $artist_3_selected, $card_id)';
  const values = {
    $song: song,
    $artist_1: artist_1,
    $$artist_1_selected: artist_1_selected,
    $artist_2: artist_2,
    $artist_2_selected: artist_2_selected,
    $artist_3: artist_3,
    $artist_3_selected: artist_3_selected,
    $card_id: card_id
  };

  db.run(sql, values, function(error) {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM tile WHERE tile.id = ${this.lastID}`,
        (error, tile) => {
          res.status(201).json({tile: tile});
        });
    }
  });
});

/*tilesRouter.push('/:tileId', (req, res, next) => {
  const artist_1 = req.body.tile.artist_1,
        artist_2 = req.body.tile.artist_2,
        artist_3 = req.body.tile.artist_3,
        submitted = req.body.tile.submitted,
        submitted_artist = req.body.tile.submitted_artist,
        submitted_time = req.body.tile.submitted_time,
        correct = req.body.tile.correct,
        card_id = req.body.tile.card_id;
  if (!song || !artist_1 || !artist_2 || !artist_3 || !card_id) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO tile (song, artist_1, artist_2, artist_3, card_id)' +
      'VALUES ($song, $artist_1, $artist_2,  $artist_3,  $card_id)';
  const values = {
    $song: song,
    $artist_1: artist_1,
    $artist_2: artist_2,
    $artist_3: artist_3,
    $card_id: card_id
  };

  db.run(sql, values, function(error) {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM tile WHERE tile.id = ${this.lastID}`,
        (error, tile) => {
          res.status(201).json({tile: tile});
        });
    }
  });
});*/

module.exports = tilesRouter;
