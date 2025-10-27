const bcrypt = require('bcrypt');
const User = require("../models/userSchema");
const { generateToken } = require('../helper/token');

//for login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        console.log('user', user)
        if (!user) {
            res.status(401).send({ "name": "Unauthorized", "message": "Invalid Credentials" });
        } else {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const token = await generateToken(user)

                res.status(200).send({
                    message: "Login successful",
                    token,
                    user: {
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                      }
                });
            } else {
                res.status(401).send({ "name": "Unauthorized", "message": "Invalid Credentials" });
            }
        }
    } catch (error) {
        next(error);
    }
}

const signUp = async (req, res, next) => {
    try {
        const { email, password, name, role, addresses } = req.body;
        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create a new user instance and save it to MongoDB
        const newUser = new User({
            name,
            email,
            password:hashedPassword,
            role,
            addresses
        })
        await newUser.save();
        res.status(200).send({
            message: "Sign-Up successful",
        });

    } catch (error) {
        next(error);
    }
}



module.exports = {
    login,
    signUp
}