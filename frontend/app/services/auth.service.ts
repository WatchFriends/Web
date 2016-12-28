import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, Subscription } from "rxjs";
import { ServerError } from ".";


@Injectable()
export class AuthService {

  constructor(private http: Http) { }

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
      localStorage.setItem("access-token", json.token);
      localStorage.setItem("user", JSON.stringify(json.user));
      return json;
    });
  }

  register(data) {
    return this.post("api/auth/register", data, res => {
      var json = res.json();
      localStorage.setItem("access-token", json.token);
      localStorage.setItem("user", JSON.stringify(json.user));
      return json;
    });
  }
}