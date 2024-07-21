import { Router } from "express";

import { authRequired } from '../middlewares/validateToken.js'
import { getPolicia , getPolicias, updatePolicia} from "../controllers/autoridades.controller.js";

const router = Router()



router.get('/emergenciasPP', getPolicias)

router.get('/emergenciasPP/:id', getPolicia)

router.put('/policia/:id', updatePolicia)

export default router
