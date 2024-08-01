import Autoridades from "../models/autoridades.model.js";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { TOKEN_SECRET } from "../config.js";
import { createAccessToken } from "../libs/jwt.js";


export const getPolicias = async (req, res) => {
    try {
        const emergencia = await Autoridades.find({
        })

        res.json(emergencia)

    } catch (error) {
        return res.status(500).json({msg: 'Policias no encontrada'})
    }
}

export const getPolicia = async (req, res) => {
    try {
        // const emergencia = await Autoridades.findById(req.params.id).populate('policia')
        const emergencia = await Autoridades.findById(req.params.id)
        if (!emergencia) return res.status(404).json({ msg: 'Policia no encontrada' })
        res.json(emergencia)

    } catch (error) {
        return res.status(500).json({msg: 'Policia no encontrada'})
    }
}

export const updatePolicia = async (req, res) => {
    const { notificationToken } = req.body

    try {
        const policia = await Autoridades.findByIdAndUpdate(req.params.id,
            { notificationToken},
            { new: true }
        )

        if (!policia) 
            return res.status(404).json({ msg: 'Policia no encontrado' })
        
        return res.status(200).json({ msg: 'Actualizado', policia })

    } catch (error) {
        return res.status(500).json({ msg: 'Policia no encontrado' })
    }
}

export const updateCoordenadasPolicia = async (req, res) => {
    const { ulongitud, ulatitud } = req.body

    try {
        const policia = await Autoridades.findByIdAndUpdate(req.params.id,
            { ulongitud, ulatitud},
            { new: true }
        )

        if (!policia) 
            return res.status(404).json({ msg: 'Policia no encontrado' })
        

        return res.status(200).json({ msg: 'Actualizado', policia })

    } catch (error) {
        return res.status(500).json({ msg: 'Policia no encontrado' })
    }
}

export const loginAutoridades = async (req, res) => {
    const { CorreoPo, PasswordPo } = req.body

    try {

        const userFound = await Autoridades.findOne({ CorreoPo })
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
            updatedAt: userFound.updatedAt,
            msg: 'Bienvenido',
            authToken: token
        })

    } catch (error) {
        res.status(500).json({ msg: 'Error login' })
    }
}

export const verifyTokenAutoridades = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) return res.status(401).json({ message: 'no autorizado' })

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if (err) return res.status(401).json({ message: 'no autorizado' })

        const userFound = await Autoridades.findById(user.id)
        if (!userFound) return res.status(401).json({ message: 'no encontrado' })

        return res.json({
            id: userFound._id,
            username: userFound.NombresPo,
            email: userFound.CorreoPo,
            msg: 'Bienvenido'
        })
    })
}

