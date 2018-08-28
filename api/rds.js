const express = require('express');
const rdsRouter = express.Router();

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

rdsRouter.param('campaignId', (req, res, next, campaignId) => {
  //console.log('param req.rds: ', req);
  const sql = 'SELECT * FROM rds WHERE campaign_id = $campaignId';
  const values = {$campaignId: campaignId};
  //console.log('param campaignId values: ', values);
  db.all(sql, values, (error, rds) => {
    if (error) {
      next(error);
    } else if (rds) {
      req.rds = rds;
      //console.log('campaignId rds: ', rds);
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

rdsRouter.param('song', (req, res, next, song) => {
  //console.log('param req.rds: ', req);
  const sql = 'SELECT * FROM rds WHERE song = $song';
  const values = {$song: song};
  //console.log('param song values: ', values);
  db.all(sql, values, (error, rds) => {
    if (error) {
      next(error);
    } else if (rds) {
      req.rds = rds;
      //console.log('song rds: ', rds);
      next();
    } else {
      res.sendStatus(404);
    }
  });
});

rdsRouter.param('artist', (req, res, next, artist) => {
  //console.log('param req.rds: ', req);
  const sql = 'SELECT * FROM rds WHERE artist = $artist';
  const values = {$artist: artist};
  //console.log('param artist values: ', values);
  db.all(sql, values, (error, rds) => {
    if (error) {
      next(error);
    } else if (rds) {
      req.rds = rds;
      //console.log('song rds: ', rds);
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
  res.status(200).json({ rds: req.rds });
});

/*rdsRouter.get('/:campaignId', (req, res, next) => {
  console.log('req.rds: ', req.rds);
  const id = req.rds.id,
        campaign_id = req.rds.campaign_id,
        song = req.rds.song,
        start = req.rds.start_time,
        end = req.rds.end_time;

  if (!campaign_id || !song || !start) {
    return res.sendStatus(400);
  };

  const sql = 'SELECT * FROM rds WHERE campaign_id = $campaign_id ' +
    'AND song = $song AND start_time < $start';
  const values = {
    $campaign_id: campaign_id,
    $song: song,
    $start: start
  };

  db.run(sql, values, (error) => {
    if (error) {
      console.log('broke here');
      next(error);
    } else {
      db.get(`SELECT * FROM rds WHERE id = '${id}'`),
        (error, rds) => {
          res.status(200).json({rds: req.rds});
        };
    }
  });

});*/

module.exports = rdsRouter;
