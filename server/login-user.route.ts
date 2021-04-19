import { Request, Response } from 'express';
import { db } from './database';
import { DbUser } from './db-user';
import { sessionStorage } from './session-storage';
import * as argon2 from 'argon2';
import { randomBytes } from './security.utils';
import {LESSONS, USERS} from "./database-data";

export function loginUser(req: Request, res: Response) {
  const credential = req.body;

  const user = db.findUserByEmail(credential.email);
  if (!user) {
    res.sendStatus(403);
  } else {
    loginAndBuildResponse(credential, user, res);
  }
}

async function loginAndBuildResponse(credential: any, user: DbUser, res: Response) {
  try {
    const sessionID = await attemptUser(credential, user);

    // create session User base on sessionID
    sessionStorage.createSession(sessionID, user);

    // create cookies to attach with response
    res.cookie('SESSIONID', sessionID, {httpOnly: true, secure: true})
    res.status(200).json({id:user.id, email:user.email});
  } catch {
    res.sendStatus(403);
  }
}

async function attemptUser(credential: any, user: DbUser) {
  const passwordValid = await argon2.verify(user.passwordDigest, credential.password);

  if (!passwordValid) {
    throw new Error('Password Invalid');
  }

  const sessionID = await randomBytes(32).then(bytes => bytes.toString('hex'));
  return sessionID;
}
