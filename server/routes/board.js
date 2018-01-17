let express = require('express');
let router = express.Router();
let path = require('path'); //not sure if needed on this route
let pool = require('../modules/pool.js');

//get all comments for this campaign
router.get('/all/:id', function (req, res) {
    console.log('in get all comments')
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT c.content, 
                                COALESCE(EXTRACT(MONTH FROM c.date) || '-' || EXTRACT(DAY FROM c.date) || '-' || EXTRACT(YEAR FROM c.date), ' ') as date,
                                to_char(c.date, 'HH12:MI AM') AS time, 
                                u.username, 
                                c.huzzahs, 
                                c.image_url
                        FROM comment c
                            JOIN users u ON u.id = c.user_id
                        WHERE c.campaign_id = $1
                        ORDER BY c.date DESC;`, [req.params.id], function (errorMakingDatabaseQuery, result) {
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

//post new comment to database
router.post('/post', function (req, res) {
    console.log('in post new comments')
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`INSERT INTO comment (user_id, content, date, campaign_id)
                            VALUES ($1, $2, NOW(), $3);`, [req.user.id, req.body.content, req.body.campaign_id], function (errorMakingDatabaseQuery, result) {
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