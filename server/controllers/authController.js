const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// email and password regex for security purposes
const emailRegex = /^\S+@\S+\.\S+$/;
const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

// 1. Regsiter user
exports.registerUser = async (req, res) => {
    // grab user credentials and details
    const {name, email, password, location, bio} = req.body;
    
    // if any of these dont exits throw an error
    if(!name || !email || !password || !location || !bio){
        return res.status(400).json({
            msg: 'All fields are required'
        });
    }

    // check email regex 
    if(!emailRegex.test(email)){
        return res.status(400).json({
            msg: 'Invalid email format'
        });
    }

    // check password regex
    if(!passwordRegex.test(password)){
        return res.status(400).json({
            msg: 'Password must be atleast 8 characters long, including uppercase, lowercase, numbers and special characters'
        });
    }
    
    try {
        // 1. before registering, check if the user exits 
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({msg: 'User already exits'});
        }

        // 2. encrypt the passwords, if its a new registeration
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashed, location, bio});

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
    if(!email || !password){
        return res.status(400).json({
            msg: 'Email and password are required'
        });
    }

    try {
        const user = await User.findOne({email});
        
        // if user doesnt exists or user doesnt enter his password
        if(!user || !user.password){ // *dbt
            return res.status(400).json({
                msg: 'Invalid credentials'
            });
        }

        // check if the password entered by user and password in the DB match
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return res.status(400).json({
                msg: 'Invalid credentials'
            });
        }

        res.json({
            user: {id: user._id, name: user.name, email: user.email},
            token: generateToken(user._id),
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Internal Server error for Email login'
        })
    }
}
