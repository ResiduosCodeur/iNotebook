const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require("../models/Note");
const {body, validationResult} = require('express-validator');

// fetch all notes
router.get('/fetchallnotes', fetchuser, async (req, res)=>{
    try {
        const notes = await Note.find({user: req.user.id});
        res.json(notes);
        
    } catch (error) {
         console.log(error.message);
        res.status(500).send("Server error");
    }
})

// add notes
router.post('/addnote', fetchuser,[
     body('title', 'Enter a valid email').isLength({min:5}),
        body('description', 'Name must be at least 5 characters').isLength({min:5}),
], async (req, res)=>{

    try {
        
        const {title, description, tag} = req.body;
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()});
        }
    
        const note = new Note ({
            title, description, tag, user: req.user.id
        })
        const savednote = await note.save()
    
        res.json(savednote);
    } catch (error) {
         console.log(error.message);
        res.status(500).send("Server error");
    }
})

module.exports = router