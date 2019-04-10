const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const admin = require('firebase-admin');
const dotenv = require("dotenv").config();
const firebaseObj = require('../../config/firebase')();

//initialize firebase admin
const serviceAccount = require('../../' + process.env.FIREBASE_CONFIG);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://sample-one-a2bc8.firebaseio.com"
});

const db = admin.firestore();

router.post('/', firebaseObj.verifyToken, function (req, res) {
    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.sendStatus(403).json(err);
        } else {
            //firebaseObj.getProfile(authData.result.token, res);
            db.collection("users")
                .doc(authData.result.user.id)
                .collection("tasks")
                .get()
                .then( (snapshot) => {
                    if(snapshot.empty){
                        res.sendStatus(403)
                    }else{
                        var resData = [];
                        snapshot.forEach(doc => {
                            resData.push(doc.data());
                        })

                        res.json(resData);
                    }
                });
        }
    });
});

router.post('/add', firebaseObj.verifyToken, (req, res) => {
    const data = {
        'taskName': req.body.taskName,
        'completed': req.body.completed
    }
    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.sendStatus(403);
            console.log(err);
        } else {

            db.collection("users")
                .doc(authData.result.user.id)
                .collection("tasks")
                .add(data)
                .then(() => {
                    res.json({
                        'code': 'data inserted'
                    })
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(403);
                });
        }
    });
});
router.post('/update', firebaseObj.verifyToken, (req, res) => {
    var taskID = req.body.taskID;
    const data = {
        "taskName": req.body.taskName
    }

    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.sendStatus(403);
            console.log(err);
        } else {

            db.collection("users")
                .doc(authData.result.user.id)
                .collection("tasks")
                .doc(taskID)
                .update(data)
                .then(() => {
                    res.json({
                        'code': 'document updated'
                    })
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(403);
                });
        }
    });

});

router.post('/delete', firebaseObj.verifyToken, (req, res) => {
    var taskID = req.body.taskID;
    console.log(taskID);

    jwt.verify(req.token, 'secret', (err, authData) => {
        if (err) {
            res.sendStatus(403);
            console.log(err);
        } else {

            db.collection("users").doc(authData.result.user.id).collection("tasks").doc(taskID).delete()
                .then(() => {
                    res.json({
                        'code': 'document deleted'
                    })
                })
                .catch((err) => {
                    console.log(err);
                    res.sendStatus(403);
                });
        }
    });

});

module.exports = router;