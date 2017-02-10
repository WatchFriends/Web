import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, Subscription, Observer, Subject } from 'rxjs';
import { ServerError } from './server-error';
import { User, Name } from '../models';
import { Cookie } from 'ng2-cookies';

const tokenKey = 'token';

export interface AuthResult {
  token: string;
  user: User;
}

@Injectable()
export class UserService implements User {
  private useStorage: boolean;
  private _authenticated: boolean;
  private _email: string;
  private _name: Name;
  private _token: string;
  private _id: string;
  private _picture: string;
  private subject = new Subject<boolean>();

  constructor(private http: Http) {
    this.useStorage = typeof (Storage) !== 'undefined';
    this._token = this.savedToken;

    if (this._token) {
      // request for user data (checks token validity)
      http.get('/api/auth/login', { headers: new Headers({ 'Authorization': `Bearer ${this._token}` }) })
        .subscribe(res => {
          this.handleResponse(res.json());
          this.subject.next(true);
        }, err => {
          if (err.status === 401) { // authentication failed -> token is invalid
            this.clearSavedToken();
          } else {
            console.error(err);
          }
          this.subject.next(this._authenticated = false);
        });
    } else {
      this._authenticated = false;
    }
  }

  get name() { return this._name; };
  get email() { return this._email; };
  get id() { return this._id; };
  get token() { return this._token; };
  get authenticated() { return this._authenticated; };
  get picture() { return this._picture; };

  get authenticated$(): Observable<boolean> {
    if (this._authenticated !== undefined) {
      return Observable.of(this._authenticated);
    }
    return this.subject.asObservable();
  }

  // api calls  
  handleResponse(authResult: AuthResult) {
    const user = authResult.user;
    this._authenticated = true;
    this._name = user.name;
    this._email = user.email;
    this._id = user.id;
    this._picture = user.picture;

    this._token = authResult.token;
    this.savedToken = this._token;
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
    this.clearSavedToken();
    return this.http.get('api/auth/logout').subscribe(res => this._authenticated = false);
  }

  clearSavedToken() {
    if (this.useStorage) {
      localStorage.removeItem(tokenKey);
    } else {
      Cookie.delete(tokenKey);
    }
  }

  get savedToken() {
    if (this.useStorage) {
      return localStorage.getItem(tokenKey);
    } else {
      return Cookie.get(tokenKey);
    }
  }

  set savedToken(token: string) {
    if (this.useStorage) {
      localStorage.setItem(tokenKey, this._token);
    } else {
      Cookie.set(tokenKey, token);
    }
  }
}
