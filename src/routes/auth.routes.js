import { Router } from "express";
import { register, login, profile, logout, verifyToken, updateProfile } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router()

router.post('/register', register)

router.post('/login', login)

router.post('/logout', logout)

router.get('/verify', verifyToken)

router.put('/profile/:id', updateProfile)

router.post('/profile/:id', authRequired, profile)



export default router;
