let express = require('express');
let router = express.Router();
let path = require('path'); //not sure if needed on this route
let pool = require('../modules/pool.js');

//get all players TODO - make campaign specific
router.get('/all', function (req, res) {
    console.log('in get party')
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT * FROM characters c;`, function (errorMakingDatabaseQuery, result) {
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

router.get('/race', function (req, res) {
    console.log('in get races')
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT * FROM race r;`, function (errorMakingDatabaseQuery, result) {
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

router.get('/class', function (req, res) {
    console.log('in get classes')
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT * FROM classes c;`, function (errorMakingDatabaseQuery, result) {
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

router.get('/alignment', function (req, res) {
    console.log('in get alignment')
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT * 
                        FROM alignment a
                        WHERE a.is_pc_alignment = true;`, function (errorMakingDatabaseQuery, result) {
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


//TO DO - tie this to a user and pull player name/info from there instead of inserting on characters table
router.post('/new', function (req, res) {
    var player_name = req.body.player_name;
    var name = req.body.name;
    var level = req.body.level;
    var race_id = req.body.race_id;
    var class_id = req.body.class_id;
    var alignment_id = req.body.alignment_id;
    var strength = req.body.strength;
    var dexterity = req.body.dexterity;
    var constitution = req.body.constitution;
    var intelligence = req.body.intelligence;
    var wisdom = req.body.wisdom;
    var charisma = req.body.charisma;
    var hp = req.body.hp;
    var ac = req.body.ac;
    var passive_perception = req.body.passive_perception;
    var initiative_bonus = req.body.initiative_bonus;
    console.log('in add new character', req.body);
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO characters (player_name, name, level, race_id, class_id, alignment_id, strength, dexterity, constitution, intelligence, wisdom, charisma, hp, ac, passive_perception, initiative_bonus)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16);`,
                        [player_name, name, level, race_id, class_id, alignment_id, strength, dexterity, constitution, intelligence, wisdom, charisma, hp, ac, passive_perception, initiative_bonus],
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


module.exports = router;