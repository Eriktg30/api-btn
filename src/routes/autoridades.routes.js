import { Router } from "express";
import { authRequired } from '../middlewares/validateToken.js'
import { getPolicia , getPolicias, updatePolicia, verifyTokenAutoridades, loginAutoridades, updateCoordenadasPolicia } from "../controllers/autoridades.controller.js";

const router = Router()

router.post('/loginAutoridades', loginAutoridades)

router.get('/emergenciasPP', getPolicias)

router.get('/emergenciasPP/:id', getPolicia)

router.put('/policia/:id', updatePolicia)

router.put('/coordenadas/:id', updateCoordenadasPolicia)

router.get('/verifyPolicia', verifyTokenAutoridades)


export default router
