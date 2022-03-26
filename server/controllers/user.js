
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import Users from '../Models/user.js'

const secret = 'test'


// GET USER 
export const userList = async (req, res) => {
    try {
        const usersData = await Users.find()
        res.status(200).json(usersData)
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

// SIGN IN USER
export const signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await Users.findOne({ email })

        if (!existingUser) return res.status(404).json({ message: "User doesn't exist." })

        const isPassCorrect = await bcrypt.compare(password, existingUser.password)

        if (!isPassCorrect) return res.status(400).json({ message: "Invalid credenctials" })

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, secret, { expiresIn: "10h" })

        res.status(200).json({ result: existingUser, token })

    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong !" })
    }
}

// SIGN UP USER
export const signup = async (req, res) => {

    const { firstName, lastName, email, password, confirmPassword } = req.body

    try {
        const existingUser = await Users.findOne({ email })

        if (existingUser) return res.status(404).json({ message: "User allredy exist." })

        if (password != confirmPassword) return res.status(404).json({ message: "Password dont't match." })

        const hasedPassword = await bcrypt.hash(password, 12)

        const result = await Users.create({
            name: `${firstName} ${lastName}`,
            email,
            password: hasedPassword,
        })
        const token = jwt.sign({ email: result.email, id: result._id }, secret, { expiresIn: "10h" })
        res.status(200).json({ result, token })

    } catch (error) {
        res.status(500).json({ message: "Something Went Wrong !" })
        console.log(error)
    }
}