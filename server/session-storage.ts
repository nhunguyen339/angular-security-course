import { User } from '../src/app/model/user';
import { Session } from './session';

export class SessionStorage {

  private sessions = [];

  createSession(sessionID: string, user: User) {
    this.sessions[sessionID] = new Session(sessionID, user);
  }

  findUserBySessionID(sessionID: string) {
    const session = this.sessions[sessionID];

    return this.isSessionValid(sessionID) ? session.user : undefined;
  }

  isSessionValid(sessionID: string) {
    const session = this.sessions[sessionID];

    return session ? session.isValid() : false;
  }

  destroySession(sessionID: string) {
    this.sessions.filter(session => session.sessionID !== sessionID);
  }

}

export const sessionStorage = new SessionStorage();