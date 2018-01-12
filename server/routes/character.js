let express = require('express');
let router = express.Router();
let path = require('path'); //not sure if needed on this route
let pool = require('../modules/pool.js');


//get classlist for spell selection - TODO maybe just use the get from party instead so as not to duplicate code
router.get('/sheet/:campaign_id', function (req, res) {
    console.log('in get character sheet')
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT c.id, c.name, c.player_name, c.strength, c.dexterity, c.constitution, c.intelligence, c.wisdom, c.charisma, c.hp, c.ac, c.level, cs.name AS class, a.name AS alignment, r.name AS race, c.bio
                            FROM characters c 
                            JOIN classes cs ON c.class_id = cs.id
                            JOIN alignment a ON c.alignment_id = a.id
                            JOIN race r ON c.race_id = r.id
                        WHERE c.user_id = $1
                        AND c.campaign_id = $2;`, [req.user.id, req.params.campaign_id], function (errorMakingDatabaseQuery, result) {
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