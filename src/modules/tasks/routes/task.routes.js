import express from "express"
import { authRequired } from "../../../middlewares/jwt.js"
import { getTask, getTasks, createTask, updateTask, deleteTask } from "../controllers/task.controller.js"
import { taskValidationPost, taskValidationGetTask, taskValidationUpdateTask, taskValidationDeleteTask } from "../validators/tasks.validators.js"
import { validateResult } from "../../../middlewares/validations.middleware.js"

const router = express.Router()

router.get('/tasks', authRequired, getTasks)
router.get('/tasks/:id', authRequired, taskValidationGetTask, validateResult, getTask)
router.post('/tasks', authRequired, taskValidationPost, validateResult, createTask)
router.delete('/tasks/:id', authRequired, taskValidationDeleteTask, validateResult, deleteTask)
router.put('/tasks/:id', authRequired, taskValidationUpdateTask, validateResult, updateTask)

export default router