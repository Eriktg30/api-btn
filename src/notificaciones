import mongoose from 'mongoose';
import admin from './admin.js';

export const notificaciones = () => {
    const db = mongoose.connection.db;
    const collection = db.collection('emergencias');
    const policiaCollection = db.collection('policias');

    const changeStream = collection.watch();

    changeStream.on('change', async (change) => {
        if (change.operationType === 'update' && change.updateDescription.updatedFields.Policias) {
            const emergenciaId = change.documentKey._id;
            const policiaId = change.updateDescription.updatedFields.Policias;

            // Encuentra el policía por su ID
            const policia = await policiaCollection.findOne({ _id: new mongoose.Types.ObjectId(policiaId) });

            if (!policia) {
                console.error(`Policía con ID ${policiaId} no encontrado`);
                return;
            }

            const tokenM = policia.notificationToken;

            // Crea el payload de la notificación
            const payload = {
                notification: {
                    title: 'Nueva Emergencia Asignada',
                    body: `Se te ha asignado una nueva emergencia con ID: ${emergenciaId}.`,
                },
            };

            // Envia la notificación
            try {
                await admin.messaging().sendToDevice(tokenM, payload);
                console.log('Notificación enviada al policía:', policia.NombresPo);
            } catch (error) {
                console.error('Error al enviar notificación:', error);
            }
        }
    });
}

