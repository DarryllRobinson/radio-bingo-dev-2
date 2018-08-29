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

tilesRouter.put('/:tileId/artist', (req, res, next) => {
  //console.log('/:tileId/artist');
  /*console.log('req.body.tile: ', req.body.tile);
    console.log('req.body.tile.artist_1_selected: ', req.body.tile.artist_1_selected);
  req.body.tile[0].map(el => {
    console.log('el: ', el);
  });*/
  const tile_id = req.body.tile.id,
        artist_1_selected = req.body.tile.artist_1_selected,
        artist_2_selected = req.body.tile.artist_2_selected,
        artist_3_selected = req.body.tile.artist_3_selected,
        submitted = req.body.tile.submitted,
        submitted_artist = req.body.tile.submitted_artist,
        submitted_time = req.body.tile.submitted_time;
  if (!submitted || !submitted_artist || !submitted_time) {
    return res.sendStatus(400);
  }

  const sql = 'UPDATE tile SET artist_1_selected = $artist_1_selected, ' +
    'artist_2_selected = $artist_2_selected, artist_3_selected = $artist_3_selected, ' +
    'submitted = $submitted, submitted_artist = $submitted_artist, submitted_time = $submitted_time ' +
    'WHERE id = $tile_id';
  const values = {
    $tile_id: tile_id,
    $artist_1_selected: artist_1_selected,
    $artist_2_selected: artist_2_selected,
    $artist_3_selected: artist_3_selected,
    $submitted: submitted,
    $submitted_artist: submitted_artist,
    $submitted_time: submitted_time
  };

  db.run(sql, values, function(error) {
    if (error) {
      //console.log('broke');
      next(error);
    } else {
      //console.log(`${tile_id}`);
      db.get(`SELECT * FROM tile WHERE tile.id = ${tile_id}`,
        (error, tile) => {
          res.status(201).json({tile: tile});
        });
    }
  });
});

tilesRouter.put('/:tileId/correct', (req, res, next) => {
  //console.log('/:tileId/correct');
  /*console.log('req.body.tile: ', req.body.tile);
    console.log('req.body.tile.artist_1_selected: ', req.body.tile.artist_1_selected);
  req.body.tile[0].map(el => {
    console.log('el: ', el);
  });*/
  const tile_id = req.body.tile.id
        correct = req.body.tile.correct;
  if (!tile_id || !correct) {
    return res.sendStatus(400);
  }

  const sql = 'UPDATE tile SET correct = $correct ' +
    'WHERE id = $tile_id';
  const values = {
    $tile_id: tile_id,
    $correct: correct
  };

  db.run(sql, values, function(error) {
    if (error) {
      //console.log('broke');
      next(error);
    } else {
      //console.log(`${tile_id}`);
      db.get(`SELECT * FROM tile WHERE tile.id = ${tile_id}`,
        (error, tile) => {
          res.status(201).json({tile: tile});
        });
    }
  });
});

tilesRouter.put('/:tileId/wrong', (req, res, next) => {
  //console.log('/:tileId/correct');
  /*console.log('req.body.tile: ', req.body.tile);
    console.log('req.body.tile.artist_1_selected: ', req.body.tile.artist_1_selected);
  req.body.tile[0].map(el => {
    console.log('el: ', el);
  });*/
  const tile_id = req.body.tile.id
        message = req.body.tile.message;
  if (!tile_id || !message) {
    return res.sendStatus(400);
  }

  const sql = 'UPDATE tile SET message = $message ' +
    'WHERE id = $tile_id';
  const values = {
    $tile_id: tile_id,
    $message: message
  };

  db.run(sql, values, function(error) {
    if (error) {
      //console.log('broke');
      next(error);
    } else {
      //console.log(`${tile_id}`);
      db.get(`SELECT * FROM tile WHERE tile.id = ${tile_id}`,
        (error, tile) => {
          res.status(201).json({tile: tile});
        });
    }
  });
});

tilesRouter.put('/reset', (req, res, next) => {
  //console.log('req.body.user: ', req.body.user);
  /*const user_id = req.body.user.userId;

  if (!user_id) {
    return res.sendStatus(400);
  };*/

  const sql = 'DELETE FROM tile';

  db.run(sql, (error) => {
    if (error) {
      console.log('broke here');
      next(error);
    } else {
      //console.log(`SELECT * FROM user WHERE user_id = '${user_id}'`);
      db.get(`SELECT * FROM tile'`,
        (error, tile) => {
          res.status(200).json({ tile: tile });
        });
    }
  });
});

module.exports = tilesRouter;
