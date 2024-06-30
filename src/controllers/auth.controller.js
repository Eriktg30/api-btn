import e from "express";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";
import User from "../models/user.model.js";
import Policia from "../models/autoridades.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {

    const { email, password, username } = req.body

    try {

        const userFound = await User.findOne({ email })

        if (userFound)
            return res.status(400).json({ msg: 'El correo ya existe' })

        const passwordHash = await bcrypt.hash(password, 10)

        const newUser = new User({
            email,
            password: passwordHash,
            username,
        })

        const userSaved = await newUser.save()
        const token = await createAccessToken({ id: userSaved._id })


        // res.cookie('token', token)

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        });

        // res.cookie('user', username)

        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            cratedAt: userSaved.cratedAt,
            updatedAt: userSaved.updatedAt,
            msg: 'Registrado'
        })

    } catch (error) {
        console.log(error);
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body

    try {

        const userFound = await User.findOne({ email })
        if (!userFound) return res.status(400).json({ msg: 'Usuario no encontrado', email, password })

        const isMatch = await bcrypt.compare(password, userFound.password)
        if (!isMatch) return res.status(400).json({ msg: 'Datos incorrectos' })

        const token = await createAccessToken({ id: userFound._id })
        res.cookie('token', token)

        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'none',
        //     path: '/'
        // });

        res.status(200).json({
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
            msg: 'Bienvenido',
            authToken: token
        })

    } catch (error) {
        res.status(500).json({ msg: 'Error login' })
    }
}


export const profile = async (req, res) => {

    try {
        const userFound = await User.findById(req.params.id)

        if (!userFound) return res.status(400).json({ msg: 'Usuario no encontrado' })

        const userData = {
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        }

        return res.status(200).json(userData)

    } catch (error) {
        return res.status(500).json({ msg: 'Error del servidor' })
    }
}

export const logout = (req, res) => {
    res.cookie('token', '', {
        expires: new Date(0)
    })
    return res.sendStatus(200)
}

export const verifyToken = async (req, res) => {
    const { token } = req.cookies

    if (!token) return res.status(401).json({ message: 'no autorizado' })

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: 'no autorizado' })

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({ message: 'no encontrado' })

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            msg: 'Bienvenido'
        })
    })
}


export const loginAutoridades = async (req, res) => {
    const { CorreoPo, PasswordPo } = req.body

    try {

        const userFound = await Policia.findOne({ CorreoPo })
        if (!userFound) return res.status(400).json({ msg: 'Usuario no encontrado', CorreoPo, PasswordPo })

        const isMatch = await bcrypt.compare(PasswordPo, userFound.PasswordPo)
        if (!isMatch) return res.status(400).json({ msg: 'Datos incorrectos' })

        const token = await createAccessToken({ id: userFound._id })
        // res.cookie('token', token)

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            path: '/'
        });

        res.status(200).json({
            id: userFound._id,
            username: userFound.NombresPo,
            email: userFound.CorreoPo,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        })

    } catch (error) {
        res.status(500).json({ msg: 'Error login' })
    }
}








