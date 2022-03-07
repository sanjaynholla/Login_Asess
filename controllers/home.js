const User = require('../model/user')
const Images = require('../model/image')
const jwt = require('jsonwebtoken');
const fs = require('fs');


const home = async (req, res) => {
    try {
        const user_id = req.user.userId;
        const isAdmin = req.user.isAdmin;
        if(!user_id){
            return res.status(401).json({msg: `Authentication Failed.. Login and Try Again..`});
        }

        if(isAdmin === true){
            var user = await User.find().select('-_id username qualification city phone_number');
        } else {
            var user = await User.findById({_id: user_id}).select('-_id username qualification city phone_number');
        }

        if(!user){
            return res.status(404).json({msg: `No User Details Found!`});
        }

        res.status(200).json({data: user});
    } catch (error) {
        res.status(500).json({msg: error})    
    }
}

const getAllImages = async (req, res) => {
    try {
        const user_id = req.user.userId;
        if(!user_id){
            return res.status(401).json({msg: `Authentication Failed.. Login and Try Again..`});
        }

        const images = await Images.find();
        if(!images){
            return res.status(404).json({msg: `No Images Found!`});
        }
        res.status(200).json({data: images});
    } catch (error) {
        res.status(500).json({msg: error})    
    }
}

const storeImage = async (req, res) => {
    try {
        if(req.fileValidationError){
            return res.status(401).json({msg: `Invalid Image Type.. Only jpg/png/jpeg Allowed to Upload`});
        }
        const user_id = req.user.userId;
        const isAdmin = req.user.isAdmin;
        if(isAdmin === true){
            const storeImageDetails = {
                uploaded_by: user_id,
                image_path: '/public/images/'+req.file.filename, 
                image_type: req.file.mimetype
            }
            const storeImages = await Images.create(storeImageDetails);
            res.status(201).json({storeImages})
        } else {
            return res.status(401).json({msg: `Authentication Failed.. User Must be Admin to upload image..`});
        }
    } catch (error) {
        res.status(500).json({msg: error})
    }
}

const logout = async (req, res) => {
    // Usually from backend we cannot destroy a token as its stateles, this can be done in ui generally
    const user_id = req.user.userId;
    if(user_id){
        const accessToken = {
            accessToken: ''
        }
        return res.status(200).json({msg: `Logged out...`, data: accessToken});
    }
}

module.exports = { 
    home,
    logout,
    getAllImages,
    storeImage
}