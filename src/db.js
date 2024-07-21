import mongoose from 'mongoose';
import admin from './admin.js';
import Emergencia from './models/emergencias.model.js';
import Policia from './models/autoridades.model.js';
import dotenv from 'dotenv';

dotenv.config();

const {
    DB_USER,
    DB_PASSWORD,
    DB_CLUSTER_URL,
    DB_NAME
} = process.env;


export const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER_URL}/?retryWrites=true&w=majority&appName=${DB_NAME}`);
        console.log('>>> DB is connected <<<');

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
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    }
};
// export const connectDB = async () => {
//     try {
//         await mongoose.connect("mongodb+srv://ctbase701:STWKDvxqfXjcUaF4@botonpanico.7cbcuti.mongodb.net/?retryWrites=true&w=majority&appName=BotonPanico")
//         console.log('>>> DB is connected <<<');
//     } catch (error) {
//         console.log(error);
//     }
// };
