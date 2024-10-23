import Emergencia from "../models/emergencias.model.js";
import mongoose from 'mongoose';
import Municipios from "../models/municipios.model.js"

export const getEmergencias = async (req, res) => {
    try {
        const policiaid = req.params.id;
        const emergencia = await Emergencia.find({
            Policias: policiaid
        }).populate('Policias')

        res.json(emergencia)

    } catch (error) {
        return res.status(500).json({msg: 'Emergencia no encontrada l'})
    }
}

export const getEmergencia = async (req, res) => {
    try {
        const emergencia = await Emergencia.findById(req.params.id).populate('user')
        if (!emergencia) return res.status(404).json({ msg: 'Emergencia no encontrada' })
        res.json(emergencia)

    } catch (error) {
        return res.status(500).json({msg: 'Emergencia no encontrada'})
    }
}

export const addEmergencias = async (req, res) => {
    const { ulongitud, ulatitud, estado, tipo, user, municipio } = req.body

    try {
        const existeMunicipio = await Municipios.findOne({ municipio: municipio })
        
        if (existeMunicipio) {
            const newEmergencia = new Emergencia({
                ulongitud,
                ulatitud,
                estado,
                tipo,
                user, 
                municipio: existeMunicipio.municipio
            })

            const userSaved = await newEmergencia.save()
    
            res.status(200).json({
                id: userSaved._id,
                msg: 'La ayuda va en camino'

            })
        }else{
            return res.status(404).json({ msg: 'El sistema no tiene cobertura en tu zona' })
        }

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

export const asignarEmergencia = async (alertaId, idPolicia) => {
    const db = mongoose.connection.db;
    // const { idPolicia } = req.body
    try {
        const emergencia = await db.collection('emergencias').findOneAndUpdate(
            { _id: alertaId },
            // { $set: {estado: '3'} },
            { $set: { Policias: idPolicia, estado: '3' } },
            { returnOriginal: false }
        );

        if (!emergencia) {
            console.error('Emergencia no encontrada');
        } else {
            console.log('Emergencia actualizada', emergencia);
        }

    } catch (error) {
        console.log('Error interno del servidor', error)
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
        return res.status(500).json({ msg: 'Error interno del servidor', estado })
    }

}

