
import * as _ from 'lodash';
import {LESSONS, USERS} from "./database-data";

class InMemoryDatabase {
    userCounter = 0;

    readAllLessons() {
        return _.values(LESSONS);
    }

    createUse(email: string, password: string) {
        this.userCounter++;
        const id = this.userCounter;
        const user = {
            id,
            email,
            password,
        }

        USERS[user.id] = user;
        return user;
    }


}

export const db = new InMemoryDatabase();