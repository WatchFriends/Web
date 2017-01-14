import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs';
import { ServerError } from './server-error';
import { User, Name } from '../models';
const tokenKey = 'token';

export interface AuthResult {
  token: string;
  user: User;
}

@Injectable()
export class UserService implements User {

  private _authenticated: boolean;
  private _email: string;
  private _name: Name;
  private _token: string;
  private _id: string;
  private _picture: string;

  constructor(private http: Http) {
    if (typeof (Storage) !== 'undefined') {
      this._token = localStorage[tokenKey];
    }
    // else TODO cookie
    if (this._token) {
      // request for user data (checks token validity)
      http.get('/api/auth/login', { headers: new Headers({ 'Authorization': `Bearer ${this._token}` }) })
        .catch(res => Observable.throw(<ServerError>res.json()))
        .subscribe(res => this.handleResponse(res.json()));
    }
  }

  get name() { return this._name; };
  get email() { return this._email; };
  get id() { return this._id; };
  get token() { return this._token; };
  get authenticated() { return this._authenticated; };
  get picture() { return this._picture; };

  // api calls  
  handleResponse(authResult: AuthResult) {
    const user = authResult.user;
    this._authenticated = true;
    this._name = user.name;
    this._email = user.email;
    this._id = user.id;
    this._picture = user.picture;

    this._token = authResult.token;
    if (typeof (Storage) !== 'undefined') {
      localStorage.setItem(tokenKey, this._token);
    }
    // else TODO cookie
  }

  post(url: string, data: any): Observable<AuthResult> {
    const headers = new Headers({ 'Content-Type': 'application/vnd.api+json' });
    return this.http.post(url, JSON.stringify(data), { headers })
      .map(res => {
        const authResult = <AuthResult>res.json();
        this.handleResponse(authResult);
        return authResult;
      })
      .catch(res => Observable.throw(<ServerError>res.json()));
  }

  // needs to be subscribed to work
  login(data) {
    return this.post('api/auth/login', data);
  }

  // needs to be subscribed to work
  register(data) {
    return this.post('api/auth/register', data);
  }

  // does not need to be subscribed
  logout() {
    return this.http.get('api/auth/logout').subscribe(res => this._authenticated = false);
  }
}
