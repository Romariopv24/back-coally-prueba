import express from "express"
import { authRequired } from "../../../middlewares/jwt.js"
import { getTask, getTasks, createTask, updateTask, deleteTask } from "../controllers/task.controller.js"
import { taskValidationPost, taskValidationGetTask, taskValidationUpdateTask, taskValidationDeleteTask } from "../validators/tasks.validators.js"
import { validateResult } from "../../../middlewares/validations.middleware.js"


const router = express.Router()

router.get('/tasks', authRequired, getTasks)
router.get('/tasks/:id',taskValidationGetTask, validateResult,  authRequired, getTask)
router.post('/tasks',taskValidationPost, validateResult, authRequired, createTask)
router.delete('/tasks/:id', taskValidationDeleteTask, validateResult, authRequired, deleteTask)
router.put('/tasks/:id',taskValidationUpdateTask, validateResult ,authRequired, updateTask)


export default router