const express = require('express');
const usersRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

usersRouter.param('userId', (req, res, next, userId) => {
  //const sql = 'SELECT * FROM user WHERE user.id = $userId';
  const sql = 'SELECT * FROM user WHERE user_id = $userId';
  console.log('param sql: ', sql);
  const values = {
    $userId: userId
  };
  console.log('values: ', values);
  db.all(sql, values, (error, user) => {
    if (error) {
      next(error);
    } else if (user) {
      console.log('user: ', user);
      req.user = user;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

usersRouter.param('userId', 'cardId', (req, res, next, userId, cardId) => {
  //const sql = 'SELECT * FROM user WHERE user.id = $userId';
  /*const sql = 'SELECT * FROM user WHERE user_id = $userId';
  console.log('cardId param sql: ', sql);
  const values = {
    $userId: userId
  };
  console.log('values: ', values);
  db.all(sql, values, (error, user) => {
    if (error) {
      next(error);
    } else if (user) {
      console.log('cardId user: ', user);
      req.user = user;
      next();
    } else {
      res.sendStatus(404);
    }
  });*/
});

usersRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM user WHERE user.is_current_user = 1',
    (err, users) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({users: users, count: users.length});
      }
    });
});

usersRouter.get('/:userId', (req, res, next) => {
  res.status(200).json({user: req.user});
});

/*usersRouter.post('/', (req, res, next) => {
  const user_id = req.body.user.user_id,
        name = req.body.user.name,
        picture = req.body.user.picture,
        isCurrentuser = req.body.user.isCurrentuser === 0 ? 0 : 1;
  if (!user_id || !name || !picture) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO user (user_id, name, picture, is_current_user)' +
      'VALUES ($user_id, $name, $picture, $isCurrentuser)';
  const values = {
    $user_id: user_id,
    $name: name,
    $picture: picture,
    $isCurrentuser: isCurrentuser
  };

  db.run(sql, values, function(error) {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM user WHERE user.id = ${this.lastID}`,
        (error, user) => {
          res.status(201).json({user: user});
        });
    }
  });
});*/

usersRouter.post('/', (req, res, next) => {
  const user_id = req.body.user.user_id,
        name = req.body.user.name,
        picture = req.body.user.picture,
        campaign_id = req.body.user.campaign_id,
        is_current_user = req.body.user.is_current_user === 0 ? 0 : 1;
  if (!user_id || !name || !picture || !campaign_id) {
    return res.sendStatus(400);
  }

  const sql = 'INSERT INTO user (user_id, name, picture, campaign_id, is_current_user)' +
      'VALUES ($user_id, $name, $picture, $campaign_id, $is_current_user)';
  const values = {
    $user_id: user_id,
    $name: name,
    $picture: picture,
    $campaign_id: campaign_id,
    $is_current_user: is_current_user
  };

  db.run(sql, values, function(error) {
  console.log('sql: ', sql);
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM user WHERE user.id = ${this.lastID}`,
        (error, user) => {
          res.status(201).json({user: user});
        });
    }
  });
});

usersRouter.put('(/:userId)(/:cardId)', (req, res, next) => {
  const user_id = req.body.user.user_id,
        campaign_id = req.body.user.campaign_id,
        card_id = req.body.user.card_id;
  if (!user_id || !campaign_id || !card_id) {
    return res.sendStatus(400);
  }

  console.log('user_id: ', user_id);
  console.log('card_id: ', card_id);
  console.log('campaign_id: ', campaign_id);

  const sql = 'UPDATE user SET card_id = $card_id' +
      ' WHERE user_id = $user_id AND campaign_id = $campaign_id';
      console.log('sql: ', sql);
  const values = {
    $user_id: user_id,
    $card_id: card_id,
    $campaign_id: campaign_id,
    $userId: req.params.userId
  };

  db.run(sql, values, (error) => {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM user WHERE user_id = ${req.params.userId}`,
        (error, user) => {
          res.status(200).json({user: user});
        });
    }
  });
});

usersRouter.delete('/:userId', (req, res, next) => {
  const sql = 'UPDATE user SET is_current_user = 0 WHERE user.id = $userId';
  const values = {$userId: req.params.userId};

  db.run(sql, values, (error) => {
    if (error) {
      next(error);
    } else {
      db.get(`SELECT * FROM user WHERE user.id = ${req.params.userId}`,
        (error, user) => {
          res.status(200).json({user: user});
        });
    }
  });
});

module.exports = usersRouter;
