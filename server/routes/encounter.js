let express = require('express');
let router = express.Router();
let path = require('path'); //not sure if needed on this route
let pool = require('../modules/pool.js');

//get all encounters for this user to populate dropdown
router.get('/all', function (req, res) {
    console.log('in get encounters', req.user.id)
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT *
                            FROM encounter e`, function (errorMakingDatabaseQuery, result) {
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
            client.query(`SELECT e.id, e.description, e.notes, en.id AS npc_id, el.id AS loot_id, m.name, m.challengerating, en.current_hp
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



module.exports = router;
