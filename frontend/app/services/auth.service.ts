import { Injectable, Inject } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, Subscription } from "rxjs";
import { ServerError } from "./server-error";
import { UserService } from "./user.service"; //verplicht via file zelf (niet via index) voor DI


@Injectable()
export class AuthService {

  constructor(private http: Http, private user: UserService) { }

  private headers = new Headers({ 'Content-Type': 'application/vnd.api+json' });
  private options = new RequestOptions({ headers: this.headers, withCredentials: true });

  post(url: string, data: any, map) {
    return this.http.post(url, JSON.stringify(data), this.options)
      .map(map)
      .catch(res => Observable.throw(<ServerError>res.json()));
  }

  login(data) {
    return this.post("api/auth/login", data, res => {
      var json = res.json();
      this.user.setUser(json.user);
      this.user.setToken(json.token);
      return json;
    });
  }

  register(data) {
    return this.post("api/auth/register", data, res => {
      var json = res.json();
      this.user.setUser(json.user);
      this.user.setToken(json.token);
      return json;
    });
  }

  logout() {
    return this.http.get("api/auth/logout").map(res => this.user.setUser(null));
  }
}