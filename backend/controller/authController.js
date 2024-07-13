const { hashPassword, comparePassword } = require('../helpers/authHelper');
const userModel = require('../models/userModel');
const JWT = require('jsonwebtoken')

const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        // Validation
        if (!name) {
            return res.status(400).send({ success: false, error: 'Name is required' });
        }
        if (!email) {
            return res.status(400).send({ success: false, error: 'Email is required' });
        }
        if (!password) {
            return res.status(400).send({ success: false, error: 'Password is required' });
        }
        if (!phone) {
            return res.status(400).send({ success: false, error: 'Phone is required' });
        }
        if (!address) {
            return res.status(400).send({ success: false, error: 'Address is required' });
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already registered, please login',
            });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Save the new user
        const newUser = await new userModel({ name, email, phone, address, password: hashedPassword });
        await newUser.save();

        return res.status(201).send({
            success: true,
            message: 'User registered successfully',
            user: newUser,
        });
    } catch (error) {
        console.error('Registration error:', error); // Log the full error for debugging

        // Check if the error is related to MongoDB validation
        if (error.name === 'ValidationError') {
            return res.status(400).send({
                success: false,
                message: 'Validation error',
                error: error.message,
            });
        }

        // Return generic error response
        return res.status(500).send({
            success: false,
            message: 'Error in registration',
            error: error.message || 'Internal Server Error',
        });
    }
};

// post login
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body
        // validation
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password'
            })
        }

        // check user
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered'
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'Invaild Password'
            })
        }
        // token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.status(200).send({
            success: true,
            message: 'Login Successfully',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            }, token,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
}

module.exports = { registerController, loginController };
