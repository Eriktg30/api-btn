// import User from '../models/user.model'
import { sendResetCode, generarToken } from '../email.js'
import User from "../models/user.model.js";


export const sendCode = async (req, res) => {
    const { email } = req.body

    try {
        const code = generarToken()
        const expirationTime = Date.now() + 15 * 60 * 1000

        const userFound = await User.findOneAndUpdate(
            { email: email },
            {
                codigo: code,
                codigoExpiracion: expirationTime
            },
            { new: true }
        )

        if (!userFound)
            return res.status(404).json({ msg: 'Usuario no encontrado' })


        await sendResetCode(email, code)

        return res.status(200).json({ msg: 'enviado', code })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error al enviar el código' })
    }
}

export const verifyCode = async (req, res) => {
    const { email, code } = req.body

    try {
        const userFound = await User.findOne(
            { email: email }
        )

        if (!userFound) 
            return res.status(500).json({ msg: 'usuario no encontrado' })

        if(userFound.code === code && Date.now() < userFound.codigoExpiracion){
            return res.status(200).json({msg: 'código valido'})
        }else {
            return res.status(400).json({ msg: 'Código inválido o expirado', email, code, (Date.now() < userFound.codigoExpiracion), Date.now() })
        }
        
    } catch (error) {
        console.log(error);
        
    }
}