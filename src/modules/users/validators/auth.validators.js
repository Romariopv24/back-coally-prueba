import { check } from 'express-validator';
import { validateResult } from '../../../middlewares/validations.middleware.js';

export const registerValidation = [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Email is required').not().isEmpty(),
    check('password', 'Password is required').not().isEmpty().isLength({ min: 5 }).custom((value, { req }) => {
        if(value <= 5) {
            throw new Error('Password must be at least 5 characters');
        }
        if (value !== req.body.confirmPassword) {
             throw new Error('Passwords do not match');
        }
        return true;
    }),
    check('confirmPassword', 'Confirm Password is required').not().isEmpty(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

export const loginValidation = [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

