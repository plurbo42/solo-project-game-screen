let express = require('express');
let router = express.Router();
let path = require('path'); //not sure if needed on this route
let pool = require('../modules/pool.js');


//get classlist for spell selection - TODO maybe just use the get from party instead so as not to duplicate code
router.get('/class', function (req, res) {
    console.log('in get classes')
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT * 
                          FROM classes c
                          WHERE c.has_spellcasting = true;`, function (errorMakingDatabaseQuery, result) {
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

router.get('/spellclass/:id', function (req, res) {
    console.log('in get spell by class')
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT 
                            s.id,
                            s.name, 
                            s.description, 
                            s.spell_level, 
                            CONCAT(CASE WHEN s.verbal_component = true THEN 'V' ELSE '' END, CASE WHEN s.somatic_component = true THEN 'S' ELSE '' END, CASE WHEN s.material_component = true THEN 'M' ELSE '' END) AS components,
                            s.material_component_list,
                            s.is_ritual,
                            s.duration,
                            s.casting_time,
                            s.spell_range
                    FROM spell s 
                    JOIN spell_class sc ON s.id = sc.spell_id
                    WHERE sc.class_id = $1
                    ORDER BY s.spell_level;`, [req.params.id], function (errorMakingDatabaseQuery, result) {
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

router.post('/addToSpellbook', function (req, res) {
    console.log('in add to spellbook', req.body)
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO character_spell (spell_id, character_id)
                            VALUES ($1, $2);`, [req.body.spellId, req.body.characterId], function (errorMakingDatabaseQuery, result) {
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

router.get('/spellbook/:id', function (req, res) {
    console.log('in get spellbook')
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT cs.*, 
                                s.name, 
                                s.spell_level,
                                CONCAT(CASE WHEN s.verbal_component = true THEN 'V' ELSE '' END, CASE WHEN s.somatic_component = true THEN 'S' ELSE '' END, CASE WHEN s.material_component = true THEN 'M' ELSE '' END) AS components,
                                s.material_component_list,
                                s.is_ritual,
                                s.duration,
                                s.spell_range, 
                                s.casting_time
                            FROM character_spell cs 
                            JOIN characters c ON c.id = cs.character_id
                            JOIN spell s ON s.id = cs.spell_id
                        WHERE c.campaign_id = $1
                        AND c.user_id = $2;`, [req.params.id, req.user.id], function (errorMakingDatabaseQuery, result) {
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