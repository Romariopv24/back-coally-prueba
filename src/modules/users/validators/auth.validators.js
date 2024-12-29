import { check } from 'express-validator';
import { validateResult } from '../../../middlewares/validations.middleware.js';
import User from '../models/auth.model.js';
import bcrypt from 'bcryptjs';

const validationPassword = (password, { req }) => {
    if (password <= 5) {
        throw new Error('Password must be at least 5 characters');
    }
    if (password !== req.body.confirmPassword) {
        throw new Error('Passwords do not match');
    }
    return true;
}


const validateEmail = async (email, {req}) => {
    const foundUser = await User.findOne({ email });
    if (!foundUser) {
        throw new Error('User not found');
    }
    req.user = foundUser;
}

const validatePassword = async (password, {req}) => {
    const foundUser = await User.findOne({ email: req.body.email })
    const isMatch = await bcrypt.compare(password, foundUser.password)
    if (!isMatch) {
        throw new Error('Password is incorrect');
    }
}


export const registerValidation = [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty().isLength({ min: 5 })
    .custom(validationPassword),
    check('confirmPassword', 'Confirm Password is required').not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];



export const loginValidation = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    check('email').custom(validateEmail),
    check('password')
    .custom(validatePassword),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

