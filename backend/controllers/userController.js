const userModel = require('../models/userModel');

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password });
        if (!user) {
            return res.status(404).send("User Not Found!");
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error
        })
    }
};
const registerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check for existing user
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists!"
            });
        }

        // Save new user
        const newUser = new userModel({ name, email, password });
        console.log(req.body);
        await newUser.save();

        res.status(201).json({
            success: true,
            newUser
        });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(400).json({
            success: false,
            message: error.message || "Registration failed!"
        });
    }
};


module.exports = { loginController, registerController };