const express = require('express');
const cardsRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

cardsRouter.param('cardId', (req, res, next, cardId) => {
  const sql = 'SELECT * FROM card WHERE card.id = $cardId';
  const values = {$cardId: cardId};
  db.get(sql, values, (error, card) => {
    if (error) {
      next(error);
    } else if (card) {
      req.card = card;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

cardsRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM card WHERE card.is_current_card = 1',
    (err, cards) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({cards: cards, count: cards.length});
      }
    });
});

cardsRouter.get('/:cardId', (req, res, next) => {
  res.status(200).json({card: req.card});
});

cardsRouter.post('/', (req, res, next) => {
  const name_0 = req.body.card.name_0,
        artist0_1 = req.body.card.artist0_1,
        artist0_2 = req.body.card.artist0_2,
        artist0_3 = req.body.card.artist0_3,
        submitted_0 = req.body.card.submitted_0,
        submitted_time_0 = req.body.card.submitted_time_0,
        selected_artist_0 = req.body.card.selected_artist_0,
        correct_0 = req.body.card.correct_0,
        name_1 = req.body.card.name_1,
        artist1_1 = req.body.card.artist1_1,
        artist1_2 = req.body.card.artist1_2,
        artist1_3 = req.body.card.artist1_3,
        submitted_1 = req.body.card.submitted_1,
        submitted_time_1 = req.body.card.submitted_time_1,
        selected_artist_1 = req.body.card.selected_artist_1,
        correct_1 = req.body.card.correct_1,
        name_2 = req.body.card.name_2,
        artist2_1 = req.body.card.artist2_1,
        artist2_2 = req.body.card.artist2_2,
        artist2_3 = req.body.card.artist2_3,
        submitted_2 = req.body.card.submitted_2,
        submitted_time_2 = req.body.card.submitted_time_2,
        selected_artist_2 = req.body.card.selected_artist_2,
        correct_2 = req.body.card.correct_2,
        name_3 = req.body.card.name_3,
        artist3_1 = req.body.card.artist3_1,
        artist3_2 = req.body.card.artist3_2,
        artist3_3 = req.body.card.artist3_3,
        submitted_3 = req.body.card.submitted_3,
        submitted_time_3 = req.body.card.submitted_time_3,
        selected_artist_3 = req.body.card.selected_artist_3,
        correct_3 = req.body.card.correct_3,
        name_4 = req.body.card.name_4,
        artist4_1 = req.body.card.artist4_1,
        artist4_2 = req.body.card.artist4_2,
        artist4_3 = req.body.card.artist4_3,
        submitted_4 = req.body.card.submitted_4,
        submitted_time_4 = req.body.card.submitted_time_4,
        selected_artist_4 = req.body.card.selected_artist_4,
        correct_4 = req.body.card.correct_4,
        name_5 = req.body.card.name_5,
        artist5_1 = req.body.card.artist5_1,
        artist5_2 = req.body.card.artist5_2,
        artist5_3 = req.body.card.artist5_3,
        submitted_5 = req.body.card.submitted_5,
        submitted_time_5 = req.body.card.submitted_time_5,
        selected_artist_5 = req.body.card.selected_artist_5,
        correct_5 = req.body.card.correct_5,
        name_6 = req.body.card.name_6,
        artist6_1 = req.body.card.artist6_1,
        artist6_2 = req.body.card.artist6_2,
        artist6_3 = req.body.card.artist6_3,
        submitted_6 = req.body.card.submitted_6,
        submitted_time_6 = req.body.card.submitted_time_6,
        selected_artist_6 = req.body.card.selected_artist_6,
        correct_6 = req.body.card.correct_6,
        name_7 = req.body.card.name_7,
        artist7_1 = req.body.card.artist7_1,
        artist7_2 = req.body.card.artist7_2,
        artist7_3 = req.body.card.artist7_3,
        submitted_7 = req.body.card.submitted_7,
        submitted_time_7 = req.body.card.submitted_time_7,
        selected_artist_7 = req.body.card.selected_artist_7,
        correct_7 = req.body.card.correct_7,
        name_8 = req.body.card.name_8,
        artist8_1 = req.body.card.artist8_1,
        artist8_2 = req.body.card.artist8_2,
        artist8_3 = req.body.card.artist8_3,
        submitted_8 = req.body.card.submitted_8,
        submitted_time_8 = req.body.card.submitted_time_8,
        selected_artist_8 = req.body.card.selected_artist_8,
        correct_8 = req.body.card.correct_8,
        name_9 = req.body.card.name_9,
        artist9_1 = req.body.card.artist9_1,
        artist9_2 = req.body.card.artist9_2,
        artist9_3 = req.body.card.artist9_3,
        submitted_9 = req.body.card.submitted_9,
        submitted_time_9 = req.body.card.submitted_time_9,
        selected_artist_9 = req.body.card.selected_artist_9,
        correct_9 = req.body.card.correct_9,
        name_10 = req.body.card.name_10,
        artist10_1 = req.body.card.artist10_1,
        artist10_2 = req.body.card.artist10_2,
        artist10_3 = req.body.card.artist10_3,
        submitted_10 = req.body.card.submitted_10,
        submitted_time_10 = req.body.card.submitted_time_10,
        selected_artist_10 = req.body.card.selected_artist_10,
        correct_10 = req.body.card.correct_10,
        name_11 = req.body.card.name_11,
        artist11_1 = req.body.card.artist11_1,
        artist11_2 = req.body.card.artist11_2,
        artist11_3 = req.body.card.artist11_3,
        submitted_11 = req.body.card.submitted_11,
        submitted_time_11 = req.body.card.submitted_time_11,
        selected_artist_11 = req.body.card.selected_artist_11,
        correct_11 = req.body.card.correct_11,
        name_12 = req.body.card.name_12,
        artist12_1 = req.body.card.artist12_1,
        artist12_2 = req.body.card.artist12_2,
        artist12_3 = req.body.card.artist12_3,
        submitted_12 = req.body.card.submitted_12,
        submitted_time_12 = req.body.card.submitted_time_12,
        selected_artist_12 = req.body.card.selected_artist_12,
        correct_12 = req.body.card.correct_12,
        name_13 = req.body.card.name_13,
        artist13_1 = req.body.card.artist13_1,
        artist13_2 = req.body.card.artist13_2,
        artist13_3 = req.body.card.artist13_3,
        submitted_13 = req.body.card.submitted_13,
        submitted_time_13 = req.body.card.submitted_time_13,
        selected_artist_13 = req.body.card.selected_artist_13,
        correct_13 = req.body.card.correct_13,
        name_14 = req.body.card.name_14,
        artist14_1 = req.body.card.artist14_1,
        artist14_2 = req.body.card.artist14_2,
        artist14_3 = req.body.card.artist14_3,
        submitted_14 = req.body.card.submitted_14,
        submitted_time_14 = req.body.card.submitted_time_14,
        selected_artist_14 = req.body.card.selected_artist_14,
        correct_14 = req.body.card.correct_14,
        name_15 = req.body.card.name_15,
        artist15_1 = req.body.card.artist15_1,
        artist15_2 = req.body.card.artist15_2,
        artist15_3 = req.body.card.artist15_3,
        submitted_15 = req.body.card.submitted_15,
        submitted_time_15 = req.body.card.submitted_time_15,
        selected_artist_15 = req.body.card.selected_artist_15,
        correct_15 = req.body.card.correct_15,
        isCurrentcard = req.body.card.isCurrentcard === 0 ? 0 : 1;
  if (!name_0 || !artist0_1 || !artist0_2 || !artist0_3 || !submitted_0 || !selected_artist_0 || !correct_0 || !submitted_0 || !submitted_time_0 || !correct_0
    ||!name_1 || !artist1_1 || !artist1_2 || !artist1_3 || !submitted_1 || !selected_artist_1 || !correct_1 || !submitted_1 || !submitted_time_1 || !correct_1
    ||!name_2 || !artist2_1 || !artist2_2 || !artist2_3 || !submitted_2 || !selected_artist_2 || !correct_2 || !submitted_2 || !submitted_time_2 || !correct_2
    ||!name_3 || !artist3_1 || !artist3_2 || !artist3_3 || !submitted_3 || !selected_artist_3 || !correct_3 || !submitted_3 || !submitted_time_3 || !correct_3
    ||!name_4 || !artist4_1 || !artist4_2 || !artist4_3 || !submitted_4 || !selected_artist_4 || !correct_4 || !submitted_4 || !submitted_time_4 || !correct_4
    ||!name_5 || !artist5_1 || !artist5_2 || !artist5_3 || !submitted_5 || !selected_artist_5 || !correct_5 || !submitted_5 || !submitted_time_5 || !correct_5
    ||!name_6 || !artist6_1 || !artist6_2 || !artist6_3 || !submitted_6 || !selected_artist_6 || !correct_6 || !submitted_6 || !submitted_time_6 || !correct_6
    ||!name_7 || !artist7_1 || !artist7_2 || !artist7_3 || !submitted_7 || !selected_artist_7 || !correct_7 || !submitted_7 || !submitted_time_7 || !correct_7
    ||!name_8 || !artist8_1 || !artist8_2 || !artist8_3 || !submitted_8 || !selected_artist_8 || !correct_8 || !submitted_8 || !submitted_time_8 || !correct_8
    ||!name_9 || !artist9_1 || !artist9_2 || !artist9_3 || !submitted_9 || !selected_artist_9 || !correct_9 || !submitted_9 || !submitted_time_9 || !correct_9
    ||!name_10 || !artist10_1 || !artist10_2 || !artist10_3 || !submitted_10 || !selected_artist_10 || !correct_10 || !submitted_10 || !submitted_time_10 || !correct_10
    ||!name_11 || !artist11_1 || !artist11_2 || !artist11_3 || !submitted_11 || !selected_artist_11 || !correct_11 || !submitted_11 || !submitted_time_11 || !correct_11
    ||!name_12 || !artist12_1 || !artist12_2 || !artist12_3 || !submitted_12 || !selected_artist_12 || !correct_12 || !submitted_12 || !submitted_time_12 || !correct_12
    ||!name_13 || !artist13_1 || !artist13_2 || !artist13_3 || !submitted_13 || !selected_artist_13 || !correct_13 || !submitted_13 || !submitted_time_13 || !correct_13
    ||!name_14 || !artist14_1 || !artist14_2 || !artist14_3 || !submitted_14 || !selected_artist_14 || !correct_14 || !submitted_14 || !submitted_time_14 || !correct_14
    ||!name_15 || !artist15_1 || !artist15_2 || !artist15_3 || !submitted_15 || !selected_artist_15 || !correct_15 || !submitted_15 || !submitted_time_15 || !correct_15) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO card (name_0, artist0_1, artist0_2, artist0_3, ' +
    'submitted_0, submitted_time_0, selected_artist_0, correct_0, ' +
    '(name_1, artist1_1, artist1_2, artist1_3, ' +
    'submitted_1, submitted_time_1, selected_artist_1, correct_1, ' +
    '(name_2, artist2_1, artist2_2, artist2_3, ' +
    'submitted_2, submitted_time_2, selected_artist_2, correct_2, ' +
    '(name_3, artist3_1, artist3_2, artist3_3, ' +
    'submitted_3, submitted_time_3, selected_artist_3, correct_3, ' +
    '(name_4, artist4_1, artist4_2, artist4_3, ' +
    'submitted_4, submitted_time_4, selected_artist_4, correct_4, ' +
    '(name_5, artist5_1, artist5_2, artist5_3, ' +
    'submitted_5, submitted_time_5, selected_artist_5, correct_5, ' +
    '(name_6, artist6_1, artist6_2, artist6_3, ' +
    'submitted_6, submitted_time_6, selected_artist_6, correct_6, ' +
    '(name_7, artist7_1, artist7_2, artist7_3, ' +
    'submitted_7, submitted_time_7, selected_artist_7, correct_7, ' +
    '(name_8, artist8_1, artist8_2, artist8_3, ' +
    'submitted_8, submitted_time_8, selected_artist_8, correct_8, ' +
    '(name_9, artist9_1, artist9_2, artist9_3, ' +
    'submitted_9, submitted_time_9, selected_artist_9, correct_9, ' +
    '(name_10, artist10_1, artist10_2, artist10_3, ' +
    'submitted_10, submitted_time_10, selected_artist_10, correct_10, ' +
    '(name_11, artist11_1, artist11_2, artist11_3, ' +
    'submitted_11, submitted_time_11, selected_artist_11, correct_11, ' +
    '(name_12, artist12_1, artist12_2, artist12_3, ' +
    'submitted_12, submitted_time_12, selected_artist_12, correct_12, ' +
    '(name_13, artist13_1, artist13_2, artist13_3, ' +
    'submitted_13, submitted_time_13, selected_artist_13, correct_13, ' +
    '(name_14, artist14_1, artist14_2, artist14_3, ' +
    'submitted_14, submitted_time_14, selected_artist_14, correct_14, ' +
    '(name_15, artist15_1, artist15_2, artist15_3, ' +
    'submitted_15, submitted_time_15, selected_artist_15, correct_15, ' +
    'is_current_card)' +
      'VALUES ($name_0, $artist0_1, $artist0_2, $artist0_3, ' +
      '$submitted_0, $submitted_time_0, $selected_artist_0, $correct_0, ' +
      '$name_1, $artist1_1, $artist1_2, $artist1_3, ' +
      '$submitted_1, $submitted_time_1, $selected_artist_1, $correct_1, ' +
      '$name_2, $artist2_1, $artist2_2, $artist2_3, ' +
      '$submitted_2, $submitted_time_2, $selected_artist_2, $correct_2, ' +
      '$name_3, $artist3_1, $artist3_2, $artist3_3, ' +
      '$submitted_3, $submitted_time_3, $selected_artist_3, $correct_3, ' +
      '$name_4, $artist4_1, $artist4_2, $artist4_3, ' +
      '$submitted_4, $submitted_time_4, $selected_artist_4, $correct_4, ' +
      '$name_5, $artist5_1, $artist5_2, $artist5_3, ' +
      '$submitted_5, $submitted_time_5, $selected_artist_5, $correct_5, ' +
      '$name_6, $artist6_1, $artist6_2, $artist6_3, ' +
      '$submitted_6, $submitted_time_6, $selected_artist_6, $correct_6, ' +
      '$name_7, $artist7_1, $artist7_2, $artist7_3, ' +
      '$submitted_7, $submitted_time_7, $selected_artist_7, $correct_7, ' +
      '$name_8, $artist8_1, $artist8_2, $artist8_3, ' +
      '$submitted_8, $submitted_time_8, $selected_artist_8, $correct_8, ' +
      '$name_9, $artist9_1, $artist9_2, $artist9_3, ' +
      '$submitted_9, $submitted_time_9, $selected_artist_9, $correct_9, ' +
      '$name_10, $artist10_1, $artist10_2, $artist10_3, ' +
      '$submitted_10, $submitted_time_10, $selected_artist_10, $correct_10, ' +
      '$name_11, $artist11_1, $artist11_2, $artist11_3, ' +
      '$submitted_11, $submitted_time_11, $selected_artist_11, $correct_11, ' +
      '$name_12, $artist12_1, $artist12_2, $artist12_3, ' +
      '$submitted_12, $submitted_time_12, $selected_artist_12, $correct_12, ' +
      '$name_13, $artist13_1, $artist13_2, $artist13_3, ' +
      '$submitted_13, $submitted_time_13, $selected_artist_13, $correct_13, ' +
      '$name_14, $artist14_1, $artist14_2, $artist14_3, ' +
      '$submitted_14, $submitted_time_14, $selected_artist_14, $correct_14, ' +
      '$name_15, $artist15_1, $artist15_2, $artist15_3, ' +
      '$submitted_15, $submitted_time_15, $selected_artist_15, $correct_15, ' +
      '$isCurrentcard)';
  const values = {
    $name_0: name_0,
    $artist0_1: artist0_1,
    $artist0_2: artist0_2,
    $artist0_3: artist0_3,
    $submitted_0: submitted_0,
    $submitted_time_0: submitted_time_0,
    $selected_artist_0: selected_artist_0,
    $correct_0: correct_0,
    $name_1: name_1,
    $artist1_1: artist1_1,
    $artist1_2: artist1_2,
    $artist1_3: artist1_3,
    $submitted_1: submitted_1,
    $submitted_time_0: submitted_time_1,
    $selected_artist_1: selected_artist_1,
    $correct_1: correct_1,
    $name_2: name_2,
    $artist2_1: artist2_1,
    $artist2_2: artist2_2,
    $artist2_3: artist2_3,
    $submitted_2: submitted_2,
    $submitted_time_0: submitted_time_2,
    $selected_artist_2: selected_artist_2,
    $correct_2: correct_2,
    $name_3: name_3,
    $artist3_1: artist3_1,
    $artist3_2: artist3_2,
    $artist3_3: artist3_3,
    $submitted_3: submitted_3,
    $submitted_time_0: submitted_time_3,
    $selected_artist_3: selected_artist_3,
    $correct_3: correct_3,
    $name_4: name_4,
    $artist4_1: artist4_1,
    $artist4_2: artist4_2,
    $artist4_3: artist4_3,
    $submitted_4: submitted_4,
    $submitted_time_0: submitted_time_4,
    $selected_artist_4: selected_artist_4,
    $correct_4: correct_4,
    $name_5: name_5,
    $artist5_1: artist5_1,
    $artist5_2: artist5_2,
    $artist5_3: artist5_3,
    $submitted_5: submitted_5,
    $submitted_time_0: submitted_time_5,
    $selected_artist_5: selected_artist_5,
    $correct_5: correct_5,
    $name_6: name_6,
    $artist6_1: artist6_1,
    $artist6_2: artist6_2,
    $artist6_3: artist6_3,
    $submitted_6: submitted_6,
    $submitted_time_0: submitted_time_6,
    $selected_artist_6: selected_artist_6,
    $correct_6: correct_6,
    $name_7: name_7,
    $artist7_1: artist7_1,
    $artist7_2: artist7_2,
    $artist7_3: artist7_3,
    $submitted_7: submitted_7,
    $submitted_time_0: submitted_time_7,
    $selected_artist_7: selected_artist_7,
    $correct_7: correct_7,
    $name_8: name_8,
    $artist8_1: artist8_1,
    $artist8_2: artist8_2,
    $artist8_3: artist8_3,
    $submitted_8: submitted_8,
    $submitted_time_0: submitted_time_8,
    $selected_artist_8: selected_artist_8,
    $correct_8: correct_8,
    $name_9: name_9,
    $artist9_1: artist9_1,
    $artist9_2: artist9_2,
    $artist9_3: artist9_3,
    $submitted_9: submitted_9,
    $submitted_time_0: submitted_time_9,
    $selected_artist_9: selected_artist_9,
    $correct_9: correct_9,
    $name_10: name_10,
    $artist10_1: artist10_1,
    $artist10_2: artist10_2,
    $artist10_3: artist10_3,
    $submitted_10: submitted_10,
    $submitted_time_0: submitted_time_10,
    $selected_artist_10: selected_artist_10,
    $correct_10: correct_10,
    $name_11: name_11,
    $artist11_1: artist11_1,
    $artis11_2: artis11_2,
    $artist11_3: artist11_3,
    $submitted_11: submitted_11,
    $submitted_time_0: submitted_time_11,
    $selected_artist_11: selected_artist_11,
    $correct_11: correct_11,
    $name_12: name_12,
    $artist12_1: artist12_1,
    $artist12_2: artist12_2,
    $artist12_3: artist12_3,
    $submitted_12: submitted_12,
    $submitted_time_0: submitted_time_12,
    $selected_artist_12: selected_artist_12,
    $correct_12: correct_12,
    $name_13: name_13,
    $artist13_1: artist13_1,
    $artist13_2: artist13_2,
    $artist13_3: artist13_3,
    $submitted_13: submitted_13,
    $submitted_time_0: submitted_time_13,
    $selected_artist_13: selected_artist_13,
    $correct_13: correct_13,
    $name_14: name_14,
    $artist14_1: artist14_1,
    $artist14_2: artist14_2,
    $artist14_3: artist14_3,
    $submitted_14: submitted_14,
    $submitted_time_0: submitted_time_14,
    $selected_artist_14: selected_artist_14,
    $correct_14: correct_14,
    $name_15: name_15,
    $artist15_1: artist15_1,
    $artist15_2: artist15_2,
    $artist15_3: artist15_3,
    $submitted_15: submitted_15,
    $submitted_time_0: submitted_time_15,
    $selected_artist_15: selected_artist_15,
    $correct_15: correct_15,
    $isCurrentcard: isCurrentcard
  };

  db.run(sql, values, function(error) {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM card WHERE card.id = ${this.lastID}`,
        (error, card) => {
          res.status(201).json({card: card});
        });
    }
  });
});

cardsRouter.put('/:cardId', (req, res, next) => {
  const name_0 = req.body.card.name_0,
        artist0_1 = req.body.card.artist0_1,
        artist0_2 = req.body.card.artist0_2,
        artist0_3 = req.body.card.artist0_3,
        submitted_0 = req.body.card.submitted_0,
        submitted_time_0 = req.body.card.submitted_time_0,
        selected_artist_0 = req.body.card.selected_artist_0,
        correct_0 = req.body.card.correct_0,
        name_1 = req.body.card.name_1,
        artist1_1 = req.body.card.artist1_1,
        artist1_2 = req.body.card.artist1_2,
        artist1_3 = req.body.card.artist1_3,
        submitted_1 = req.body.card.submitted_1,
        submitted_time_1 = req.body.card.submitted_time_1,
        selected_artist_1 = req.body.card.selected_artist_1,
        correct_1 = req.body.card.correct_1,
        name_2 = req.body.card.name_2,
        artist2_1 = req.body.card.artist2_1,
        artist2_2 = req.body.card.artist2_2,
        artist2_3 = req.body.card.artist2_3,
        submitted_2 = req.body.card.submitted_2,
        submitted_time_2 = req.body.card.submitted_time_2,
        selected_artist_2 = req.body.card.selected_artist_2,
        correct_2 = req.body.card.correct_2,
        name_3 = req.body.card.name_3,
        artist3_1 = req.body.card.artist3_1,
        artist3_2 = req.body.card.artist3_2,
        artist3_3 = req.body.card.artist3_3,
        submitted_3 = req.body.card.submitted_3,
        submitted_time_3 = req.body.card.submitted_time_3,
        selected_artist_3 = req.body.card.selected_artist_3,
        correct_3 = req.body.card.correct_3,
        name_4 = req.body.card.name_4,
        artist4_1 = req.body.card.artist4_1,
        artist4_2 = req.body.card.artist4_2,
        artist4_3 = req.body.card.artist4_3,
        submitted_4 = req.body.card.submitted_4,
        submitted_time_4 = req.body.card.submitted_time_4,
        selected_artist_4 = req.body.card.selected_artist_4,
        correct_4 = req.body.card.correct_4,
        name_5 = req.body.card.name_5,
        artist5_1 = req.body.card.artist5_1,
        artist5_2 = req.body.card.artist5_2,
        artist5_3 = req.body.card.artist5_3,
        submitted_5 = req.body.card.submitted_5,
        submitted_time_5 = req.body.card.submitted_time_5,
        selected_artist_5 = req.body.card.selected_artist_5,
        correct_5 = req.body.card.correct_5,
        name_6 = req.body.card.name_6,
        artist6_1 = req.body.card.artist6_1,
        artist6_2 = req.body.card.artist6_2,
        artist6_3 = req.body.card.artist6_3,
        submitted_6 = req.body.card.submitted_6,
        submitted_time_6 = req.body.card.submitted_time_6,
        selected_artist_6 = req.body.card.selected_artist_6,
        correct_6 = req.body.card.correct_6,
        name_7 = req.body.card.name_7,
        artist7_1 = req.body.card.artist7_1,
        artist7_2 = req.body.card.artist7_2,
        artist7_3 = req.body.card.artist7_3,
        submitted_7 = req.body.card.submitted_7,
        submitted_time_7 = req.body.card.submitted_time_7,
        selected_artist_7 = req.body.card.selected_artist_7,
        correct_7 = req.body.card.correct_7,
        name_8 = req.body.card.name_8,
        artist8_1 = req.body.card.artist8_1,
        artist8_2 = req.body.card.artist8_2,
        artist8_3 = req.body.card.artist8_3,
        submitted_8 = req.body.card.submitted_8,
        submitted_time_8 = req.body.card.submitted_time_8,
        selected_artist_8 = req.body.card.selected_artist_8,
        correct_8 = req.body.card.correct_8,
        name_9 = req.body.card.name_9,
        artist9_1 = req.body.card.artist9_1,
        artist9_2 = req.body.card.artist9_2,
        artist9_3 = req.body.card.artist9_3,
        submitted_9 = req.body.card.submitted_9,
        submitted_time_9 = req.body.card.submitted_time_9,
        selected_artist_9 = req.body.card.selected_artist_9,
        correct_9 = req.body.card.correct_9,
        name_10 = req.body.card.name_10,
        artist10_1 = req.body.card.artist10_1,
        artist10_2 = req.body.card.artist10_2,
        artist10_3 = req.body.card.artist10_3,
        submitted_10 = req.body.card.submitted_10,
        submitted_time_10 = req.body.card.submitted_time_10,
        selected_artist_10 = req.body.card.selected_artist_10,
        correct_10 = req.body.card.correct_10,
        name_11 = req.body.card.name_11,
        artist11_1 = req.body.card.artist11_1,
        artist11_2 = req.body.card.artist11_2,
        artist11_3 = req.body.card.artist11_3,
        submitted_11 = req.body.card.submitted_11,
        submitted_time_11 = req.body.card.submitted_time_11,
        selected_artist_11 = req.body.card.selected_artist_11,
        correct_11 = req.body.card.correct_11,
        name_12 = req.body.card.name_12,
        artist12_1 = req.body.card.artist12_1,
        artist12_2 = req.body.card.artist12_2,
        artist12_3 = req.body.card.artist12_3,
        submitted_12 = req.body.card.submitted_12,
        submitted_time_12 = req.body.card.submitted_time_12,
        selected_artist_12 = req.body.card.selected_artist_12,
        correct_12 = req.body.card.correct_12,
        name_13 = req.body.card.name_13,
        artist13_1 = req.body.card.artist13_1,
        artist13_2 = req.body.card.artist13_2,
        artist13_3 = req.body.card.artist13_3,
        submitted_13 = req.body.card.submitted_13,
        submitted_time_13 = req.body.card.submitted_time_13,
        selected_artist_13 = req.body.card.selected_artist_13,
        correct_13 = req.body.card.correct_13,
        name_14 = req.body.card.name_14,
        artist14_1 = req.body.card.artist14_1,
        artist14_2 = req.body.card.artist14_2,
        artist14_3 = req.body.card.artist14_3,
        submitted_14 = req.body.card.submitted_14,
        submitted_time_14 = req.body.card.submitted_time_14,
        selected_artist_14 = req.body.card.selected_artist_14,
        correct_14 = req.body.card.correct_14,
        name_15 = req.body.card.name_15,
        artist15_1 = req.body.card.artist15_1,
        artist15_2 = req.body.card.artist15_2,
        artist15_3 = req.body.card.artist15_3,
        submitted_15 = req.body.card.submitted_15,
        submitted_time_15 = req.body.card.submitted_time_15,
        selected_artist_15 = req.body.card.selected_artist_15,
        correct_15 = req.body.card.correct_15,
        isCurrentcard = req.body.card.isCurrentcard === 0 ? 0 : 1;
  if (!name_0 || !artist0_1 || !artist0_2 || !artist0_3 || !submitted_0 || !selected_artist_0 || !correct_0 || !submitted_0 || !submitted_time_0 || !correct_0
    ||!name_1 || !artist1_1 || !artist1_2 || !artist1_3 || !submitted_1 || !selected_artist_1 || !correct_1 || !submitted_1 || !submitted_time_1 || !correct_1
    ||!name_2 || !artist2_1 || !artist2_2 || !artist2_3 || !submitted_2 || !selected_artist_2 || !correct_2 || !submitted_2 || !submitted_time_2 || !correct_2
    ||!name_3 || !artist3_1 || !artist3_2 || !artist3_3 || !submitted_3 || !selected_artist_3 || !correct_3 || !submitted_3 || !submitted_time_3 || !correct_3
    ||!name_4 || !artist4_1 || !artist4_2 || !artist4_3 || !submitted_4 || !selected_artist_4 || !correct_4 || !submitted_4 || !submitted_time_4 || !correct_4
    ||!name_5 || !artist5_1 || !artist5_2 || !artist5_3 || !submitted_5 || !selected_artist_5 || !correct_5 || !submitted_5 || !submitted_time_5 || !correct_5
    ||!name_6 || !artist6_1 || !artist6_2 || !artist6_3 || !submitted_6 || !selected_artist_6 || !correct_6 || !submitted_6 || !submitted_time_6 || !correct_6
    ||!name_7 || !artist7_1 || !artist7_2 || !artist7_3 || !submitted_7 || !selected_artist_7 || !correct_7 || !submitted_7 || !submitted_time_7 || !correct_7
    ||!name_8 || !artist8_1 || !artist8_2 || !artist8_3 || !submitted_8 || !selected_artist_8 || !correct_8 || !submitted_8 || !submitted_time_8 || !correct_8
    ||!name_9 || !artist9_1 || !artist9_2 || !artist9_3 || !submitted_9 || !selected_artist_9 || !correct_9 || !submitted_9 || !submitted_time_9 || !correct_9
    ||!name_10 || !artist10_1 || !artist10_2 || !artist10_3 || !submitted_10 || !selected_artist_10 || !correct_10 || !submitted_10 || !submitted_time_10 || !correct_10
    ||!name_11 || !artist11_1 || !artist11_2 || !artist11_3 || !submitted_11 || !selected_artist_11 || !correct_11 || !submitted_11 || !submitted_time_11 || !correct_11
    ||!name_12 || !artist12_1 || !artist12_2 || !artist12_3 || !submitted_12 || !selected_artist_12 || !correct_12 || !submitted_12 || !submitted_time_12 || !correct_12
    ||!name_13 || !artist13_1 || !artist13_2 || !artist13_3 || !submitted_13 || !selected_artist_13 || !correct_13 || !submitted_13 || !submitted_time_13 || !correct_13
    ||!name_14 || !artist14_1 || !artist14_2 || !artist14_3 || !submitted_14 || !selected_artist_14 || !correct_14 || !submitted_14 || !submitted_time_14 || !correct_14
    ||!name_15 || !artist15_1 || !artist15_2 || !artist15_3 || !submitted_15 || !selected_artist_15 || !correct_15 || !submitted_15 || !submitted_time_15 || !correct_15) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO card (name_0, artist0_1, artist0_2, artist0_3, ' +
    'submitted_0, submitted_time_0, selected_artist_0, correct_0, ' +
    '(name_1, artist1_1, artist1_2, artist1_3, ' +
    'submitted_1, submitted_time_1, selected_artist_1, correct_1, ' +
    '(name_2, artist2_1, artist2_2, artist2_3, ' +
    'submitted_2, submitted_time_2, selected_artist_2, correct_2, ' +
    '(name_3, artist3_1, artist3_2, artist3_3, ' +
    'submitted_3, submitted_time_3, selected_artist_3, correct_3, ' +
    '(name_4, artist4_1, artist4_2, artist4_3, ' +
    'submitted_4, submitted_time_4, selected_artist_4, correct_4, ' +
    '(name_5, artist5_1, artist5_2, artist5_3, ' +
    'submitted_5, submitted_time_5, selected_artist_5, correct_5, ' +
    '(name_6, artist6_1, artist6_2, artist6_3, ' +
    'submitted_6, submitted_time_6, selected_artist_6, correct_6, ' +
    '(name_7, artist7_1, artist7_2, artist7_3, ' +
    'submitted_7, submitted_time_7, selected_artist_7, correct_7, ' +
    '(name_8, artist8_1, artist8_2, artist8_3, ' +
    'submitted_8, submitted_time_8, selected_artist_8, correct_8, ' +
    '(name_9, artist9_1, artist9_2, artist9_3, ' +
    'submitted_9, submitted_time_9, selected_artist_9, correct_9, ' +
    '(name_10, artist10_1, artist10_2, artist10_3, ' +
    'submitted_10, submitted_time_10, selected_artist_10, correct_10, ' +
    '(name_11, artist11_1, artist11_2, artist11_3, ' +
    'submitted_11, submitted_time_11, selected_artist_11, correct_11, ' +
    '(name_12, artist12_1, artist12_2, artist12_3, ' +
    'submitted_12, submitted_time_12, selected_artist_12, correct_12, ' +
    '(name_13, artist13_1, artist13_2, artist13_3, ' +
    'submitted_13, submitted_time_13, selected_artist_13, correct_13, ' +
    '(name_14, artist14_1, artist14_2, artist14_3, ' +
    'submitted_14, submitted_time_14, selected_artist_14, correct_14, ' +
    '(name_15, artist15_1, artist15_2, artist15_3, ' +
    'submitted_15, submitted_time_15, selected_artist_15, correct_15, ' +
    'is_current_card)' +
      'VALUES ($name_0, $artist0_1, $artist0_2, $artist0_3, ' +
      '$submitted_0, $submitted_time_0, $selected_artist_0, $correct_0, ' +
      '$name_1, $artist1_1, $artist1_2, $artist1_3, ' +
      '$submitted_1, $submitted_time_1, $selected_artist_1, $correct_1, ' +
      '$name_2, $artist2_1, $artist2_2, $artist2_3, ' +
      '$submitted_2, $submitted_time_2, $selected_artist_2, $correct_2, ' +
      '$name_3, $artist3_1, $artist3_2, $artist3_3, ' +
      '$submitted_3, $submitted_time_3, $selected_artist_3, $correct_3, ' +
      '$name_4, $artist4_1, $artist4_2, $artist4_3, ' +
      '$submitted_4, $submitted_time_4, $selected_artist_4, $correct_4, ' +
      '$name_5, $artist5_1, $artist5_2, $artist5_3, ' +
      '$submitted_5, $submitted_time_5, $selected_artist_5, $correct_5, ' +
      '$name_6, $artist6_1, $artist6_2, $artist6_3, ' +
      '$submitted_6, $submitted_time_6, $selected_artist_6, $correct_6, ' +
      '$name_7, $artist7_1, $artist7_2, $artist7_3, ' +
      '$submitted_7, $submitted_time_7, $selected_artist_7, $correct_7, ' +
      '$name_8, $artist8_1, $artist8_2, $artist8_3, ' +
      '$submitted_8, $submitted_time_8, $selected_artist_8, $correct_8, ' +
      '$name_9, $artist9_1, $artist9_2, $artist9_3, ' +
      '$submitted_9, $submitted_time_9, $selected_artist_9, $correct_9, ' +
      '$name_10, $artist10_1, $artist10_2, $artist10_3, ' +
      '$submitted_10, $submitted_time_10, $selected_artist_10, $correct_10, ' +
      '$name_11, $artist11_1, $artist11_2, $artist11_3, ' +
      '$submitted_11, $submitted_time_11, $selected_artist_11, $correct_11, ' +
      '$name_12, $artist12_1, $artist12_2, $artist12_3, ' +
      '$submitted_12, $submitted_time_12, $selected_artist_12, $correct_12, ' +
      '$name_13, $artist13_1, $artist13_2, $artist13_3, ' +
      '$submitted_13, $submitted_time_13, $selected_artist_13, $correct_13, ' +
      '$name_14, $artist14_1, $artist14_2, $artist14_3, ' +
      '$submitted_14, $submitted_time_14, $selected_artist_14, $correct_14, ' +
      '$name_15, $artist15_1, $artist15_2, $artist15_3, ' +
      '$submitted_15, $submitted_time_15, $selected_artist_15, $correct_15, ' +
      '$isCurrentcard)';
  const values = {
    $name_0: name_0,
    $artist0_1: artist0_1,
    $artist0_2: artist0_2,
    $artist0_3: artist0_3,
    $submitted_0: submitted_0,
    $submitted_time_0: submitted_time_0,
    $selected_artist_0: selected_artist_0,
    $correct_0: correct_0,
    $name_1: name_1,
    $artist1_1: artist1_1,
    $artist1_2: artist1_2,
    $artist1_3: artist1_3,
    $submitted_1: submitted_1,
    $submitted_time_0: submitted_time_1,
    $selected_artist_1: selected_artist_1,
    $correct_1: correct_1,
    $name_2: name_2,
    $artist2_1: artist2_1,
    $artist2_2: artist2_2,
    $artist2_3: artist2_3,
    $submitted_2: submitted_2,
    $submitted_time_0: submitted_time_2,
    $selected_artist_2: selected_artist_2,
    $correct_2: correct_2,
    $name_3: name_3,
    $artist3_1: artist3_1,
    $artist3_2: artist3_2,
    $artist3_3: artist3_3,
    $submitted_3: submitted_3,
    $submitted_time_0: submitted_time_3,
    $selected_artist_3: selected_artist_3,
    $correct_3: correct_3,
    $name_4: name_4,
    $artist4_1: artist4_1,
    $artist4_2: artist4_2,
    $artist4_3: artist4_3,
    $submitted_4: submitted_4,
    $submitted_time_0: submitted_time_4,
    $selected_artist_4: selected_artist_4,
    $correct_4: correct_4,
    $name_5: name_5,
    $artist5_1: artist5_1,
    $artist5_2: artist5_2,
    $artist5_3: artist5_3,
    $submitted_5: submitted_5,
    $submitted_time_0: submitted_time_5,
    $selected_artist_5: selected_artist_5,
    $correct_5: correct_5,
    $name_6: name_6,
    $artist6_1: artist6_1,
    $artist6_2: artist6_2,
    $artist6_3: artist6_3,
    $submitted_6: submitted_6,
    $submitted_time_0: submitted_time_6,
    $selected_artist_6: selected_artist_6,
    $correct_6: correct_6,
    $name_7: name_7,
    $artist7_1: artist7_1,
    $artist7_2: artist7_2,
    $artist7_3: artist7_3,
    $submitted_7: submitted_7,
    $submitted_time_0: submitted_time_7,
    $selected_artist_7: selected_artist_7,
    $correct_7: correct_7,
    $name_8: name_8,
    $artist8_1: artist8_1,
    $artist8_2: artist8_2,
    $artist8_3: artist8_3,
    $submitted_8: submitted_8,
    $submitted_time_0: submitted_time_8,
    $selected_artist_8: selected_artist_8,
    $correct_8: correct_8,
    $name_9: name_9,
    $artist9_1: artist9_1,
    $artist9_2: artist9_2,
    $artist9_3: artist9_3,
    $submitted_9: submitted_9,
    $submitted_time_0: submitted_time_9,
    $selected_artist_9: selected_artist_9,
    $correct_9: correct_9,
    $name_10: name_10,
    $artist10_1: artist10_1,
    $artist10_2: artist10_2,
    $artist10_3: artist10_3,
    $submitted_10: submitted_10,
    $submitted_time_0: submitted_time_10,
    $selected_artist_10: selected_artist_10,
    $correct_10: correct_10,
    $name_11: name_11,
    $artist11_1: artist11_1,
    $artis11_2: artis11_2,
    $artist11_3: artist11_3,
    $submitted_11: submitted_11,
    $submitted_time_0: submitted_time_11,
    $selected_artist_11: selected_artist_11,
    $correct_11: correct_11,
    $name_12: name_12,
    $artist12_1: artist12_1,
    $artist12_2: artist12_2,
    $artist12_3: artist12_3,
    $submitted_12: submitted_12,
    $submitted_time_0: submitted_time_12,
    $selected_artist_12: selected_artist_12,
    $correct_12: correct_12,
    $name_13: name_13,
    $artist13_1: artist13_1,
    $artist13_2: artist13_2,
    $artist13_3: artist13_3,
    $submitted_13: submitted_13,
    $submitted_time_0: submitted_time_13,
    $selected_artist_13: selected_artist_13,
    $correct_13: correct_13,
    $name_14: name_14,
    $artist14_1: artist14_1,
    $artist14_2: artist14_2,
    $artist14_3: artist14_3,
    $submitted_14: submitted_14,
    $submitted_time_0: submitted_time_14,
    $selected_artist_14: selected_artist_14,
    $correct_14: correct_14,
    $name_15: name_15,
    $artist15_1: artist15_1,
    $artist15_2: artist15_2,
    $artist15_3: artist15_3,
    $submitted_15: submitted_15,
    $submitted_time_0: submitted_time_15,
    $selected_artist_15: selected_artist_15,
    $correct_15: correct_15,
    $isCurrentcard: isCurrentcard,
    $cardId: req.params.cardId
  };

  db.run(sql, values, (error) => {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM card WHERE card.id = ${req.params.cardId}`,
        (error, card) => {
          res.status(200).json({card: card});
        });
    }
  });
});

cardsRouter.delete('/:cardId', (req, res, next) => {
  const sql = 'UPDATE card SET is_current_card = 0 WHERE card.id = $cardId';
  const values = {$cardId: req.params.cardId};

  db.run(sql, values, (error) => {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM card WHERE card.id = ${req.params.cardId}`,
        (error, card) => {
          res.status(200).json({card: card});
        });
    }
  });
});

module.exports = cardsRouter;
