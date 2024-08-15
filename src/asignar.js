import mongoose from 'mongoose';
import geolib from 'geolib'
import { asignarEmergencia } from './controllers/emergencias.controller.js';
import { updatePoliciaEstado } from './controllers/asignacion.controller.js';

export const asignar = () => {
    const db = mongoose.connection.db;

    const collection = db.collection('emergencias');
    const changeStream = collection.watch();

    changeStream.on('change', async (change) => {
        try {
            // Verifica si la operación es una inserción
            if (change.operationType === 'insert') {
                const fullDocument = change.fullDocument;

                // Verifica el estado de la emergencia
                if (fullDocument.estado === '3') {
                    console.log(`Emergencia ${fullDocument._id} ya está asignada.`);
                    return;
                }

                // Obtén las coordenadas de la alerta
                const infoAlerta = {
                    latitude: fullDocument.ulatitud,
                    longitude: fullDocument.ulongitud,
                    tipo: fullDocument.tipo,
                    municipio: fullDocument.municipio
                };

                // console.log('info alerta:', infoAlerta);

                // Encuentra el policía más cercano
                const nearestPoli = await encontrarPoliciaMasCercana(infoAlerta);
                console.log('Policía más cercano:', nearestPoli);

                if (!nearestPoli) {
                    console.log('No se encontró policía cercano.');
                    return;
                }

                if (nearestPoli.estado === 'Disponible') {
                    if (nearestPoli) {
                        await asignarEmergencia(fullDocument._id, nearestPoli.id);
                        await updatePoliciaEstado(nearestPoli.id)
                        console.log('Notificación enviada al policía:', nearestPoli.nombre);
                    } else {
                        console.log('No se encontró policía cercano.');
                    }
                } else {
                    console.log('Policía más cercano no esta disponible');
                }
            }

        } catch (error) {
            console.error('Error procesando el cambio:', error);
        }
    });

    const encontrarPoliciaMasCercana = async (alerta) => {
        try {
            const policias = await db.collection('policias').find({ EstadoPo: 'Disponible', tipo: alerta.tipo, municipio: alerta.municipio }).toArray(); // Obtener todos los policías

            if(policias.length === 0){
                return
            }

            const formatoPolicia = policias.map(p => ({
                latitude: p.ulatitud,
                longitude: p.ulongitud,
                id: p._id,
                estado: p.EstadoPo,
                tipo: p.tipo,
                municipio: p.municipio
            }));

            console.log(formatoPolicia.municipio);

            const nearest = geolib.findNearest(alerta, formatoPolicia)
            return nearest
        } catch (error) {
            console.error('Error encontrando el policía más cercano:', error);
            res.json({
                msg: 'Registrado'
            })
            return;
        }
    };
}

