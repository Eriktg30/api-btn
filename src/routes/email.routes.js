import { Router } from 'express'
import { sendCode, verifyCode, sendCodeCorreo } from '../controllers/email.controller.js'

const router = Router()

router.post('/generarCodigo', sendCode)

router.post('/generarCodigoCorreo', sendCodeCorreo)

router.post('/verifyCodigo', verifyCode)

export default router;
