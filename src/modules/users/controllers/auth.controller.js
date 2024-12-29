import User from '../models/auth.model.js'
import { createAccessToken } from '../../../middlewares/jwt.js'
import bcrypt from 'bcryptjs'

export const registerUser = async(req, res) => {
    const { username, email, password } = req.body
    try {

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            username,
            email,
            password: passwordHash
        })

        const saveUser = await newUser.save()

        const token = await createAccessToken({id:saveUser._id})

        res.cookie("token", token, {httpOnly: true, secure: false})
        // res.setHeader('Authorization', `Bearer ${token}`)
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
    const { email, password } = req.body
    try {

        const foundUser = await User.findOne({ email })

        if(!foundUser) {
            return res.status(400).json({message: "User not found"})
        }

        const isMatch = await bcrypt.compare(password, foundUser.password)

        if(!isMatch) {
            return res.status(400).json({message: "Password is incorrect"})
        }

        const token = await createAccessToken({id:foundUser._id})

        res.cookie("token", token, {httpOnly: true, secure: false})
        // res.setHeader('Authorization', `Bearer ${token}`)

        res.json({
            id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
            createdAt: foundUser.createdAt,
            updatedAt: foundUser.updatedAt
        })

    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

export const logoutUser = async (req, res) => { 
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.status(200).json({message: "Logged out"})
}

export const profileUser = async (req, res) => {
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

