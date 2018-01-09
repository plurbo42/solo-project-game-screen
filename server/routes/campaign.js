let express = require('express');
let router = express.Router();
let path = require('path'); //not sure if needed on this route
let pool = require('../modules/pool.js');

// router.post('/new', function (req, res) {
//     console.log('in post campaign', req.user)
//     pool.connect(function (errorConnectingToDatabase, client, done) {
//         if (errorConnectingToDatabase) {
//             console.log('error', errorConnectingToDatabase);
//             res.sendStatus(500);
//         } else {
//             client.query(`INSERT INTO campaign`, [req.user.id], function (errorMakingDatabaseQuery, result) {
//                 done();
//                 if (errorMakingDatabaseQuery) {
//                     console.log('error', errorMakingDatabaseQuery);
//                     res.sendStatus(500);
//                 } else {
//                     res.sendStatus(200);
//                 }
//             });
//         }
//     });
// });

router.get('/list', function (req, res) {
    pool.connect(function (errorConnectingToDatabase, client, done) {
        if (errorConnectingToDatabase) {
            console.log('error', errorConnectingToDatabase);
            res.sendStatus(500);
        } else {
            client.query(`SELECT * FROM campaign c
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

module.exports = router;