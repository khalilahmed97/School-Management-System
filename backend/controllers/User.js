const User = require('../models/User.js');
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const user = require('../models/User.js');
const cloudinary = require("cloudinary").v2
const loginUser = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        console.log(username, password, role)

        // Validate input
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Find user by username
        const user = await User.findOne({ email:username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the password matches
        const isMatch = password===user.password;
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // const token = jwt.sign({
        //     id: user._id, isAdmin: user.isAdmin, role: user.role
        // }, process.env.SECRET_KEY)

        return res.status(200).json({ message: "Login Successfull!", data: user })



        // If the user is found and password matches
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

// const password = "admin"
// const salt = await bcrypt.genSalt(10)
// const hashedPassword = await bcrypt.hash(password, salt)
// const user = new User({
//     name: 'Khalil Ahmed Sharif',
//     username: 'admin',
//     password: hashedPassword, // Will be hashed by middleware
//     isAdmin: true,
//     role: [new mongoose.Types.ObjectId('669be8e898dd9cefa2575388')] // Replace with actual Role ObjectId(s)
//   });

//   await user.save();
//   console.log('User created successfully');
// };
const roleCreation = async (req, res) => {
    try {

        if (req.body.role && req.body.role !== "") {
            const newRole = new Role(req.body.name)
            await newRole.save()

            return res.status(200).send(
                "Role Added Successfully!"
            )
        }
        else {
            return res.status(500).send(
                "Bad Request!"
            )
        }
    }

    catch (error) {
        return res.status(500).send(
            "Internal Server Error!"
        )
    }
}


const getAllUsers = async (req, res) => {
    const { id } = req.params
    console.log(id)

    try {
        const users = await User.find({ role: id })
        console.log(users)

        if (users.length === 0) {
            return res.status(200).json({ message: id + " Not found", data: [] });
        }
        return res.status(200).json({ message: "Users Found", data: users });

    }
    catch (error) {
        return res.status(500).json({ message: error });

    }

}

function generatePassword() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

function generateID() {
    var length = 3
    charset=[1,2,3,4,5, 6,7, 8, 9, 0]
    var retVal =""
    for (var i = 0; i < length; i++) {
        retVal += charset[(Math.floor(Math.random() * 10))];
    }
    return retVal;
}

const addUser = async (req, res) => {
    const { firstName, lastName, email, phone, gender, role, picture } = req.body
    try {

        const password = generatePassword()
        const hashedPassword = await bcrypt.hash(password, 10)


        const searchedUser = await User.findOne({email: email})
        if (searchedUser) {
            res.status(200).json({ message: 'User with given email already exists' });
        }
        else {
            // Upload an image
            await cloudinary.uploader
                .upload(
                    picture
                )
                .then(async (result) => {
                    const image = result.url
                    const newUser = {
                        id: '2020F-BSE-'+generateID(),firstName: firstName, lastName: lastName, email: email, phoneNumber: phone, gender: gender, role: role, picture: image, password: hashedPassword
                    }
                    const user = new User(newUser)
                    await user.save()
                    res.status(200).json({ message: 'User Registered Successfully' });
                })
                .catch((error) => {
                    res.status(500).json({ message: error.message });
                });

        }


    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}


const deleteUser = async (req, res) => {
    const id = req.params.id
    console.log(id)
    try{

        const user = await User.findOneAndDelete({id:id})
        if(user){
            res.status(200).json({ message: 'User Deleted Successfully' });
        }
        else{
            res.status(200).json({ message: "User with given id not exist" });
        }
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}

module.exports = { roleCreation, loginUser, getAllUsers, addUser,deleteUser }