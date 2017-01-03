import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs';
import { ServerError } from './server-error';
@Injectable()
export class UserService {

  private _name: Name;
  private _email: string;
  private _token: string;
  private _authenticated: boolean;
  private _id: string;

  constructor(private http: Http) { }

  get name() { return this._name };
  get email() { return this._email };
  get id() { return this._id };
  get token() { return this._token };
  get authenticated() { return this._authenticated };

  //api calls  

  handleResponse(json) {
    var user = json.user;
    this._authenticated = true;
    this._name = user.name;
    if (!this._name) console.error('user does not have a name');

    this._email = user.email;
    if (!this._email) console.error('user does not have an e-mail');

    this._id = user.id;
    if (!this._email) console.error('user does not have an id');

    this._token = json.token;
  }

  post(url: string, data: any) {
    const headers = new Headers({ 'Content-Type': 'application/vnd.api+json' });
    return this.http.post(url, JSON.stringify(data), { headers })
      .map(res => {
        var json = res.json();
        this.handleResponse(json);
        return json;
      })
      .catch(res => Observable.throw(<ServerError>res.json()));
  }

  login(data) {
    return this.post('api/auth/login', data);
  }

  register(data) {
    return this.post('api/auth/register', data);
  }

  logout() {
    return this.http.get('api/auth/logout').subscribe(res => this._authenticated = false);
  }
}

export class Name {
  givenName: string;
  middleName: string;
  familyName: string;
}