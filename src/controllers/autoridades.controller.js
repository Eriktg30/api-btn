import Autoridades from "../models/autoridades.model.js";


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
            { notificationToken },
            { new: true }
        )

        if (!policia) 
            return res.status(404).json({ msg: 'Policia no encontrado' })
        

        return res.status(200).json({ msg: 'Actualizado', policia })

    } catch (error) {
        return res.status(500).json({ msg: 'Policia no encontrado' })
    }
}

