import mongoose from 'mongoose';
import admin from './admin.js';
import Emergencia from './models/emergencias.model.js';
import Policia from './models/autoridades.model.js';
import dotenv from 'dotenv';
import { notificaciones } from './notificacion.js'


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

        notificaciones()
      
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
