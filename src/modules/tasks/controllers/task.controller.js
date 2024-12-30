import Task from "../models/tasks.model.js"

export const createTask = async (req, res) => { 
     //   #swagger.tags = ['Tasks']
      //  #swagger.summary = 'Crear tarea'
    //  #swagger.description = 'Endpoint para crear una nueva tarea'
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
       //   #swagger.tags = ['Tasks']
      //  #swagger.summary = 'Obtener tareas'
    //  #swagger.description = 'Endpoint para obtener todas las tareas del usuario'

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
     //   #swagger.tags = ['Tasks']
       //  #swagger.summary = 'Obtener tarea por ID'
    //  #swagger.description = 'Endpoint para obtener una tarea por su ID'

    const task = await Task.findById(req.params.id).populate('user')

    res.json(task)
}

export const updateTask = async (req, res) => { 
     //   #swagger.tags = ['Tasks']
    //  #swagger.summary = 'Actualizar Tareas'
    //  #swagger.description = 'Endpoint para actualizar una  tarea'
     const { title, description, status } = req.body

    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.json(task)
}

export const deleteTask = async (req, res) => { 
     //   #swagger.tags = ['Tasks']
    //  #swagger.summary = 'Eliminar tarea'
    //  #swagger.description = 'Endpoint para eliminar una tarea'
    const task = await Task.findByIdAndDelete(req.params.id).populate('user')
    return res.status(201).json({message: "Task deleted"})
}