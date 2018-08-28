const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('./database.sqlite');

// Seed Artist table
db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='RDS'", (error, table) => {
  if (error) {
    throw new Error(error);
  }

  if (table) {
    db.serialize(function() {
      let rdsId;
      // correct: song, artist, time    incorrect: 0
      db.run("INSERT INTO rds (song, artist, start_time, end_time, campaign_id) " +
        "VALUES ('song 1051', 'artist 1051', '8/28/2018, 11:24:20 AM', '8/28/2019, 11:24:20 AM', 4)");
      // correct: song, artist          incorrect: time
      db.run("INSERT INTO rds (song, artist, start_time, end_time, campaign_id) " +
        "VALUES ('song 1051', 'artist 1051', '8/28/2018, 11:24:20 AM', '8/28/2017, 11:24:20 AM', 4)");
      // correct: song, time            incorrect: artist
      db.run("INSERT INTO rds (song, artist, start_time, end_time, campaign_id) " +
        "VALUES ('song 1051', 'artist xx', '8/28/2018, 11:24:20 AM', '8/28/2019, 11:24:20 AM', 4)");
      // correct: 0                     incorrect: song, artist, time
      db.run("INSERT INTO rds (song, artist, start_time, end_time, campaign_id) " +
        "VALUES ('song xx', 'artist xx', '8/28/2018, 11:24:20 AM', '8/28/2017, 11:24:20 AM', 4)");
      // correct: artist, time          incorrect: song
      db.run("INSERT INTO rds (song, artist, start_time, end_time, campaign_id) " +
        "VALUES ('song xx', 'artist 1051', '8/28/2018, 11:24:20 AM', '8/28/2019, 11:24:20 AM', 4)");
      // correct: artist                incorrect: song, time
      db.run("INSERT INTO rds (song, artist, start_time, end_time, campaign_id) " +
        "VALUES ('song xx', 'artist 1051', '8/28/2018, 11:24:20 AM', '8/28/2017, 11:24:20 AM', 4)")
        , function(error) {
                if (error) {
                  throw new Error(error);
                }
                rdsId = this.lastID;
              };
            });
          }
        });
