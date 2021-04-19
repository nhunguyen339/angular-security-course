
import {db} from "./database";
import { Response, Request } from 'express';
import { sessionStorage } from './session-storage';

export function readAllLessons(req: Request, res: Response) {
    const sessionID = req.cookies['SESSIONID'];
    const isSessionValid = sessionStorage.isSessionValid(sessionID);

    if (isSessionValid) {
        res.status(200).json({lessons: db.readAllLessons()});
    } else {
        res.sendStatus(402);
    }
}