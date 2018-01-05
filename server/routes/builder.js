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

//get encounter data TODO - campaign specific, probably move this to encounter route??, add more data to select as needed
router.get('/encounterlist', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT e.id, e.description, en.id AS npc_id, el.id AS loot_id, m.name, m.challengerating
                            FROM encounter e
                            LEFT JOIN encounter_npc en ON e.id = en.encounter_id
                            LEFT JOIN monsters m ON m.id = en.monster_id
                            LEFT JOIN encounter_loot el ON e.id = el.encounter_id
                            LEFT JOIN item i ON i.id = el.item_id;`, 
                            function (errorMakingDatabaseQuery, result) {
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

router.post('/addnpc', function (req, res) {
    console.log('in add npc', req.body)
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO encounter_npc (encounter_id, monster_id, current_hp)
                            SELECT $1, m.id, m.hit_points 
                            FROM monsters m
                            WHERE m.id = $2;`, [req.body.encounterId, req.body.monsterId], function (errorMakingDatabaseQuery, result) {
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
