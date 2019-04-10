const firebase = require('firebase');
const FirebaseAuth = require('firebaseauth');
const firebaseAuthObj = new FirebaseAuth(process.env.FIREBASE_API_KEY);
const jwt = require('jsonwebtoken');

var config = {
    apiKey: "AIzaSyCgs2uHOOYbRSQ6uMCWVIAkdE8BmkLM-X0",
    authDomain: "sample-one-a2bc8.firebaseapp.com",
    databaseURL: "https://sample-one-a2bc8.firebaseio.com",
    projectId: "sample-one-a2bc8",
    storageBucket: "sample-one-a2bc8.appspot.com",
    messagingSenderId: "337070435626"
};
firebase.initializeApp(config);

module.exports = () => {
    return {
        currentUser: () => {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    return user.uid;
                } else {
                    return false;
                }
            });
        },
        signup: (name, email, password, res) => {
            firebaseAuthObj.registerWithEmail(email, password, name, function (err, result) {
                if (err) {
                    res.sendStatus(403).json(err);
                }
                else {
                    res.json({
                        'code': 'user created',
                        result
                    });
                }
            });
        },
        login: (email, password, res) => {
            firebaseAuthObj.signInWithEmail(email, password, function (err, result) {
                if (err)
                    res.sendStatus(403).json(err);
                else
                    jwt.sign({ result }, 'secret', { expiresIn: '1h' }, (err, token) => {
                        res.json(token);
                    });
            });
        },
        getProfile: (token, res) => {
            firebaseAuthObj.getProfile(token, function (err, result) {
                if (err) {
                    res.sendStatus(403).json(err);
                } else {
                    res.json({
                        'code': 'user authenticated',
                        result
                    });
                }
            });
        },
        logout: (res) => {
            // Sign out user
            firebase.auth().signOut()
                .then(( ) => {
                    res.json({
                        'msg' : 'user logged out'
                    })
                });

        },
        verifyToken: (req, res, next) => {
            const bearerHeader = req.headers['authorization'];
            if( typeof bearerHeader !== 'undefined' ){
                const bearer = bearerHeader.split(' ');
                const bearerToken = bearer[1];
        
                req.token = bearerToken;
        
                next();
            }else{
                res.sendStatus(403);
                console.log(bearerHeader);
            }
        }
    }
}