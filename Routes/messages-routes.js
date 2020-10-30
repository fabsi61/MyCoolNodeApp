const express = require('express');
const Lessons = require('../models/dbHelpers');

const router = express.Router();
//for all endpoints starting with /api/messages
router.delete('/:id', (req, res) => {
    const {id} = req.params;

    Lessons.removeMessage(id)
    .then(count => {
        if(count > 0){
            res.status(200).json({message: `message with ${id} succesfully deleted`});
        } else {
            res.status(404).json({message: "No message with that id"});
        }
    })
    .catch(error => {
        res.status(500).json({message: "Error deleting message"});
    });
});
/*
router.patch('/:id', (req, res) => {
    const {id} = req.params;
    const changes = req.body;
    Lessons.messageUpdate(id, changes)
    .then(message =>{
        if(message) {
            res.status(200).json(message);
        }else{
            res.status(404).json({message: 'Record not found'});
        }
    })
    .catch(error => {
        res.status(500).json({message: ' Error updating record'});
    });
});
*/

module.exports = router;