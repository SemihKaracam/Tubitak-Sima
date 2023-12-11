import { verifyToken } from "./verifyToken.js";

export const verifyRole = (...allowedRoles) => {
    return (req, res, next) => {
        verifyToken(req, res, () => {
            if (!req?.role) return res.sendStatus(401);
            const rolesArray = [...allowedRoles]
            const result = rolesArray.includes(req.role)
            if (!result) return res.sendStatus(401)
            next()
        })
    }
}

