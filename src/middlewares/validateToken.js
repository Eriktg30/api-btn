import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js'

export const authRequired = (req, res, next) => {

    const token = req.headers.authorization.split(' ')[1];

    if (!token)
        return res.status(401).json({ msg: 'no autorizado' })

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).json({ msg: 'token invalido' })

        req.user = user

        next()
    })
}
