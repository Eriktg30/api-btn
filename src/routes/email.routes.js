import { Router } from 'express'
import { sendCode, verifyCode } from '../controllers/email.controller.js'

const router = Router()

router.post('/generarCodigo', sendCode)

router.post('/verifyCodigo', verifyCode)

export default router;
