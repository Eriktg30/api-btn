import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { notificaciones } from './notificaciones.js'
import { asignar } from './asignar.js';

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

         asignar()
      
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
