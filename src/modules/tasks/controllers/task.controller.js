import Task from "../models/tasks.model.js"

export const createTask = async (req, res) => { 
    const { title, description, status } = req.body

    const newTask = new Task({
        title,
        description,
        status,
        user: req.user.id
    })

    const savedTask = await newTask.save()

    res.json(savedTask)
}

export const getTasks = async (req, res) => { 
    try {
        const { status } = req.query
        const query = { user: req.user.id }

        if(status) {
            query.status = status 
        }

        const tasks = await Task.find(query).populate('user')
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving tasks', error })
    }
}

export const getTask = async (req, res) => { 
    const task = await Task.findById(req.params.id).populate('user')

    res.json(task)
}

export const updateTask = async (req, res) => { 
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(task)
}

export const deleteTask = async (req, res) => { 
    const task = await Task.findByIdAndDelete(req.params.id).populate('user')
    return res.status(201).json({message: "Task deleted"})
}