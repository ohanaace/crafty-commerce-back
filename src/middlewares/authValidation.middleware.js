import { db } from "../database/database.js";

export async function validateAuth(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.sendStatus(401);

    try {
        const session = await db.collection("sessions").findOne({ token });
        if(!session) return res.sendStatus(401);
        const user = await db.collection("users").findOne({_id: session.userId});
        if(!user) return res.sendStatus(401);
        res.locals.user = user;
        res.locals.session = session;
        res.locals.token = token;
        next();
    } catch (error) {
        res.status(500).send(error.message);
    }
}