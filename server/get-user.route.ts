import { Request, Response } from 'express';
import { sessionStorage } from './session-storage';

export function getUser(req: Request, res: Response) {
  const sessionID = req.cookies['SESSIONID'];

  const user = sessionStorage.findUserBySessionID(sessionID)

  if (user) {
    res.status(200).json(user);
  } else {
    res.sendStatus(204);
  }
}