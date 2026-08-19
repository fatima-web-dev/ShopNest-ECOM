const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendEmail = require('../utils/sendEmail');

const generateToken = (id) => {
    // Generate a JWT token using the user's ID and a secret key
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        const user = new User({
            name,
            email,
            password: hashedPassword,
            verified: false,
            otp: otp,
            otpExpires: Date.now() + 5 * 60 * 1000
        });

        await user.save();

        const message = `Your OTP for ShopNest registration is: ${otp}. Thank you for registering with ShopNest!`;

        await sendEmail(
            email,
            'ShopNest Registration OTP',
            message
        );

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            
            message: 'User registered successfully. Please check your email for the OTP.'
        });

    } catch (error) {
        console.error('REGISTER ERROR:', error);

        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};
//login user

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {

      
        const user = await User.findOne({ email });

        

        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password'
            });
        }


        if (!user.verified) {
            return res.status(401).json({
                message: 'Please verify your email first'
            });
        }

        const isPasswordMatch = await bcrypt.compare(
            password,
            user.password
        );


        if (isPasswordMatch) {

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id),
            });

        } else {

            res.status(401).json({
                message: 'Invalid email or password'
            });

        }

    } catch (error) {

        console.error("LOGIN ERROR:", error);

        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

    // Verify OTP
const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        if (user.verified) {
            return res.status(400).json({
                message: 'User is already verified'
            });
        }

        if (user.otp !== otp) {
            return res.status(400).json({
                message: 'Invalid OTP'
            });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({
                message: 'OTP expired'
            });
        }

        user.verified = true;
        user.otp = undefined;
        user.otpExpires = undefined;

        await user.save();

        res.json({
            message: 'Email verified successfully'
        });

    } catch (error) {
        console.error('VERIFY OTP ERROR:', error);

        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};


// Resend OTP
const resendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        if (user.verified) {
            return res.status(400).json({
                message: 'User is already verified'
            });
        }

        // Generate new OTP
        const otp = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        // Save new OTP and expiry
        user.otp = otp;
        user.otpExpires = Date.now() + 5 * 60 * 1000;

        await user.save();

        // Send new OTP
        const message = `Your new ShopNest OTP is: ${otp}. It is valid for 5 minutes.`;

        await sendEmail(
            email,
            'ShopNest New OTP',
            message
        );

        res.json({
            message: 'New OTP sent successfully'
        });

    } catch (error) {
        console.error('RESEND OTP ERROR:', error);

        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};


//getUsers

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password'); // Exclude the password field from the response
        res.json(users);
    }
    catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    verifyOTP,
    resendOTP,
    getUsers
};
