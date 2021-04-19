
import {Request, Response} from "express";
import {db} from "./database";
import {USERS} from "./database-data";
import * as argon2 from 'argon2';
import {validatePassword} from "./password-validation";
import { randomBytes } from "./security.utils";
import { sessionStorage } from './session-storage';

// const util = require('util')

export function createUser(req: Request, res:Response) {

    const credentials = req.body;

    const errors = validatePassword(credentials.password);

    if (errors.length > 0) {
        res.status(400).json({errors});
    }
    else {
        createUserAndSession(res, credentials)
    }

}

async function createUserAndSession(res: Response, credentials) {

    // Hash password
    const passwordDigest = await argon2.hash(credentials.password);

    // Create user base on password
    let user = null;
    try {
        user = db.createUser(credentials.email, passwordDigest);
    } catch(error) {
        res.status(402).json({error: `An user already exists with email ${credentials.email}`});
    }

    // create sessionID random
    const sessionID = await randomBytes(32).then(bytes => bytes.toString('hex'));

    // create session User base on sessionID
    sessionStorage.createSession(sessionID, user);

    // create cookies to attach with response
    res.cookie('SESSIONID', sessionID, {httpOnly: true, secure: true})

    console.log(USERS);

    // return user info after session process done
    res.status(200).json({id:user.id, email:user.email});
}