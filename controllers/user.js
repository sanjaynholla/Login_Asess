const User = require('../model/user');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        // Check for username already exist or not
        const userExist = await User.findOne({username: req.body.username});
        if(userExist){
            // if username exist
            return res.status(400).json({msg: `Username ${userExist.username} already exist!`});    
        } else {
            // if not exist add user to db
            const regDetails = req.body
            if(req.body.password){
                regDetails.password= CryptoJS.AES.encrypt(req.body.password, process.env.ENCRYPT_SECRET_KEY).toString()
            }

            if(req.body.isAdmin){
                regDetails.isAdmin= req.body.isAdmin
            }
            
            // console.log(regDetails);
            const user = await User.create(regDetails);
            res.status(201).json({user})
        }
    } catch (error) {
        res.status(500).json({msg: error})    
    }
}

const login = async (req, res) => {
    
    if(!req.body.username){
        return res.status(400).json({msg: 'Username Cannot be empty!'})
    }

    if(!req.body.password){
        return res.status(400).json({msg: 'Password Cannot be empty!'})
    }

    try {
        const user = await User.findOne({username: req.body.username});
        if(!user){
            return res.status(404).json({msg: `Username ${req.body.username} doesn't exist! Please Register!`});
        }

        const bytes  = CryptoJS.AES.decrypt(user.password, process.env.ENCRYPT_SECRET_KEY);
        const decryptpassword = bytes.toString(CryptoJS.enc.Utf8);

        const {password, ...info} = user._doc;

        const accessToken = jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin }, 
            process.env.JWT_SECRET_KEY, 
            {expiresIn: "5d"}
        );

        if(req.body.password === decryptpassword){
            return res.status(200).json({msg: `Logged in as ${user.username}`, data: {accessToken}});
        } else {
            return res.status(401).json({msg: `Wrong user credentials! Try Again!`});
        }
    } catch (error) {
        return res.status(500).json(error);
    }
    
}



module.exports = { 
    registerUser,
    login
}