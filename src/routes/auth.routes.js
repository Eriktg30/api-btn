import { Router } from "express";
import { register, login, profile, logout, verifyToken, loginAutoridades, verifyTokenA } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router()

router.post('/register', register)

router.post('/login', login)

router.post('/loginAutoridades', loginAutoridades)

router.post('/logout', logout)

router.get('/verify', verifyToken)

router.get('/verifyA', verifyTokenA)

router.post('/profile/:id', profile)



export default router;
