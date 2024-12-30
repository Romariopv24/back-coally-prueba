import User from '../models/auth.model.js'
import { createAccessToken } from '../../../middlewares/jwt.js'
import bcrypt from 'bcryptjs'



export const registerUser = async(req, res) => {
   //   #swagger.tags = ['Auth']
   //  #swagger.summary = 'Registrar usuario'
    //  #swagger.description = 'Endpoint para registrar un nuevo usuario'
    const { username, email, password, confirmPassword } = req.body
    try {

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passwordHash
        })

        const saveUser = await newUser.save()

        res.json({
            id: saveUser._id,
            username: saveUser.username,
            email: saveUser.email,
            createdAt: saveUser.createdAt,
            updatedAt: saveUser.updatedAt
        })

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const loginUser = async (req, res) => {
   //   #swagger.tags = ['Auth']
   //  #swagger.summary = 'Iniciar sesion'
   //  #swagger.description = 'Endpoint para iniciar sesion de un usuario'
 
    const { email, password } = req.body
    try {

        const foundUser = await User.findOne({ email: req.body.email })

        const token = await createAccessToken({ 
            id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
            createdAt: foundUser.createdAt,
            updatedAt: foundUser.updatedAt,
        })

        res.cookie("token", token, {httpOnly: true, secure: false})

        res.json({
            id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
            createdAt: foundUser.createdAt,
            updatedAt: foundUser.updatedAt,
            token: token
        })

    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

export const logoutUser = async (req, res) => { 
   //   #swagger.tags = ['Auth']
   //  #swagger.summary = 'Cerrar sesion'
    //  #swagger.description = 'Endpoint para cerrar sesion de un usuario'

    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.status(200).json({message: "Logged out"})
}

export const profileUser = async (req, res) => {
      //   #swagger.tags = ['Auth']
   //  #swagger.summary = 'Perfil de usuario'
    //  #swagger.description = 'Endpoint para obtener el perfil de un usuario'

    const userFound = await User.findById(req.user.id)

    if(!userFound) {
        return res.status(404).json({message: "User not found"})
    }

    return res.status(200).json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })

}

