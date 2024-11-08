import e from "express";
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";
import User from "../models/user.model.js";
import Policia from "../models/autoridades.model.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { generarToken, sendResetCodeCorreo } from '../email.js'

export const register = async (req, res) => {

    const { email, password, username, phone, phoneFamily, municipio } = req.body

    try {
        const userFound = await User.findOne({ email })

        if (userFound)
            return res.status(400).json({ msg: 'El correo ya existe' })

        const code = generarToken()
        const expirationTime = Date.now() + 15 * 60 * 1000
        const passwordHash = await bcrypt.hash(password, 10)


        const newUser = new User({
            email,
            password: passwordHash,
            username,
            phone, 
            phoneFamily,
            municipio,
            validated: false,
            codigo: code,
            codigoExpiracion: expirationTime
        })

        const userSaved = await newUser.save()
        
        await sendResetCodeCorreo(email, code)

        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'none',
        //     path: '/'
        // });
        
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            cratedAt: userSaved.cratedAt,
            updatedAt: userSaved.updatedAt,
            msg: 'Registrado'
        })

    } catch (error) {
        res.status(500).json({ msg: 'Error Register', error })
    }
}


export const login = async (req, res) => {
    const { email, password } = req.body

    try {

        const userFound = await User.findOne({ email })
        if (!userFound) return res.status(400).json({ msg: 'Usuario no encontrado', email, password })

        if(userFound.validated != true){
            return res.status(400).json({ msg: 'Usuario no validado' })
        }            

        const isMatch = await bcrypt.compare(password, userFound.password)
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

export const updateProfile = async (req, res) => {
    const { password, phone, phoneFamily, municipio, validated } = req.body

    try { 
        const updateData = {};
        
        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }
        if (phone) updateData.phone = phone;
        if (phoneFamily) updateData.phoneFamily = phoneFamily;
        if (municipio) updateData.municipio = municipio;
        if(validated) updateData.validated = validated;
        
        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        )
        if (!user)
            return res.status(404).json({ msg: 'Usuario no encontrada' })

        return res.status(200).json({ msg: 'Actualizado', user })

    } catch (error) {
        return res.status(500).json({ msg: 'Error interno del servidor actualizar' })
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
            phone: userFound.phone, 
            phoneFamily: userFound.phoneFamily,
            municipio: userFound.municipio,
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
    const token = req.headers.authorization.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'no autorizado' })

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: 'no autorizado' })

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({ message: 'no encontrado' })

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            phone: userFound.phone, 
            phoneFamily: userFound.phoneFamily,
            municipio: userFound.municipio,
            msg: 'Bienvenido'
        })
    })
}











