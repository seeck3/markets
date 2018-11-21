// import { CookieService } from 'ngx-cookie';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private base = '/api/user';

  constructor(
    private readonly http: HttpClient // private readonly cookieService: CookieService
  ) {}

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.base}/login`, user);
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.base}/register`, user);
  }

  logout(): Observable<void> {
    return this.http.delete<void>(`${this.base}/logout`);
  }

  loggedin(): Observable<User> {
    return this.http.get<User>(`${this.base}/loggedin`);
  }
  // isAuthed(): boolean {
  //   const expired = parseInt(this.cookieService.get('expiration'), 10);
  //   const userID = this.cookieService.get('userID');
  //   const session = this.cookieService.get('session');

  //   return expired && userID && session && expired > Date.now();
  // }
}
