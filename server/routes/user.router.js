var express = require('express');
var router = express.Router();
let pool = require('../modules/pool.js');


// Handles Ajax request for user information if user is authenticated
router.get('/', function(req, res) {
  console.log('get /user route');
  // check if logged in
  if(req.isAuthenticated()) {
    // send back user object from database
    console.log('logged in', req.user);
    var userInfo = {
      username : req.user.username
    };
    res.send(userInfo);
  } else {
    // failure best handled on the server. do redirect here.
    console.log('not logged in');
    // should probably be res.sendStatus(403) and handled client-side, esp if this is an AJAX request (which is likely with AngularJS)
    res.send(false);
  }
});

// clear all server session information about this user
router.get('/logout', function(req, res) {
  // Use passport's built-in method to log out the user
  console.log('Logged out');
  req.logOut();
  res.sendStatus(200);
});

router.put('/profilePicture', function (req, res) {
  console.log('in put profile pic')
  pool.connect(function (errorConnectingToDatabase, client, done) {
      if (errorConnectingToDatabase) {
          console.log('error', errorConnectingToDatabase);
          res.sendStatus(500);
      } else {
          client.query(`UPDATE users 
                          SET image_url = $1
                          WHERE id = $2`, [req.body.image_url, req.user.id], function (errorMakingDatabaseQuery, result) {
              done();
              if (errorMakingDatabaseQuery) {
                  console.log('error', errorMakingDatabaseQuery);
                  res.sendStatus(500);
              } else {
                  res.sendStatus(200);
              }
          });
      }
  });
});

router.get('/role/:id', function (req, res) {
  pool.connect(function (errorConnectingToDatabase, client, done) {
      if (errorConnectingToDatabase) {
          console.log('error', errorConnectingToDatabase);
          res.sendStatus(500);
      } else {
          client.query(`SELECT is_gm
                        FROM campaign_user cu
                        WHERE cu.campaign_id = $1
                          AND cu.user_id = $2`, [req.params.id, req.user.id], function (errorMakingDatabaseQuery, result) {
              done();
              if (errorMakingDatabaseQuery) {
                  console.log('error', errorMakingDatabaseQuery);
                  res.sendStatus(500);
              } else {
                  res.send(result.rows);
              }
          });
      }
  });
});

module.exports = router;
