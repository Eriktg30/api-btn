import { Router } from "express";
import { getEmergencia, getEmergencias, addEmergencias, updateEmergencias, updateEstado, deleteAlerta } from "../controllers/emergencias.controller.js";
import { authRequired } from '../middlewares/validateToken.js'

const router = Router()

router.post('/emergencias', getEmergencias)

router.post('/emergencia/:id', getEmergencia)

router.post('/emergencia', addEmergencias)

router.put('/emergencia/:id', updateEmergencias)

router.put('/estado/:id', updateEstado)

router.delete('/cancelar/:id', deleteAlerta)



export default router