const express = require('express');
const router = express.Router();
const User = require("../models/User")
const {body, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'iAmSamarth';
const fetchuser = require('../middleware/fetchuser');

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
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        //creates a user
        user = await User.create({
            email: req.body.email,
            password: secPass,
            name: req.body.name

        })
        const data = {
            user: {
                id: user.id
            }
        }

       const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken});


    } catch (error) {
        // for some other error
        console.log(error.message);
        res.status(500).send("Server error");
    }
})

//login - authenticating a user

router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
] , async (req, res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({error: "Please enter correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            return res.status(400).json({error: "Please enter correct credentials"});
        }

    const data = {
            user: {
                id: user.id
            }
        }
         const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({authtoken});

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }

})

//Get uesr details

router.post('/getuser', fetchuser, async (req, res)=> {
    try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
} catch (error) {
    console.log(error.message);
    res.status(500).send("Server error");
}
})

module.exports = router