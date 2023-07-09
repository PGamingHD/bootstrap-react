import {Request, Response, NextFunction} from "express";
import jwt, {JwtPayload, cookieConstructor} from 'jsonwebtoken';
import 'dotenv/config';

declare module 'jsonwebtoken' {
    export interface cookieConstructor extends jwt.JwtPayload {
        id: number,
        username: string,
        displayname: string,
        iat: number,
    }
}

export default function validateAuth(req: Request, res: Response, next: NextFunction) {
    if (!process.env.JWT_SIGNING) return res.json({message: 'authentication', response: 'No valid JWT_SIGNING string provided!'});

    if (req.cookies._auth) {
        let cookie: JwtPayload | undefined = undefined;
        try {
            cookie = <cookieConstructor>jwt.verify(req.cookies._auth, process.env.JWT_SIGNING);
        } catch {
            return res.json({message: 'authentication', response: 'You do not have valid authentication!'});
        }

        if (cookie && cookie?.username && cookie?.id && cookie?.displayname) {
            return next();
        } else {
            return res.json({message: 'authentication', response: 'You do not have valid authentication!'});
        }
    } else {
        return res.json({message: 'authentication', response: 'You do not have valid authentication!'});
    }
}