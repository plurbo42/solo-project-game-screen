let express = require('express');
let router = express.Router();
let path = require('path'); //not sure if needed on this route
let pool = require('../modules/pool.js');

//get all encounters for this user to populate dropdown
router.get('/all/:id', function (req, res) {
    console.log('in get encounters', req.params)
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT *
                            FROM encounter e
                            WHERE e.campaign_id = $1`, [req.params.id], function (errorMakingDatabaseQuery, result) {
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

router.get('/current/:id', function (req, res) {
    console.log(`get current encounter`, req.params)
    var encounter_id = req.params.id
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT e.id, e.description, e.notes, en.id AS npc_id, el.id AS loot_id, m.name, m.armor_class AS ac, m.challengerating, en.current_hp, 0 AS initiative_bonus
                            FROM encounter e
                            LEFT JOIN encounter_npc en ON e.id = en.encounter_id
                            LEFT JOIN monsters m ON m.id = en.monster_id
                            LEFT JOIN encounter_loot el ON e.id = el.encounter_id
                            LEFT JOIN item i ON i.id = el.item_id
                        WHERE e.id = $1;`, [encounter_id],
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


//TODO - add campaign specific logic, option to select only certain characters with IN
router.get('/players', function (req, res) {
    console.log(`get encounter players`);
    var encounter_id = req.params.id;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT c.name, c.hp AS current_hp, c.AC, c.initiative_bonus
                            FROM characters c;`,
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

//Post new encounter Group - TODO this is not active functionality, may want to remove for the time being
router.post('/newgroup/:id', function (req, res) {
    console.log('in post new group', req.params.id);
    var encounter_id = req.params.id;
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`;`,
                            function (errorMakingDatabaseQuery, result) {
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

router.get('/details/:id', function (req, res) {
    console.log(`get current encounter`, req.params)
    var encounter_id = req.params.id
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT *
                            FROM encounter e
                        WHERE e.id = $1;`, [encounter_id],
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


module.exports = router;
