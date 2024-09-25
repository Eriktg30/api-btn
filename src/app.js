import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import emergenciasRoutes from './routes/emergencias.routes.js'
import autoridadesRoutes from './routes/autoridades.routes.js'
import notificationRoutes from './routes/notificaciones.routes.js'
import emailRoutes from './routes/email.routes.js'

const app = express()

app.use(cors({
    // origin: 'http://localhost:8100',
    origin: ['http://localhost', 'https://localhost', 'http://localhost:8100'],
    credentials: true,
}))

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', emergenciasRoutes)
app.use('/api', autoridadesRoutes)
app.use('/api', notificationRoutes)
app.use('/api', emailRoutes)

export default app;
