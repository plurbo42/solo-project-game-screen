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
            client.query(`SELECT c.id, c.name, c.player_name, c.strength, c.dexterity, c.constitution, c.wisdom, c.charisma, c.hp, c.ac, c.level, cs.name AS class, a.name AS alignment, r.name AS race, c.bio
                            FROM characters c 
                            JOIN classes cs ON c.class_id = cs.id
                            JOIN alignment a ON c.alignment_id = a.id
                            JOIN race r ON c.race_id = r.id;`, function (errorMakingDatabaseQuery, result) {
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

router.get('/skills', function (req, res) {
    console.log('in get skills')
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT * 
                        FROM skill s
                        ORDER BY s.name;`, function (errorMakingDatabaseQuery, result) {
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
    var bio = req.body.bio;
    console.log('in add new character', req.body);
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO characters (player_name, name, level, race_id, class_id, alignment_id, strength, dexterity, constitution, intelligence, wisdom, charisma, hp, ac, passive_perception, initiative_bonus, bio)
                        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17);`,
                        [player_name, name, level, race_id, class_id, alignment_id, strength, dexterity, constitution, intelligence, wisdom, charisma, hp, ac, passive_perception, initiative_bonus, bio],
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

router.get('/inventory/:id', function (req, res) {
    console.log('in get party inventory')
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT pi.id AS party_inventory_id, i.*
                            FROM party_inventory pi
                            JOIN item i ON i.id = pi.item_id
                            WHERE pi.campaign_id = $1
                            AND pi.is_claimed = false`, [req.params.id], function (errorMakingDatabaseQuery, result) {
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

router.post('/claimLoot', function (req, res) {
    console.log('in claim loot');
    var party_inventory_id = req.body.party_inventory_id
    var character_id = req.body.claimant
    var item_id = req.body.id
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`WITH claim_loot AS (
                                INSERT INTO inventory (character_id, item_id, party_inventory_id)
                                VALUES ($1, $2, $3)
                                )
                        UPDATE party_inventory 
                        SET is_claimed = true 
                        WHERE id = $4;`, [character_id, item_id, party_inventory_id, party_inventory_id], function (errorMakingDatabaseQuery, result) {
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