let express = require('express');
let router = express.Router();
let path = require('path'); //not sure if needed on this route
let pool = require('../modules/pool.js');

//get all encounters for this user to populate dropdown
router.get('/all', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT *
                            FROM encounter e
                            WHERE e.user_id = req.user.id`, function (errorMakingDatabaseQuery, result) {
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
