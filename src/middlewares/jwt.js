import jwt from "jsonwebtoken"

export const createAccessToken = async (payload) => {
    const signJWT = jwt.sign(payload, process.env.TOKEN_SECRET_KEY, {
        expiresIn: process.env.TIME_EXPIRATION_TOKEN
    })

    if(!signJWT) {
        return {auth: false, message: 'token was not created'}
    }

    return signJWT
}

export const authRequired = async (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: "Token is not valid" });
    }
};