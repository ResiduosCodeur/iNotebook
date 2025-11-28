const express = require('express');
const router = express.Router();
const User = require("../models/User")
const {body, validationResult} = require('express-validator');

// create a user using POST: "/api/auth/createuser". No login reqd.
router.post('/createuser',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Name must be at least 5 characters').isLength({min:5}),
    body('name', 'Name must be at least 3 characters').isLength({min:3}),
    
] , async (req, res)=>{
       
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    try {
        // to find whether user with same email exists
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            
            console.log("Email already exists!");
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        //creates a user
        user = await User.create({
            email: req.body.email,
            password: req.body.password,
            name: req.body.name

        })
        res.json(user)
    } catch (error) {
        // for some other error
        console.log(error.message);
        res.status(500).send("Some Error occured");
    }
})

module.exports = router