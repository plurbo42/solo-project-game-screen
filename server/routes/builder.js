let express = require('express');
let router = express.Router();
let path = require('path'); //not sure if needed on this route
let pool = require('../modules/pool.js');

//get monster by name search
router.get('/search', function (req, res) {
    let searchTerm = `%${req.query.searchTerm}%`;
    console.log('in get search request', req.query)
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT m.*, s.name AS size, mt.name AS type
                            FROM monsters m
                                JOIN monster_type mt ON mt.id = m.monster_type_id
                                JOIN size s ON s.id = m.size_id
                            WHERE m.name ILIKE $1;`, [searchTerm], function (errorMakingDatabaseQuery, result) {
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

//post new encounter - TODO add campaign id to post 
router.post('/new', function (req, res) {
    let userId = req.user.id;
    let description = req.body.description;
    console.log('in get search request', req.query)
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO encounter (description, user_id, round_count)
                            VALUES ($1, $2, 0);`, [description, userId], function (errorMakingDatabaseQuery, result) {
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


module.exports = router;