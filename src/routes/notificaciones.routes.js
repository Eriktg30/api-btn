import { Router } from "express";
import {sendNotification} from "../controllers/notificaciones.controller.js";


const router = Router()

router.post('/send-notification', sendNotification);

export default router
