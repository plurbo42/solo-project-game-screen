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
    let notes = req.body.notes
    console.log('in get search request', req.query)
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO encounter (description, user_id, round_count, notes)
                            VALUES ($1, $2, 0, $3);`, [description, userId, notes], function (errorMakingDatabaseQuery, result) {
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

//add npc to encounter
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

//get item by name search 
router.get('/itemSearch', function (req, res) {
    let searchTerm = `%${req.query.searchTerm}%`;
    console.log('in get search request', req.query);
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT *
                            FROM item i 
                            WHERE i.name ILIKE $1`, [searchTerm], function (errorMakingDatabaseQuery, result) {
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

//get item type list for dropdown
router.get('/itemtype', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT *
                            FROM item_type
                            ORDER BY type`, function (errorMakingDatabaseQuery, result) {
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

//add loot to encounter
router.post('/addLoot', function (req, res) {
    console.log('in add loot', req.body)
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO encounter_loot (encounter_id, item_id)
                            VALUES ($1, $2);`, [req.body.encounterId, req.body.itemId], function (errorMakingDatabaseQuery, result) {
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
