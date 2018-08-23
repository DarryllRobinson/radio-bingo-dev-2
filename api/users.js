const express = require('express');
const usersRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

usersRouter.param('userId', (req, res, next, userId) => {
  const sql = 'SELECT * FROM user WHERE user.id = $userId';
  const values = {$userId: userId};
  db.get(sql, values, (error, user) => {
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

usersRouter.post('/', (req, res, next) => {
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
});

usersRouter.put('/:userId', (req, res, next) => {
  const user_id = req.body.user.user_id,
        name = req.body.user.name,
        picture = req.body.user.picture,
        isCurrentuser = req.body.user.isCurrentuser === 0 ? 0 : 1;
  if (!user_id || !name || !picture) {
    return res.sendStatus(400);
  }

  const sql = 'UPDATE user SET user_id = $user_id, name = $name, picture = $picture, correct_0 = $correct_0, is_current_user = $isCurrentuser ' +
      'WHERE user.id = $userId';
  const values = {
    $user_id: user_id,
    $name: name,
    $picture: picture,
    $isCurrentuser: isCurrentuser,
    $userId: req.params.userId
  };

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
