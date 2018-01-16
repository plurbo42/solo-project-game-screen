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

//getCurrentEncounter gets a list of NPCs for the selected encounter. 
router.get('/current/:id', function (req, res) {
    console.log(`get current encounter`, req.params)
    var encounter_id = req.params.id
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT e.id, e.description, e.notes, en.id AS npc_id, m.name, m.armor_class AS ac, 
                m.challengerating, en.current_hp, 0 AS initiative_bonus
                            FROM encounter e
                            LEFT JOIN encounter_npc en ON e.id = en.encounter_id
                            LEFT JOIN monsters m ON m.id = en.monster_id
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
            client.query(`SELECT c.id, c.name, c.hp AS current_hp, c.AC, c.initiative_bonus
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

router.get('/items/:id', function (req, res) {
    console.log(`get encounter items`, req.params)
    var encounter_id = req.params.id
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT el.id AS encounter_loot_id, el.encounter_id, i.*
                            FROM encounter_loot el
                                JOIN item i ON i.id = el.item_id
                        WHERE el.encounter_id = $1;`, [encounter_id],
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

//delete loot from encounter
router.delete('/lootDelete/:id', function (req, res) {
    console.log(`delete encounter loot item`, req.params)
    var encounter_id = req.params.id
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`DELETE FROM encounter_loot
                            WHERE id = $1;`, [req.params.id],
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

//delete NPC from encounter
router.delete('/npcDelete/:id', function (req, res) {
    console.log(`delete npc from encounter`, req.params)
    var encounter_id = req.params.id
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`DELETE FROM encounter_npc
                            WHERE id = $1;`, [req.params.id],
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

//mark encounter as complete
router.put('/end/:id', function (req, res) {
    console.log(`end encounter`, req.params)
    var encounter_id = req.params.id
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`UPDATE encounter
                            SET is_complete = true
                            WHERE id = $1;`, [req.params.id],
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

//insert encounter loot into party inventory
router.post('/distributeLoot/:id', function (req, res) {
    console.log(`distribute loot`, req.params)
    var encounter_id = req.params.id
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO party_inventory (campaign_id, item_id)
                            SELECT e.campaign_id, el.item_id
                            FROM encounter_loot el
                            JOIN encounter e ON e.id = el.encounter_id
                            WHERE el.encounter_id = $1;`, [req.params.id],
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
