import { Request, Response } from 'express';
import { sessionStorage } from './session-storage';

export function logoutUser(req: Request, response: Response) {
  const sessionID = req.cookies['SESSIONID'];

  sessionStorage.destroySession(sessionID);

  response.clearCookie('SESSIONID');

  response.status(200).send({ status: 'OK'});
}