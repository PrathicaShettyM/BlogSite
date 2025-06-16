const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');

// 1. Regsiter user
exports.registerUser = async (req, res) => {
    // grab user credentials
    const {name, email, password} = req.body;
    try {
        // 1. before registering, check if the user exits 
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({msg: 'User already exits'});
        }

        // 2. encrypt the passwords, if its a new registeration
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashed});

        res.status(201).json({
            // user registered successfully
            user: {id: user._id, name: user.name, email: user.email},
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({msg: 'Internal Server error for User registeration'});
    }
};

// 2. Email login
exports.loginUser = async (req, res) => {
    // grab email and password for login
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
        // if user doesnt exists or user doesnt enter his password
        if(!user || !user.password){ // dbt
            return res.status(400).json({
                msg: 'Invalid credentials'
            });
        }

        // check if the password entered by user and password in the DB match
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({
                msg: 'Invalid credentials'
            })
        }
    } catch (error) {
        res.status(500).json({
            msg: 'Internal Server error for Email login'
        })
    }
}

// 3. Google oauth login
exports.googleLogin = async (req, res) => {
    // grab user data
    const {tokenId, name, email, googleId} = req.body;
    try {
        let user = await User.findOne({email});
        
        // 1. if user doesnt exist, create a new user
        if(!user){
            user = await User.create({name, email, googleId});
        }      

        res.json({
            user: {id: user._id, name: user.name, email: user.email},
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Google login failed'
        })
    }
};
