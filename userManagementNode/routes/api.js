
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const userService = require('./_services/user.service');
var csrf = require('csurf');
var csrfProtection = csrf({ cookie: true, httpOnly: true });

async function authenticate({ username, password }) {
    return new Promise((resolve) => {
        userService.getAllUsersWithPassword(function (userData) {
            const user = userData.find(u => u.email === username && u.password === password);
            if (user) {
                const token = jwt.sign({ sub: user.email, role: user.role }, "abcd");
                const { password, confirmPassword, ...userWithoutPassword } = user;
                resolve({
                    ...userWithoutPassword,
                    token
                });
            } else (resolve())
        })
    });

}

function authorize(roles = []) {
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return [
        expressJwt({ secret: "abcd" }),
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(401).json({ message: 'You are not permited to view this page.' });
            }
            next();
        }
    ];
}


router.post('/login', function (req, res, next) {
    res.cookie({ httpOnly: true, expires: 0 });
    authenticate({ username: req.body.username, password: req.body.password }).then(user => {
        if (user === undefined)
            res.json({ message: "You have entered wrong credentials.", loggedIn: false })
        res.json(user);
    })
});

router.post('/addUser', function (req, res, next) {
    req.body.role = "user";
    userService.addUser(req.body, function (response) {
        res.send(true);
    })
});

router.put('/updateUser', authorize(["admin","user"]), function (req, res, next) {
    userService.updateUser(req.body, function (response) {
        res.send(true);
    })
});

router.delete('/removeUser', authorize(["admin"]), function (req, res, next) {
    userService.removeUser(req.body, function (response) {
        res.send(true);
    })
});

router.get('/getAllUsers', authorize(["admin"]), function (req, res, next) {
    userService.getAllUsers(function (response) {
        res.send(response);
    })
});

router.post('/checkIfEmailExists', function (req, res, next) {
    userService.checkIfEmailExists(req.body.email,function (response) {
        res.send(response);
    })
});


module.exports = router;
