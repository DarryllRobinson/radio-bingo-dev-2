const express = require('express');
const rdsRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

rdsRouter.param('campaignId', (req, res, next, campaignId) => {
  const sql = 'SELECT * FROM rds WHERE campaign_id = $campaignId';
  const values = {$campaignId: campaignId};
  db.all(sql, values, (error, rds) => {
    if (error) {
      next(error);
    } else if (rds) {
      req.rds = rds;
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

rdsRouter.get('/', (req, res, next) => {
  db.all('SELECT * FROM rds',
    (err, rds) => {
      if (err) {
        next(err);
      } else {
        res.status(200).json({rds: rds});
      }
    });
});

rdsRouter.get('/:campaignId', (req, res, next) => {
  res.status(200).json({rds: req.rds});
});

module.exports = rdsRouter;
