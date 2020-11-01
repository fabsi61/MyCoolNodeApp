const express = require('express');
const Lessons = require('../models/dbHelpers');
const bcrypt = require('bcryptjs');
const generateToken = require('./generateToken');
const router = express.Router();

//for all endpoints starting with /api/users
router.post('/register', (req, res) => {
    const credentials = req.body;
    const {username, password} = credentials;

    if(!(username && password)){
        return res.status(400).json({message: "Username and password required"});
    }

    const hash = bcrypt.hashSync(credentials.password, 12);
    credentials.password = hash;

    Lessons.addUser(credentials)
        .then((user) => {
            res.status(200).json(user);
        })
        .catch(error => {
            if(error.errno == 19){
                res.status(400).json({message: "Username already taken"});
            }
            else{
                res.status(500).json(error);
            }
        });
});

/*
            req.session.user = {
                id: user.id,
                username: user.username
            };
           */
//vergleicht ob logindaten zu db username und passwort passen
router.post("/login", (req, res) => {
    const { username, password } = req.body;
  
    if (!(username && password)) {
      return res.status(400).json({ message: "Username and password required" });
    }
  
    Lessons.findUserByUsername(username)
      .then((user) => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
  
          res.status(200).json({ message: `Welcome ${user.username}!`, token });
           //res.status(200).json({message: `Welcome ${user.username}!`});
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch((error) => {
        res.status(500).json(error);
      });
  });

router.get('/logout', (req, res) => {
    if(req.session){
        req.session.destroy(error => {
            if(error) {
                res.status(500).json({message: 'You can check mout anytime you like but can never leave'});
            }else{
                res.status(200).json({message: 'Succesfully logged out'});
            }
        })
    }else{
        res.status(200).json({message: 'Not logged in'});
    }
});

module.exports = router;