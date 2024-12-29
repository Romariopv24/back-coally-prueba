import { check } from 'express-validator';
import { validateResult } from '../../../middlewares/validations.middleware.js';
import Task from '../models/tasks.model.js';

const validateEmail = async (email, {req}) => {
    const task = await Task.findById(req.params.id).populate('user');
    if (!task) {
        throw new Error('Task not found')
    }
}

const validateDeleteTask = async (id, {req}) => {
    
      const task = await Task.findByIdAndDelete(req.params.id).populate('user')
       if(!task) {
        throw new Error('Task not found')
       }
}

const validateUpdateTask = async (value, { req, path }) => {
    const task = await Task.findById(req.params.id)
    if (!task) {
        throw new Error('Task not found')
    }
    console.log(path)
    if (value === '') {
        throw new Error(`${path.charAt(0).toUpperCase() + path.slice(1)} is required`)
    }

    if (task[path] === value) {
        throw new Error(`${path.charAt(0).toUpperCase() + path.slice(1)} is the same`)
    }

    return true;
}

export const taskValidationPost = [
    check('title', 'Title is required').not().isEmpty(),
     (req, res, next) => {
            validateResult(req, res, next);
        }
];


export const taskValidationGetTask = [
    check('id').not().isEmpty().custom(validateEmail),
     (req, res, next) => {
            validateResult(req, res, next);
        }
]


export const taskValidationUpdateTask = [
    check('title').optional().custom(validateUpdateTask),
    check('description').optional().custom(validateUpdateTask),
    check('status').optional().custom(validateUpdateTask),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

export const taskValidationDeleteTask = [
    check('id').not().isEmpty().custom(validateDeleteTask),
    (req, res, next) => {
        validateResult(req, res, next);
    }
]

