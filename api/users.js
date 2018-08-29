const express = require('express');
const usersRouter = express.Router();
const cardsRouter = express.Router({mergeParams: true});

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

usersRouter.param('userId', (req, res, next, userId) => {
  const sql = 'SELECT * FROM user WHERE user_id = $userId';
  const values = { $userId: userId };

  db.all(sql, values, (error, user) => {
    if (error) {
      next(error);
    } else if (user) {
      req.user = user;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

usersRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM user',
    (err, users) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({users: users});
      }
    });
});

usersRouter.get('/:userId', (req, res, next) => {
  res.status(200).json({ user: req.user });
});

usersRouter.put('/:userId', (req, res, next) => {
  //console.log('req.body.user: ', req.body.user);
  const user_id = req.body.user.userId,
        campaign_id = req.body.user.campaignId,
        card_id = req.body.user.cardId;

  if (!user_id || !campaign_id || !card_id) {
    return res.sendStatus(400);
  };

  const sql = 'UPDATE user SET card_id = $card_id ' +
    'WHERE user_id = $user_id AND campaign_id = $campaign_id';
  const values = {
    $user_id: user_id,
    $campaign_id: campaign_id,
    $card_id: card_id
  };

  db.run(sql, values, (error) => {
    if (error) {
      console.log('broke here');
      next(error);
    } else {
      //console.log(`SELECT * FROM user WHERE user_id = '${user_id}'`);
      db.get(`SELECT * FROM user WHERE user_id = '${user_id}'`,
        (error, user) => {
          res.status(200).json({ user: user });
        });
    }
  });
});

usersRouter.put('/:userId/reset', (req, res, next) => {
  //console.log('req.body.user: ', req.body.user);
  const user_id = req.body.user.userId;

  if (!user_id) {
    return res.sendStatus(400);
  };

  const sql = 'UPDATE user SET card_id = null ' +
    'WHERE user_id = $user_id';
  const values = {
    $user_id: user_id
  };

  db.run(sql, values, (error) => {
    if (error) {
      console.log('broke here');
      next(error);
    } else {
      //console.log(`SELECT * FROM user WHERE user_id = '${user_id}'`);
      db.get(`SELECT * FROM user WHERE user_id = '${user_id}'`,
        (error, user) => {
          res.status(200).json({ user: user });
        });
    }
  });
});

module.exports = usersRouter;
