

import Emergencia from "../models/emergencias.model.js";


export const getEmergencias = async (req, res) => {
    try {
        const emergencia = await Emergencia.find({
        })

        res.json(emergencia)

    } catch (error) {
        return res.status(500).json({msg: 'Emergencia no encontrada'})
    }
}

export const getEmergencia = async (req, res) => {
    try {
        const emergencia = await Emergencia.findById(req.params.id)
        if (!emergencia) return res.status(404).json({ msg: 'Emergencia no encontrada' })
        res.json(emergencia)

    } catch (error) {
        return res.status(500).json({msg: 'Emergencia no encontrada'})
    }
}

export const addEmergencias = async (req, res) => {
    const { ulongitud, ulatitud, estado, tipo, user } = req.body

    try {

        const newEmergencia = new Emergencia({
            ulongitud,
            ulatitud,
            estado,
            tipo,
            user
        })

        const userSaved = await newEmergencia.save()

        res.status(200).json({
            userSaved,
            id: userSaved._id
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}

export const updateEmergencias = async (req, res) => {
    const { ulongitud, ulatitud } = req.body

    try {
        const emergencia = await Emergencia.findByIdAndUpdate(req.params.id,
            { ulongitud, ulatitud },
            { new: true }
        )

        if (!emergencia)
            return res.status(404).json({ msg: 'Emergencia no encontrada' })

        return res.status(200).json({ msg: 'Actualizado', emergencia })

    } catch (error) {
        return res.status(500).json({ msg: 'Error interno del servidor', ulatitud, ulongitud })
    }

}

export const deleteAlerta = async (req, res) => {
    try {
        const alerta = await Emergencia.findByIdAndDelete(req.params.id)
        if (!alerta) return res.status(404).json({ message: 'Alerta no encontrada' })

        return res.status(204).json({msg: 'Alerta cancelada', alerta})
        
    } catch (error) {
        return res.status(500).json({msg: 'Error del servidor'})
    }
}

export const updateEstado = async (req, res) => {
    const { estado } = req.body

    try {
        const emergencia = await Emergencia.findByIdAndUpdate(req.params.id,
            { estado },
            { new: true }
        )

        if (!emergencia)
            return res.status(404).json({ msg: 'Emergencia no encontrada' })

        return res.status(200).json({ msg: 'Gracias por confirmar', emergencia })

    } catch (error) {
        return res.status(500).json({ msg: 'Error interno del servidor', ulatitud, ulongitud })
    }

}

