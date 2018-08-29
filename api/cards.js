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
  const numTiles = req.body.card.numTiles,
        user_id = req.body.card.user_id,
        campaign_id = req.body.card.campaign_id,
        is_current_card = req.body.card.is_current_card === 0 ? 0 : 1;
  if (!numTiles || !user_id || !campaign_id) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO card (numTiles, user_id, campaign_id, is_current_card)' +
      'VALUES ($numTiles, $user_id, $campaign_id, $is_current_card)';
  const values = {
    $numTiles: numTiles,
    $user_id: user_id,
    $campaign_id: campaign_id,
    $is_current_card: is_current_card
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

cardsRouter.put('/reset', (req, res, next) => {
  //console.log('req.body.user: ', req.body.user);
  /*const user_id = req.body.user.userId;

  if (!user_id) {
    return res.sendStatus(400);
  };*/

  const sql = 'DELETE FROM card';

  db.run(sql, (error) => {
    if (error) {
      console.log('broke here');
      next(error);
    } else {
      //console.log(`SELECT * FROM user WHERE user_id = '${user_id}'`);
      db.get(`SELECT * FROM card'`,
        (error, card) => {
          res.status(200).json({ card: card });
        });
    }
  });
});

module.exports = cardsRouter;
