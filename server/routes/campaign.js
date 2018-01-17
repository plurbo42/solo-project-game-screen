let express = require('express');
let router = express.Router();
let path = require('path'); //not sure if needed on this route
let pool = require('../modules/pool.js');

router.post('/new', function (req, res) {
    console.log('in post campaign', req.body);
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`WITH campaign_add AS (
                                    INSERT INTO campaign (user_id, title, join_code, date_created)
                                    VALUES ($1, $2, $3, NOW())
                                    RETURNING campaign.id AS new_campaign_id)
                            INSERT INTO campaign_user (campaign_id, user_id, is_gm)
                            SELECT campaign_add.new_campaign_id, $4, true
                            FROM campaign_add;`, [req.user.id, req.body.title, req.body.join_code, req.user.id], function (errorMakingDatabaseQuery, result) {
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

router.get('/list', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT c.*, cu.is_gm FROM campaign c
                            JOIN campaign_user cu ON c.id = cu.campaign_id
                            WHERE cu.user_id = $1`, [req.user.id], function (errorMakingDatabaseQuery, result) {
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

router.get('/detail/:id', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT c.*, cu.is_gm FROM campaign c
                            JOIN campaign_user cu ON c.id = cu.campaign_id
                            WHERE cu.user_id = $1
                            AND c.id = $2`, [req.user.id, req.params.id], function (errorMakingDatabaseQuery, result) {
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

router.post('/join', function (req, res) {
    console.log('in join game', req.body, req.user.id)
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`WITH join_campaign AS (
                            SELECT id 
                            FROM campaign 
                            WHERE join_code = $1)
                        INSERT INTO campaign_user (user_id, campaign_id, is_gm)
                        SELECT $2, jc.id, false
                        FROM join_campaign jc;`,
             [req.body.code, req.user.id], function (errorMakingDatabaseQuery, result) {
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