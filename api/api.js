const express = require('express');
const apiRouter = express.Router();
const songsRouter = require('./songs.js');
const artistsRouter = require('./artists.js');
const usersRouter = require('./users.js');
const cardsRouter = require('./cards.js');
const tilesRouter = require('./tiles.js');
const rdsRouter = require('./rds.js');
const campaignsRouter = require('./campaigns.js');

apiRouter.use('/songs', songsRouter);
apiRouter.use('/artists', artistsRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/cards', cardsRouter);
apiRouter.use('/tiles', tilesRouter);
apiRouter.use('/rds', rdsRouter);
apiRouter.use('/campaigns', campaignsRouter);

module.exports = apiRouter;
