import cookieParser from "cookie-parser";
import express from "express";
import morgan from "morgan";
import cors from 'cors'

import authRoutes from './routes/auth.routes.js'
import emergenciasRoutes from './routes/emergencias.routes.js'
import autoridadesRoutes from './routes/autoridades.routes.js'



const app = express()

app.use(cors({
    // origin: 'http://localhost:8100',
    origin: 'https://localhost',
    credentials: true,
}))

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRoutes)
app.use('/api', emergenciasRoutes)
app.use('/api', autoridadesRoutes)


export default app;
