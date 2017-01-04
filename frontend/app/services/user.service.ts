import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs';
import { ServerError } from './server-error';
import { User, Name} from '../models'
const tokenKey = 'token';


@Injectable()
export class UserService implements User {

  private _authenticated: boolean;
  private _email: string;
  private _name: Name;
  private _token: string;
  private _id: string;

  constructor(private http: Http) {
    if (typeof (Storage) !== "undefined")
      this._token = localStorage[tokenKey]
    //else TODO cookie
    if (this._token) {
      //request for user data (checks token validity)
      http.get('/api/auth/login', { headers: new Headers({ 'Authorization': `Bearer ${this._token}` }) })
        .catch(res => Observable.throw(<ServerError>res.json()))
        .subscribe(res => this.handleResponse(res.json()));
    }
  }

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
    if (typeof (Storage) !== "undefined")
      localStorage.setItem(tokenKey, this._token);
    //else use TODO cookie
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

  //needs to be subscribed to work
  login(data) {
    return this.post('api/auth/login', data);
  }

  //needs to be subscribed to work
  register(data) {
    return this.post('api/auth/register', data);
  }

  //does not need to be subscribed
  logout() {
    return this.http.get('api/auth/logout').subscribe(res => this._authenticated = false);
  }
}