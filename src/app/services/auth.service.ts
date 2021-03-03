import { BehaviorSubject, Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { HttpClient } from "@angular/common/http";

import { User } from '../model/user';
import { Injectable } from "@angular/core";

export const ANONYMOUS_USER = {
  id: undefined,
  email: ''
}

@Injectable()
export class AuthService {
  subject$ = new BehaviorSubject<User>(ANONYMOUS_USER);
  user$ = this.subject$.asObservable();
  isLoggedIn$: Observable<boolean> = this.user$.pipe(map(user => !!user.id));
  isLoggedOut$: Observable<boolean> = this.isLoggedIn$.pipe(map(val => !val));

  constructor(private http: HttpClient) {}

  public signup(email: string, password: string) {
    this.http.post<User>('/api/signup', {email, password})
      .subscribe((user: User) => {
        this.subject$.next(user);
      })
  }
}
