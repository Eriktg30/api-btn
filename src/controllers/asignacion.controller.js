import mongoose from 'mongoose';

export const updatePoliciaEstado = async (idPolicia) => {
    console.log('estado poli');
    
    const db = mongoose.connection.db;
    try {
        const policia = await db.collection('policias').findOneAndUpdate(
            { _id: idPolicia },
            { $set: { EstadoPo: 'Atendiendo' } },
            { returnOriginal: false }
        );

        if (!policia) {
            console.error('policia no encontrada');
        } else {
            console.log('policia actualizada', policia);
        }

    } catch (error) {
        console.log('Error interno del servidor', error)
    }
}
